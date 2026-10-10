"""Build findings.json for the SPOT dashboard.

Usage: python build_findings.py <data_dir> <out_path>
The Streamlit app reads only findings.json. Re-run this whenever the analysis changes.
"""
import json
import sys
from datetime import datetime

import pandas as pd

D, OUT = sys.argv[1], sys.argv[2]
m = pd.read_csv(f"{D}/missions.csv")
a = pd.read_csv(f"{D}/actions.csv")
r = pd.read_csv(f"{D}/readings.csv")
an = pd.read_csv(f"{D}/anomalies.csv")
loc = pd.read_csv(f"{D}/locations.csv")
ast = pd.read_csv(f"{D}/assets.csv")

a["ok"] = a.status == "SUCCESS"
a = a.merge(loc[["location_id", "location_name", "zone_type", "environment", "x_coord", "y_coord"]], on="location_id", how="left")
a = a.merge(ast[["asset_id", "asset_name", "asset_type", "criticality"]], on="asset_id", how="left")
a["battery_bucket"] = pd.cut(a.battery_pct, [0, 30, 60, 101], right=False, labels=["Under 30%", "30 to 60%", "60% and up"])

PRETTY = {
    "NAVIGATION": "Navigation", "VISUAL_INSPECTION": "Visual inspection", "THERMAL_INSPECTION": "Thermal inspection",
    "ACOUSTIC_INSPECTION": "Acoustic inspection", "GAUGE_READING": "Gauge reading",
}
def pretty(s):
    return PRETTY.get(s, str(s).replace("_", " ").capitalize()) if isinstance(s, str) else s


def rate_table(df, col, extra=None):
    g = df.groupby(col, observed=True).agg(n=("ok", "size"), successes=("ok", "sum")).reset_index()
    g["failures"] = g.n - g.successes
    g["rate"] = (g.successes / g.n).round(3)
    g = g.rename(columns={col: "group"})
    if extra is not None:
        g = g.merge(extra, left_on="group", right_index=True, how="left")
    return g.sort_values("rate").to_dict("records")


# ---------- reading flags: baseline per measurement type from GOOD readings, flag every reading ----------
# Per-asset baselines don't work here: ~2 readings per asset per type.
rr = r.copy()
good = rr[rr.quality == "GOOD"]
stats = good.groupby("measurement_type").value.agg(["mean", "std", "count"]).reset_index()
rr = rr.merge(stats, on="measurement_type", how="left")
rr["z"] = ((rr.value - rr["mean"]) / rr["std"]).round(2)
rr["flagged"] = rr.z.abs() > 2
rr = rr.merge(a[["action_id", "status"]], on="action_id", how="left")

# ---------- per mission ----------
an_j = an.merge(a[["action_id", "status", "action_type"]], on="action_id", how="left") \
         .merge(loc[["location_id", "location_name"]], on="location_id", how="left")
SEV = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}

def brief(mi, fails, anoms, flags):
    s = [f"Mission {mi.mission_id} was marked {mi.mission_status.lower()}."]
    ok = 10 - len(fails)
    if len(fails) == 0:
        s.append("All 10 actions succeeded.")
    else:
        parts = [f"{pretty(f['action_type']).lower()} at {f['location_name']} ({f['asset_id']})" for f in fails]
        s.append(f"{ok} of 10 actions succeeded. Failed: {'; '.join(parts)}.")
    rev = [x for x in anoms if x["review_required"]]
    if anoms:
        hidden = sum(1 for x in anoms if x["action_status"] == "SUCCESS")
        t = f"{len(anoms)} anomal{'y' if len(anoms) == 1 else 'ies'} recorded, {len(rev)} needing review"
        if hidden:
            t += f", {hidden} on an action that reported success"
        s.append(t + ".")
    if flags:
        s.append(f"{len(flags)} reading{'s' if len(flags) > 1 else ''} fell outside the normal range for its type.")
    s.append(f"Battery went from {mi.start_battery_pct}% to {mi.end_battery_pct}%.")
    if rev:
        top = sorted(rev, key=lambda x: SEV[x["severity"]])[0]
        s.append(f"Next: check {top['asset_id']} at {top['location_name']} ({top['severity'].lower()} {top['type'].replace('_', ' ').lower()}).")
    elif fails:
        s.append(f"Next: review why {fails[0]['location_name']} failed.")
    else:
        s.append("Next: no action needed.")
    return " ".join(s)

