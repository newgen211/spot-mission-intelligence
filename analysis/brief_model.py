"""Rewrite each mission's template brief with a small open-weight model from Hugging Face.

Usage:
    pip install torch transformers accelerate
    python analysis/brief_model.py app/findings.json            # Qwen2.5-1.5B-Instruct
    python analysis/brief_model.py app/findings.json --model Qwen/Qwen2.5-0.5B-Instruct   # faster
    python analysis/brief_model.py app/findings.json --dry-run  # test the checks, no model

Rules the model must follow, enforced in code (not just in the prompt):
  * Only facts we pass in. Every number in its output must appear in the facts.
  * No invented causes: words like "because" or "due to" reject the output.
  * Must end with the same "Next:" step the template chose.
If any check fails, the mission keeps the template brief. Nothing is generated live during the demo.
"""
import argparse
import json
import os
import re
import sys
import time

PLAIN = lambda s: s.replace("_", " ").lower() if s else s

SYSTEM = (
    "You write short shift-log briefs for nuclear plant operators about a robot inspection mission. "
    "Write 3 to 5 plain sentences an operator can read in 20 seconds. "
    "Use ONLY the facts given. Never guess a cause or reason. Never add numbers that are not in the facts. "
    "No jargon, no bullet points, no headings. Do not write a next step or a recommendation."
)

# One worked example (fictional mission) so a small model sees the format. Its numbers differ from the
# real data on purpose: if the model copies them, the number check rejects the output.
EXAMPLE_FACTS = """Mission: M000
Status reported by the robot: completed
Actions that succeeded: 8 of 10
Actions that failed: 2
Battery: started at 80%, ended at 30%
Anomalies recorded: 1, of which need operator review: 1, on actions that reported success: 0
Unusual readings: 0
Failed action: thermal inspection of PUMP-100 at North Yard (target not detected, battery 41%)
Failed action: navigation of PUMP-100 at North Yard (path blocked, battery 35%)
Anomaly: high abnormal vibration on PUMP-100 at North Yard, needs operator review"""
EXAMPLE_BRIEF = ("Mission M000 was marked completed, but only 8 of 10 actions succeeded. "
                 "Both failures were at North Yard: a thermal inspection of PUMP-100 found no target, and the path there was blocked. "
                 "A high abnormal vibration on PUMP-100 needs operator review. "
                 "Battery went from 80% to 30%.")


def facts_for(m):
    """Plain-language fact sheet for one mission. This is everything the model is allowed to say."""
    lines = [
        f"Mission: {m['mission_id']}",
        f"Status reported by the robot: {m['status'].lower()}",
        f"Actions that succeeded: {m['actions_ok']} of {m['actions_total']}",
        f"Actions that failed: {len(m['failed_actions'])}",
        f"Battery: started at {m['start_battery']}%, ended at {m['end_battery']}%",
        f"Anomalies recorded: {len(m['anomalies'])}, of which need operator review: {sum(a['review_required'] for a in m['anomalies'])}, "
        f"on actions that reported success: {sum(a['action_status'] == 'SUCCESS' for a in m['anomalies'])}",
        f"Unusual readings: {len(m['reading_flags'])}",
    ]
    for f in m["failed_actions"]:
        lines.append(f"Failed action: {PLAIN(f['action_type'])} of {f['asset_id']} at {f['location_name']} "
                     f"({PLAIN(f['failure_type'])}, battery {f['battery_pct']}%)")
    for a in m["anomalies"]:
        hidden = " on an action that reported success" if a["action_status"] == "SUCCESS" else ""
        review = "needs operator review" if a["review_required"] else "no review needed"
        lines.append(f"Anomaly: {a['severity'].lower()} {PLAIN(a['type'])} on {a['asset_id']} at {a['location_name']}{hidden}, {review}")
    for r in m["reading_flags"]:
        unit = "%" if r["unit"] == "pct" else " " + r["unit"]
        lines.append(f"Unusual reading: {re.sub(r' (pct|c|db|psi)$', '', PLAIN(r['measurement_type']))} on {r['asset_id']} was {r['value']:g}{unit} "
                     f"(normal is about {round(r['normal_mean'], 1):g}{unit})")
    if not m["failed_actions"] and not m["anomalies"] and not m["reading_flags"]:
        lines.append("Nothing failed and nothing unusual was found.")
    return "\n".join(lines)


