"""SPOT Mission Intelligence dashboard.

Run from the repo root:
    pip install streamlit plotly pandas
    streamlit run app/app.py

The app reads ONLY app/findings.json. Nothing here does analysis.
If a number looks wrong, fix it in analysis/build_findings.py and rebuild findings.json.

Layout: three tabs. Each tab is one function below. Look for "EDIT HERE" comments
for the places that are safe to change without touching the data logic.
"""
import json
import re
import time
from pathlib import Path

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

# --------------------------------------------------------------------------------------
# Setup
# --------------------------------------------------------------------------------------
st.set_page_config(page_title="SPOT Mission Intelligence", page_icon="🐕", layout="wide")

FINDINGS_PATH = Path(__file__).parent / "findings.json"

# EDIT HERE: colors. Keep green/red for success/failure; everything else is up to you.
OK, BAD, WARN, NEUTRAL = "#1f9d55", "#d64545", "#e0a100", "#6b7280"
V1_COLOR, V2_COLOR = "#2a78d6", "#eb6834"

PRETTY = {
    "NAVIGATION": "Navigation", "VISUAL_INSPECTION": "Visual inspection", "THERMAL_INSPECTION": "Thermal inspection",
    "ACOUSTIC_INSPECTION": "Acoustic inspection", "GAUGE_READING": "Gauge reading",
}


def pretty(s):
    """Turn SENSOR_TIMEOUT into 'Sensor timeout'. Use this on anything from the data before showing it."""
    if not isinstance(s, str) or not s:
        return ""
    return PRETTY.get(s, s.replace("_", " ").capitalize())


def unit_label(r):
    return "%" if r["unit"] == "pct" else f" {r['unit']}"


def reading_label(r):
    """'Localization confidence 48.8%' or 'Temperature 41.4 C'."""
    name = re.sub(r" (pct|c|db|psi)$", "", pretty(r["measurement_type"]))
    return f"{name} {r['value']:g}{unit_label(r)}"


@st.cache_data
def load():
    with open(FINDINGS_PATH) as f:
        return json.load(f)


D = load()
MISSIONS = {m["mission_id"]: m for m in D["missions"]}


def pct(x):
    return f"{round(100 * x)}%"


# --------------------------------------------------------------------------------------
# Header: the one-sentence story, on every tab
# --------------------------------------------------------------------------------------
s = D["summary"]
st.title("SPOT Mission Intelligence")
# EDIT HERE: the tagline. Keep it to one sentence with the two numbers.
st.markdown(
    f"**{s['missions_completed']} of {s['missions']} missions say completed, "
    f"but {s['completed_missions_with_failures']} of those had a failed action inside.** "
    f"Overall, {pct(s['action_success_rate'])} of actions succeeded."
)

tab_mission, tab_trends, tab_live = st.tabs(["What happened on a mission", "Is it getting better?", "Live mission"])