missions = []
for _, mi in m.iterrows():
    ma = a[a.mission_id == mi.mission_id].sort_values("sequence")
    fails = ma[~ma.ok]
    fail_list = [{
        "action_id": f.action_id, "seq": int(f.sequence), "timestamp": f.timestamp,
        "location_id": f.location_id, "location_name": f.location_name, "asset_id": f.asset_id,
        "asset_name": f.asset_name, "criticality": f.criticality, "action_type": f.action_type,
        "failure_type": f.failure_type, "battery_pct": int(f.battery_pct),
    } for f in fails.itertuples()]
    anoms = an_j[an_j.mission_id == mi.mission_id]
    anom_list = sorted([{
        "anomaly_id": x.anomaly_id, "action_id": x.action_id, "timestamp": x.timestamp,
        "location_id": x.location_id, "location_name": x.location_name, "asset_id": x.asset_id,
        "type": x.anomaly_type, "severity": x.severity, "review_required": bool(x.operator_review_required),
        "action_status": x.status,
    } for x in anoms.itertuples()], key=lambda d: SEV[d["severity"]])
    fl = rr[(rr.mission_id == mi.mission_id) & rr.flagged]
    flag_list = [{
        "reading_id": x.reading_id, "action_id": x.action_id, "asset_id": x.asset_id, "location_id": x.location_id,
        "timestamp": x.timestamp, "measurement_type": x.measurement_type, "value": float(x.value), "unit": x.unit,
        "normal_mean": round(float(x.mean), 2), "z": float(x.z), "quality": x.quality, "action_status": x.status,
    } for x in fl.itertuples()]
    readings = [{
        "reading_id": x.reading_id, "action_id": x.action_id, "asset_id": x.asset_id, "location_id": x.location_id,
        "timestamp": x.timestamp, "measurement_type": x.measurement_type, "value": float(x.value), "unit": x.unit,
        "quality": x.quality, "z": None if pd.isna(x.z) else float(x.z), "flagged": bool(x.flagged),
    } for x in rr[rr.mission_id == mi.mission_id].itertuples()]
    missions.append({
        "mission_id": mi.mission_id, "name": mi.mission_name, "status": mi.mission_status,
        "config": mi.configuration_version, "scenario": mi.scenario, "start": mi.start_time, "end": mi.end_time,
        "duration_min": int(mi.duration_min), "start_battery": int(mi.start_battery_pct), "end_battery": int(mi.end_battery_pct),
        "actions_total": len(ma), "actions_ok": int(ma.ok.sum()),
        "actions": [{
            "action_id": x.action_id, "seq": int(x.sequence), "timestamp": x.timestamp, "location_id": x.location_id,
            "location_name": x.location_name, "x": float(x.x_coord), "y": float(x.y_coord), "asset_id": x.asset_id,
            "action_type": x.action_type, "status": x.status,
            "failure_type": None if pd.isna(x.failure_type) else x.failure_type, "battery_pct": int(x.battery_pct),
        } for x in ma.itertuples()],
        "failed_actions": fail_list, "anomalies": anom_list, "reading_flags": flag_list, "readings": readings,
        "brief": brief(mi, fail_list, anom_list, flag_list),
    })

# ---------- replay stream, rebuilt from the CSVs (same structure as replay.ndjson) ----------
events, eid = [], 0
def ev(mid, ts, etype, details, t0):
    global eid
    eid += 1
    events.append({"event_id": f"E{eid:05d}", "mission_id": mid, "timestamp": ts, "event_type": etype,
                   "t_offset_sec": int((datetime.fromisoformat(ts) - t0).total_seconds()), "details": details})