def next_step(m):
    nxt = re.search(r"Next: .*$", m["brief"])
    return nxt.group(0) if nxt else "Next: no action needed."


ID_RE = re.compile(r"(?:[A-Z]+-\d+|M\d{3}|WP\d{2}|A\d{4}|AN\d{3}|R\d{4})\b")
NUM_RE = re.compile(r"\d+(?:\.\d+)?")
CAUSE_RE = re.compile(r"\b(because|due to|caused|likely|probably|suggests|indicates|as a result|resulting in|leading to|led to|which means|so that)\b", re.I)
OPINION_RE = re.compile(r"\b(sufficient|insufficient|acceptable|healthy|safe|stable|fine|(?:is|it's|was|were) reliable|still (?:good|ok|fine))\b", re.I)
SEV = ("critical", "high", "medium", "low")


def numbers(text):
    return {float(n) for n in NUM_RE.findall(ID_RE.sub(" ", text))}


ASSET_RE = re.compile(r"\b[A-Z]+-\d+\b")


def check(output, facts, m):
    """Return a reason the output is rejected, or None if it passes."""
    text = output.strip()
    if not text:
        return "empty"
    # every asset named must be in the facts
    fake = set(ASSET_RE.findall(text)) - set(ASSET_RE.findall(facts))
    if fake:
        return f"assets not in facts: {sorted(fake)}"
    # every place named must be in the facts, and each sentence's assets and places must belong together
    places = {f["location_name"] for f in m["failed_actions"]} | {a["location_name"] for a in m["anomalies"]}
    all_places = set(re.findall(r" at ([A-Z][A-Za-z]+(?: [A-Z][A-Za-z]+)*)", facts))
    pairs = {(f["asset_id"], f["location_name"]) for f in m["failed_actions"]} | {(a["asset_id"], a["location_name"]) for a in m["anomalies"]}
    for sent in re.split(r"(?<=[.!?])\s+", text):
        named = {p for p in all_places if p in sent}
        assets = set(ASSET_RE.findall(sent))
        for a in assets:
            if named and not any((a, p) in pairs for p in named):
                return f"put {a} at the wrong place"
        # a sentence that blames one place for a count of failures must match the facts
        mcount = re.search(r"\b(\d+) (?:failed actions|failures|actions failed)\b", sent)
        if mcount and len(named) == 1:
            p = next(iter(named))
            if int(mcount.group(1)) != sum(f["location_name"] == p for f in m["failed_actions"]):
                return f"wrong failure count at {p}"
        # failure words must not be described as anomalies, and anomaly words not as failures
        if re.search(r"\banomal", sent, re.I):
            for f in m["failed_actions"]:
                if PLAIN(f["failure_type"]) in sent.lower() and f["asset_id"] in sent:
                    return "called a failed action an anomaly"
    if re.search(r"\b[a-z]*(?:iztion|ailre|anomoly)\b", text):
        return "misspelling"
    if OPINION_RE.search(text):
        return f"added an opinion: '{OPINION_RE.search(text).group(0)}'"
    low = text.lower()
    n_fail, n_anom, n_flag = len(m["failed_actions"]), len(m["anomalies"]), len(m["reading_flags"])
    n_review = sum(a["review_required"] for a in m["anomalies"])
    if n_fail and re.search(r"\ball (?:\d+ )?actions (?:succeeded|reported success|were successful)|all actions reported success", low):
        return "says all actions succeeded"
    if n_fail != 1 and re.search(r"\bthe only (?:failure|failed action)\b", low):
        return "says there was only one failure"
    if n_anom and re.search(r"\bno anomal", low):
        return "says no anomalies"
    if not n_anom and re.search(r"\b(?:an|one|\d+|two|three) anomal", low):
        return "invents an anomaly"
    if n_flag and re.search(r"\bno unusual reading", low):
        return "says no unusual readings"
    if not n_flag and re.search(r"\bunusual reading", low) and not re.search(r"\bno (?:\w+ (?:or |and )?)*unusual reading", low):
        return "invents an unusual reading"
    if n_review < n_anom and re.search(r"\b(?:both|all|each) (?:of (?:them|which) )?(?:need|needs|needing|require|requires|requiring) (?:operator )?review", low):
        return "says every anomaly needs review"
    if n_review and re.search(r"\bno (?:anomalies or )?(?:actions )?(?:need|needing|requiring) (?:operator )?review|no review(?:s)? (?:was|were) needed", low):
        return "says nothing needs review"
    review_assets = {a["asset_id"] for a in m["anomalies"] if a["review_required"]}
    sev_by_asset = {}
    for a in m["anomalies"]:
        sev_by_asset.setdefault(a["asset_id"], set()).add(a["severity"].lower())
    anom_types = {(a["asset_id"], PLAIN(a["type"])): a["action_status"] for a in m["anomalies"]}
    for sent in re.split(r"(?<=[.!?])\s+", text):
        sl = sent.lower()
        assets = set(ASSET_RE.findall(sent))
        for (asset, typ), status in anom_types.items():
            if typ in sl and asset in sent:
                if "unusual reading" in sl:
                    return f"called the {typ} anomaly an unusual reading"
                if status == "FAILED" and re.search(r"reported success|successful action|action that succeeded", sl):
                    return f"says the {typ} anomaly was on a successful action"
        if "review" in sl and assets:
            negated = re.search(r"\b(?:no|not|without|does not|doesn't|don't|do not)\b[^.]*review", sl)
            if negated and assets & review_assets and not (assets - review_assets):
                return f"says {sorted(assets & review_assets)[0]} needs no review"
            if not negated and (assets - review_assets):
                return f"says {sorted(assets - review_assets)[0]} needs review"
        for a in assets:
            for sev in SEV:
                if re.search(rf"\b{sev} [a-z ]*(?:anomal|defect|vibration|temperature|degradation|obstruction|gauge|localization|issue)", sl) and a in sev_by_asset and sev not in sev_by_asset[a] and len(assets) == 1:
                    return f"wrong severity for {a}"
    for r in m["reading_flags"]:
        above = r["value"] > r["normal_mean"]
        if r["asset_id"] in text:
            if re.search(r"\b(?:higher than|above) normal", low) and not above and len(m["reading_flags"]) == 1:
                return f"says {r['asset_id']} reading is above normal"
            if re.search(r"\b(?:lower than|below) normal", low) and above and len(m["reading_flags"]) == 1:
                return f"says {r['asset_id']} reading is below normal"
    extra = numbers(text) - numbers(facts)
    if extra:
        return f"numbers not in facts: {sorted(extra)}"
    # "due to a sensor timeout" or "because the target was not detected" restate a recorded failure type,
    # in any word order. Any other clause after a cause word is a guess.
    STOP = {"a", "an", "the", "was", "were", "is", "of", "to", "had", "has", "been"}
    type_words = [set(PLAIN(f["failure_type"]).split()) for f in m["failed_actions"]]
    def restates_failure(clause):
        words = set(re.findall(r"[a-z]+", clause.lower())) - STOP
        return any(len(tw & words) >= min(2, len(tw)) for tw in type_words)
    scrubbed = re.sub(r"\b(?:because of|because|due to|caused by)\b([^,.;]*)",
                      lambda mm: " " if restates_failure(mm.group(1)) else mm.group(0), text, flags=re.I)
    if CAUSE_RE.search(scrubbed):
        return f"guessed a cause: '{CAUSE_RE.search(scrubbed).group(0)}'"
    count = f"{m['actions_ok']} of {m['actions_total']}"
    ok_pat = rf"\b{m['actions_ok']} (?:actions )?(?:out )?of (?:the )?{m['actions_total']}\b|\b{m['actions_ok']} actions (?:that )?(?:succeeded|were successful)"
    if not re.search(ok_pat, text) and not (m["actions_ok"] == m["actions_total"] and re.search(rf"\ball {m['actions_total']}\b", text, re.I)):
        return "missing the action count"
    n_sent = len(re.findall(r"[.!?](\s|$)", text))
    if not 2 <= n_sent <= 6:
        return f"{n_sent} sentences"
    if "\n-" in text or text.startswith(("-", "*", "#")):
        return "used formatting"
    return None