# --------------------------------------------------------------------------------------
# Tab 1: post-mission report
# --------------------------------------------------------------------------------------
def mission_tab():
    left, right = st.columns([1, 3])
    with left:
        # EDIT HERE: default mission. M014 is the demo mission (AI brief + 2 review anomalies).
        ids = list(MISSIONS)
        mid = st.selectbox("Mission", ids, index=ids.index("M014") if "M014" in ids else 0)
    m = MISSIONS[mid]

    # Headline numbers
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Actions succeeded", f"{m['actions_ok']} of {m['actions_total']}")
    c2.metric("Robot said", m["status"].capitalize())
    c3.metric("Battery", f"{m['start_battery']}% → {m['end_battery']}%")
    needs_human = [a for a in m["anomalies"] if a["review_required"]]
    c4.metric("Needs a human", len(needs_human) + len(m["failed_actions"]))

    # Shift-log brief
    st.subheader("Shift-log brief")
    ai = m.get("brief_source") == "model" and m.get("brief_ai")
    text = m["brief_ai"] if ai else m["brief"]
    body, _, nxt = text.rpartition(" Next:")
    st.markdown(f"> {body}")
    if nxt:
        st.markdown(f"**Next:**{nxt}")
    if ai:
        st.caption(f"Written by {D.get('brief_model', {}).get('model', 'an open-weight model')} from this mission's numbers, then checked by code.")
    else:
        st.caption("Template brief. The AI draft for this mission was rejected by the checks, so the template is shown.")

    # What needs attention, most severe first
    st.subheader("What requires attention")
    sev_rank = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
    rows = []
    for a in sorted(m["anomalies"], key=lambda a: sev_rank[a["severity"]]):
        rows.append({
            "Priority": a["severity"].capitalize(), "What": pretty(a["type"]), "Where": a["location_name"],
            "Asset": a["asset_id"], "Review": "Yes" if a["review_required"] else "No",
            "Action status": a["action_status"].capitalize(), "When": a["timestamp"][11:16],
        })
    for f in m["failed_actions"]:
        rows.append({
            "Priority": "Failed action", "What": f"{pretty(f['action_type'])}: {pretty(f['failure_type'])}",
            "Where": f["location_name"], "Asset": f["asset_id"], "Review": "",
            "Action status": "Failed", "When": f["timestamp"][11:16],
        })
    for r in m["reading_flags"]:
        rows.append({
            "Priority": "Unusual reading", "What": f"{reading_label(r)} (normal about {r['normal_mean']:g}{unit_label(r)})",
            "Where": r["location_id"], "Asset": r["asset_id"], "Review": "", "Action status": r["action_status"].capitalize(),
            "When": r["timestamp"][11:16],
        })
    if rows:
        st.dataframe(pd.DataFrame(rows), hide_index=True, width="stretch")
    else:
        st.success("Nothing needs attention on this mission.")

    # Where it happened: the 10 stops on the facility map
    st.subheader("Where it happened")
    acts = pd.DataFrame(m["actions"])
    acts["Result"] = acts["status"].map({"SUCCESS": "Succeeded", "FAILED": "Failed"})
    acts["label"] = acts["seq"].astype(str)
    fig = px.scatter(
        acts, x="x", y="y", color="Result", text="label",
        color_discrete_map={"Succeeded": OK, "Failed": BAD},
        hover_data={"location_name": True, "asset_id": True, "action_type": True, "battery_pct": True, "x": False, "y": False, "label": False},
    )
    fig.add_trace(go.Scatter(x=acts["x"], y=acts["y"], mode="lines", line=dict(color=NEUTRAL, width=1, dash="dot"), showlegend=False, hoverinfo="skip"))
    fig.update_traces(marker=dict(size=22), textposition="middle center", textfont=dict(color="white", size=11), selector=dict(mode="markers+text"))
    fig.update_layout(height=420, xaxis=dict(visible=False, range=[0, 100]), yaxis=dict(visible=False, range=[0, 100]), legend_title="", margin=dict(l=10, r=10, t=10, b=10))
    st.plotly_chart(fig, width="stretch")

    # Every action, in order
    with st.expander("All 10 actions in order"):
        show = acts[["seq", "timestamp", "location_name", "asset_id", "action_type", "battery_pct", "status", "failure_type"]].copy()
        show["action_type"] = show["action_type"].map(pretty)
        show["failure_type"] = show["failure_type"].map(pretty)
        show.columns = ["Step", "Time", "Where", "Asset", "Action", "Battery %", "Result", "Failure"]
        st.dataframe(show, hide_index=True, width="stretch")

    with st.expander("How we got these numbers"):
        for k, v in D["how_computed"].items():
            st.markdown(f"- **{k}**: {v}")


