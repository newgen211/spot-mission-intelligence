# SPOT findings

All numbers from the supplied synthetic data (27 missions, 270 actions, 220 readings, 40 anomalies). Reproduce with `python analysis/step2_analysis.py data`.

## Headline

1. **Completed does not mean it worked.** 26 of 27 missions say completed, but 21 of those 26 had at least one failed action. Only 5 missions were clean.
2. **Battery is the strongest driver of failure.** Below 30% battery, 49% of actions succeed (27% below 20%). Above 30%, 87% succeed.
3. **V2's improvement is mostly a battery story.** V2 raised action success from 77% to 91%, but it also halved battery drain per mission (56 to 28 points) and never ran below 30%. At the same battery level (60%+), V1 and V2 are 86% vs 90%. With battery controlled, the V2 effect is no longer significant (logistic regression, p = 0.82).
4. **Anomalies hide inside successful actions.** 8 anomalies sit on actions that reported success, 3 needing review, including a CRITICAL abnormal temperature on HX-204 in M020.

## The challenge's eight questions

| # | Question | Answer |
| --- | --- | --- |
| 1 | Can a mission complete with failed actions? | Yes. 21 of 26 completed missions had failures; 9 had 3 failures, the same as the one FAILED mission (M017). |
| 2 | Least reliable inspection type? | Acoustic 70%, gauge reading 74%, navigation 82%, thermal 86%, visual 91%. Thermal and visual stay significantly better after controlling for battery. |
| 3 | Failures concentrated by location? | Partly. Top 3 waypoints hold 49% of failures. Pipe Gallery (WP05) has the most (11) but is visited most; by rate, Turbine Hall South (WP09) is worst at 64%. |
| 4 | Battery related to reliability? | Strongly. Success falls from 89% at 60%+ to 49% under 30%. The last two actions of a mission fail most (63% and 70% success). |
| 5 | Anomalies hidden in successful missions? | Yes. 38 of 40 anomalies are in completed missions; 8 are on successful actions. 14 of 27 missions have an anomaly needing review. |
| 6 | Do configuration versions differ? | V2: 91% vs V1: 77%, but V2 runs on much higher battery. At matched battery the gap is about 4 points and not significant. V2 missions are also faster (129 s vs 176 s between actions). |
| 7 | Can an operator find the top issue quickly? | Answered by the dashboard: needs-a-human list ranked by severity, and each brief ends with one "Next:" step. |
| 8 | Replay stream insights? | The supplied file stops at event E00500 (mid M023), so 5 missions, all V2, never finish. Start and result share one timestamp, so the stream holds no timing beyond the CSVs. Gaps between actions average 161 s against 50 s of action time, so most mission time is travel. |

## Added questions

| # | Question | Answer |
| --- | --- | --- |
| 9 | Is V2 better or just better charged? | Mostly better charged (see headline 3). Halving drain may itself be what V2 changed; the data can't tell. |
| 10 | Does environment matter? | Weakly. Dusty 69%, high noise 78%, low light 80%, normal 92%. Small samples; not a headline. |
| 11 | Do failures hit critical assets? | Not more than others (critical assets 89% success). 12 failures on HIGH or CRITICAL assets; HX-217 (critical) failed twice in M014. |
| 12 | Repeat offenders? | PANEL-212 (Turbine Hall): 5 failures and 5 anomalies, the most of any asset. The first stop, navigation at Pipe Gallery, fails 26% of the time. |
| 13 | Does reading quality add signal? | No. QUESTIONABLE appears exactly when the action failed (42 of 42). |

## Assumptions

- Location means the action's location_id, not the asset's home location (they differ 23% of the time).
- scenario and configuration_version are one variable. V2 ran after V1, so it is before/after, not a controlled test.
- Normal reading ranges are per measurement type from GOOD readings; flagged when abs(z) > 2.