def load_model(name):
    import torch
    from transformers import AutoModelForCausalLM, AutoTokenizer
    device = "mps" if torch.backends.mps.is_available() else "cuda" if torch.cuda.is_available() else "cpu"
    dtype = torch.float16 if device != "cpu" else torch.float32
    tok = AutoTokenizer.from_pretrained(name)
    model = AutoModelForCausalLM.from_pretrained(name, torch_dtype=dtype).to(device).eval()
    print(f"loaded {name} on {device}", file=sys.stderr)

    for k in ("temperature", "top_p", "top_k"):
        setattr(model.generation_config, k, None)

    def generate(facts, retry=None):
        ask = "Facts:\n{}\n\nWrite the brief."
        msgs = [{"role": "system", "content": SYSTEM},
                {"role": "user", "content": ask.format(EXAMPLE_FACTS)},
                {"role": "assistant", "content": EXAMPLE_BRIEF},
                {"role": "user", "content": ask.format(facts)}]
        if retry:
            msgs += [{"role": "assistant", "content": retry[0]},
                     {"role": "user", "content": f"That brief was rejected: {retry[1]}. Rewrite it using only the facts, "
                                                 "keeping each asset with its own place, and give no reasons."}]
        prompt = tok.apply_chat_template(msgs, add_generation_prompt=True, tokenize=False)
        enc = tok(prompt, return_tensors="pt").to(device)
        with torch.no_grad():
            out = model.generate(**enc, max_new_tokens=160, do_sample=False, repetition_penalty=1.05,
                                 pad_token_id=tok.eos_token_id)
        text = tok.decode(out[0, enc["input_ids"].shape[1]:], skip_special_tokens=True).strip()
        return re.split(r"\s*\bNext:", text)[0].strip()  # we add the Next step ourselves
    return generate


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("findings")
    ap.add_argument("--model", default="Qwen/Qwen2.5-1.5B-Instruct")
    ap.add_argument("--dry-run", action="store_true", help="skip the model; check the template against itself")
    ap.add_argument("--only", help="comma-separated mission ids, for a quick test")
    ap.add_argument("--resume", action="store_true", help="skip missions that already have a model brief")
    ap.add_argument("--recheck", action="store_true", help="no model: re-run the checks on existing model briefs and drop any that fail")
    args = ap.parse_args()

    data = json.load(open(args.findings))
    generate = (lambda facts, retry=None: None) if (args.dry_run or args.recheck) else load_model(args.model)
    only = set(args.only.split(",")) if args.only else None
    used = 0
    def save():
        tmp = args.findings + ".tmp"
        with open(tmp, "w") as f:
            json.dump(data, f, indent=1, default=str)
        os.replace(tmp, args.findings)

    for m in data["missions"]:
        if only and m["mission_id"] not in only:
            continue
        if args.resume and m.get("brief_source") == "model":
            print(f"{m['mission_id']}: already done, skipped")
            used += 1
            continue
        if args.recheck:
            if m.get("brief_source") != "model":
                continue
            body = m["brief_ai"].rsplit(" Next:", 1)[0]
            reason = check(body, facts_for(m), m)
            if reason:
                m.pop("brief_ai", None); m["brief_source"] = "template"
                print(f"{m['mission_id']}: dropped to template ({reason})")
            else:
                used += 1
                print(f"{m['mission_id']}: model brief kept")
            continue
        facts = facts_for(m)
        t0 = time.time()
        out = m["brief"].split(" Next:")[0] if args.dry_run else generate(facts)
        reason = check(out, facts, m)
        if reason and not args.dry_run:
            print(f"   first try rejected ({reason}), retrying")
            out = generate(facts, retry=(out, reason))
            reason = check(out, facts, m)
        if reason is None and not args.dry_run:
            m["brief_ai"], m["brief_source"] = out + " " + next_step(m), "model"
            used += 1
        else:
            m.pop("brief_ai", None)
            m["brief_source"] = "template"
        print(f"{m['mission_id']}: {'model' if reason is None else 'template (' + reason + ')'}  {time.time() - t0:.1f}s")
        if reason is None and not args.dry_run:
            print("   ", out)
        if not args.dry_run:
            save()
        if reason and not args.dry_run:
            print("   rejected:", out.replace("\n", " ")[:400])
    data["brief_model"] = {"model": None if args.dry_run else args.model, "missions_using_model": used,
                           "rules": "Only facts given; every number must appear in the facts; no guessed causes; the Next step is added by code, not the model. Otherwise the template brief is shown."}
    if args.recheck:
        data["brief_model"]["missions_using_model"] = used
    if not args.dry_run:
        save()
        print(f"wrote {args.findings}: {used} of {len(data['missions'])} missions use the model brief")


if __name__ == "__main__":
    main()