# --------------------------------------------------------------------------------------
# Tab 2: trends
# --------------------------------------------------------------------------------------
def trends_tab():
    # Headline findings as plain sentences
    for line in D["headline_findings"]:
        st.markdown(f"- {line}")

    st.subheader("Battery is the biggest driver of failure")
    bb = pd.DataFrame(D["by_battery_bucket"])
    bb["Success rate"] = bb["rate"] * 100
    bb["label"] = bb["rate"].map(pct)
    order = ["Under 30%", "30 to 60%", "60% and up"]
    fig = px.bar(bb, x="group", y="Success rate", text="label", category_orders={"group": order},
                 color=bb["group"].eq("Under 30%").map({True: "low", False: "ok"}),
                 color_discrete_map={"low": BAD, "ok": V1_COLOR}, hover_data={"n": True})
    fig.update_layout(showlegend=False, xaxis_title="Battery when the action ran", yaxis_title="Actions that succeeded (%)", yaxis_range=[0, 100], height=380)
    fig.update_traces(textposition="outside")
    st.plotly_chart(fig, width="stretch")

    col1, col2 = st.columns(2)
    with col1:
        st.subheader("V1 vs V2: a fair fight")
        st.caption("Overall V2 looks much better. At the same battery level the gap mostly disappears.")
        bc = pd.DataFrame(D["by_battery_and_config"])
        bc["Success rate"] = bc["rate"] * 100
        bc["label"] = bc["rate"].map(pct)
        fig = px.bar(bc, x="battery_band", y="Success rate", color="version", barmode="group", text="label",
                     category_orders={"battery_band": order}, color_discrete_map={"V1": V1_COLOR, "V2": V2_COLOR}, hover_data={"n": True})
        fig.update_layout(xaxis_title="Battery when the action ran", yaxis_title="Actions that succeeded (%)", yaxis_range=[0, 110], height=380, legend_title="")
        fig.update_traces(textposition="outside")
        st.plotly_chart(fig, width="stretch")
    with col2:
        st.subheader("V2 keeps the robot charged")
        st.caption("Each line is one mission, from starting battery to ending battery. Red zone is under 30%.")
        fig = go.Figure()
        fig.add_shape(type="rect", x0=-0.5, x1=1.5, y0=0, y1=30, fillcolor=BAD, opacity=0.12, line_width=0)
        for m in D["missions"]:
            c = V1_COLOR if m["config"] == "V1" else V2_COLOR
            fig.add_trace(go.Scatter(x=["Start", "End"], y=[m["start_battery"], m["end_battery"]], mode="lines+markers",
                                     line=dict(color=c, width=2), marker=dict(size=6), name=m["config"], legendgroup=m["config"],
                                     showlegend=False, hovertemplate=f"{m['mission_id']} ({m['config']})<br>%{{y}}%<extra></extra>"))
        fig.add_trace(go.Scatter(x=[None], y=[None], mode="lines", line=dict(color=V1_COLOR), name="V1"))
        fig.add_trace(go.Scatter(x=[None], y=[None], mode="lines", line=dict(color=V2_COLOR), name="V2"))
        fig.update_layout(yaxis_title="Battery %", yaxis_range=[0, 100], height=380, legend_title="")
        st.plotly_chart(fig, width="stretch")

    col3, col4 = st.columns(2)
    with col3:
        st.subheader("Which inspections fail most")
        at = pd.DataFrame(D["by_action_type"]).sort_values("rate")
        at["Action"] = at["group"].map(pretty)
        at["Success rate"] = at["rate"] * 100
        at["label"] = at["rate"].map(pct)
        fig = px.bar(at, y="Action", x="Success rate", orientation="h", text="label", hover_data={"n": True},
                     color=at["rate"].eq(at["rate"].min()).map({True: "worst", False: "rest"}), color_discrete_map={"worst": BAD, "rest": NEUTRAL})
        fig.update_layout(showlegend=False, xaxis_range=[0, 100], height=320, yaxis_title="", xaxis_title="Actions that succeeded (%)")
        st.plotly_chart(fig, width="stretch")
    with col4:
        st.subheader("Where failures happen")
        loc = pd.DataFrame(D["by_location"])
        loc["Failure rate"] = (1 - loc["rate"]) * 100
        fig = px.scatter(loc, x="x_coord", y="y_coord", size="n", color="Failure rate", text="location_name",
                         color_continuous_scale=["#e5e7eb", BAD], size_max=40,
                         hover_data={"failures": True, "n": True, "environment": True, "x_coord": False, "y_coord": False})
        fig.update_traces(textposition="top center", textfont_size=10)
        fig.update_layout(height=320, xaxis=dict(visible=False), yaxis=dict(visible=False), coloraxis_colorbar_title="Fail %", margin=dict(l=10, r=10, t=10, b=10))
        st.plotly_chart(fig, width="stretch")

    with st.expander("Data notes and assumptions"):
        for n in D["data_notes"]:
            st.markdown(f"- {n}")