for _, mi in m.iterrows():
    t0 = datetime.fromisoformat(mi.start_time)
    ev(mi.mission_id, mi.start_time, "MISSION_STARTED", {"scenario": mi.scenario, "configuration_version": mi.configuration_version, "battery_pct": int(mi.start_battery_pct)}, t0)
    for x in a[a.mission_id == mi.mission_id].sort_values("sequence").itertuples():
        ev(mi.mission_id, x.timestamp, "ACTION_STARTED", {"action_id": x.action_id, "location_id": x.location_id, "asset_id": x.asset_id, "action_type": x.action_type, "battery_pct": int(x.battery_pct)}, t0)
        ev(mi.mission_id, x.timestamp, "ACTION_COMPLETED" if x.ok else "ACTION_FAILED", {"action_id": x.action_id, "status": x.status, "failure_type": "" if pd.isna(x.failure_type) else x.failure_type}, t0)
    ev(mi.mission_id, mi.end_time, "MISSION_COMPLETED", {"status": mi.mission_status, "end_battery_pct": int(mi.end_battery_pct)}, t0)

# ---------- assemble ----------
mc = (m.mission_status == "COMPLETED")
fails_per = a[~a.ok].groupby("mission_id").size()
comp_with_fail = int(sum(fails_per.get(x, 0) > 0 for x in m[mc].mission_id))
v = a.groupby("configuration_version").ok.mean()

out = {
    "generated_at": datetime.now().isoformat(timespec="seconds"),
    "summary": {
        "missions": len(m), "missions_completed": int(mc.sum()), "mission_completion_rate": round(mc.mean(), 3),
        "actions": len(a), "actions_ok": int(a.ok.sum()), "action_success_rate": round(a.ok.mean(), 3),
        "completed_missions_with_failures": comp_with_fail,
        "anomalies": len(an), "anomalies_review_required": int(an.operator_review_required.sum()),
        "anomalies_on_successful_actions": int((an_j.status == "SUCCESS").sum()),
        "reading_flags": int(rr.flagged.sum()), "readings_questionable": int((r.quality == "QUESTIONABLE").sum()),
        "date_range": [m.start_time.min(), m.end_time.max()],
    },
    "headline_findings": [
        f"{int(mc.sum())} of {len(m)} missions say completed, but {comp_with_fail} of those had at least one failed action inside.",
        f"After the configuration change (V1 to V2), action success rose from {v['V1']:.0%} to {v['V2']:.0%}.",
        "DRAFT: third finding comes from step two (battery, action type, or location).",
    ],
    "by_config_version": rate_table(a, "configuration_version"),
    "by_battery_bucket": rate_table(a, "battery_bucket"),
    "by_action_type": rate_table(a, "action_type"),
    "by_failure_type": a[~a.ok].failure_type.value_counts().rename_axis("group").reset_index(name="n").to_dict("records"),
    "by_location": rate_table(a, "location_id", loc.set_index("location_id")[["location_name", "zone_type", "environment", "x_coord", "y_coord"]]),
    "locations": loc.drop(columns="synthetic").to_dict("records"),
    "missions": missions,
    "replay_events": events,
    "how_computed": {
        "mission_completion_rate": "missions.csv: mission_status == COMPLETED / all missions",
        "action_success_rate": "actions.csv: status == SUCCESS / all actions",
        "reading_flags": "readings.csv: normal range per measurement_type from GOOD readings (mean, std); every reading flagged if abs(z) > 2",
        "battery_bucket": "actions.csv battery_pct at the time of the action: under 30, 30 to 60, 60 and up",
        "location": "uses the action's location_id, not the asset's home location",
    },
    "data_notes": [
        "All data is synthetic and fictional.",
        "scenario and configuration_version are the same split: BASELINE is always V1 (18 missions), IMPROVED is always V2 (9 missions).",
        "V2 missions all run after V1 (Sept 7 evening onward), so V1 vs V2 is a before/after comparison, not a side-by-side test.",
        "An asset's home location (assets.csv) differs from the action's location in 23% of actions. We use the action's location.",
        "42 of 220 readings are marked QUESTIONABLE. They are left out when computing normal ranges but are still checked against them.",
        "Normal ranges are per measurement type, not per asset: each asset has only about 2 readings per type.",
        "In the replay stream an action's start and result share one timestamp, so action duration comes from actions.csv, not the stream.",
        "The one FAILED mission (M017) still ends with a MISSION_COMPLETED event whose status is FAILED.",
    ],
}

with open(OUT, "w") as f:
    json.dump(out, f, indent=1, default=str)
print("wrote", OUT, "| missions", len(missions), "| events", len(events), "| reading flags", int(rr.flagged.sum()))