# --------------------------------------------------------------------------------------
# Tab 3: live replay
# --------------------------------------------------------------------------------------
def live_tab():
    left, right = st.columns([1, 3])
    with left:
        ids = list(MISSIONS)
        mid = st.selectbox("Replay mission", ids, index=ids.index("M014") if "M014" in ids else 0, key="live_mid")
        # EDIT HERE: playback speed. 60x means a 30-minute mission plays in 30 seconds.
        speed = st.select_slider("Speed", options=[30, 60, 120, 300], value=60, format_func=lambda v: f"{v}x")
        play = st.button("Play mission", type="primary")
    m = MISSIONS[mid]
    events = [e for e in D["replay_events"] if e["mission_id"] == mid]

    status = right.empty()
    progress = right.progress(0, text="Waiting to start")
    cols = right.columns(3)
    k_done, k_ok, k_batt = cols[0].empty(), cols[1].empty(), cols[2].empty()
    alerts_box = right.container()
    alerts_box.markdown("**Needs a human**")
    alerts = alerts_box.empty()
    feed = right.expander("Event feed", expanded=True).empty()

    anomalies_by_action = {}
    for a in m["anomalies"]:
        anomalies_by_action.setdefault(a["action_id"], []).append(a)

    done = ok = 0
    battery = m["start_battery"]
    alert_lines, feed_lines = [], []
    if not play:
        status.info("Press Play to replay this mission from its event stream.")
        return
    t_prev = 0
    for e in events:
        if speed and e["t_offset_sec"] > t_prev:
            time.sleep(min((e["t_offset_sec"] - t_prev) / speed, 2.0))
        t_prev = e["t_offset_sec"]
        d = e["details"]
        clock = e["timestamp"][11:19]
        if e["event_type"] == "MISSION_STARTED":
            feed_lines.append(f"{clock}  Mission started, battery {d['battery_pct']}%")
        elif e["event_type"] == "ACTION_STARTED":
            battery = d["battery_pct"]
            feed_lines.append(f"{clock}  {pretty(d['action_type'])} at {d['location_id']} ({d['asset_id']}), battery {battery}%")
        elif e["event_type"] in ("ACTION_COMPLETED", "ACTION_FAILED"):
            done += 1
            if d["status"] == "SUCCESS":
                ok += 1
                feed_lines.append(f"{clock}  ✅ succeeded")
            else:
                feed_lines.append(f"{clock}  ❌ failed: {pretty(d['failure_type'])}")
                alert_lines.append(f"❌ Action failed: {pretty(d['failure_type'])} ({d['action_id']})")
            for a in anomalies_by_action.get(d["action_id"], []):
                flag = "🔴" if a["severity"] in ("CRITICAL", "HIGH") else "🟡"
                alert_lines.append(f"{flag} {a['severity'].capitalize()} {pretty(a['type']).lower()} on {a['asset_id']} at {a['location_name']}"
                                   + (" (needs review)" if a["review_required"] else ""))
        elif e["event_type"] == "MISSION_COMPLETED":
            feed_lines.append(f"{clock}  Mission ended: {d['status'].lower()}, battery {d['end_battery_pct']}%")
            battery = d["end_battery_pct"]

        status.markdown(f"**{mid}** · {clock}")
        progress.progress(done / m["actions_total"], text=f"{done} of {m['actions_total']} actions done")
        k_done.metric("Actions done", done)
        k_ok.metric("Succeeded", ok)
        k_batt.metric("Battery", f"{battery}%", delta=None)
        alerts.markdown("\n".join(f"- {x}" for x in alert_lines) if alert_lines else "_Nothing yet_")
        feed.code("\n".join(feed_lines[-12:]))
    status.success(f"**{mid}** finished: {ok} of {m['actions_total']} actions succeeded. Robot reported: {m['status'].lower()}.")


with tab_mission:
    mission_tab()
with tab_trends:
    trends_tab()
with tab_live:
    live_tab()
