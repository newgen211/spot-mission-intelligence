# SPOT Mission Intelligence — Knight Hacks IX

NextEra Innovation Team challenge. Boston Dynamics SPOT robots run autonomous inspection missions at Plant St. Lucie (gauge scanning, thermal imaging, acoustic monitoring). Prize: interview, negotiated to cover full-time.

## The one sentence
94% of 963 missions "completed" but only 77% of 5,546 actions succeeded. This tool finds the 17-point gap, explains it in plain words, and gives operators a reason to trust the robot.

## Who it's for
- Plant operators: not technical, want "did it work, what failed, do I need to go look myself."
- Innovation Team engineers: want the failure patterns so they can fix reliability.
- Judges are the Innovation Team. They already know what's in the data. Win by finding it and saying it clearly.

## Tracks entered with this one build
| Track | What qualifies it |
| --- | --- |
| NextEra | The challenge itself |
| Databricks | Analysis notebook on Databricks free edition, exported to the app |
| Hugging Face | Open-weight model writes the plain-English mission brief |
| AI/ML main track | Anomaly flags + the brief |

## Data: first 30 minutes
Before writing any code, answer these from the files they gave:
- Grain: one row per action? per reading? per mission? What joins them?
- Fields: mission id, action id, action type, location/waypoint, timestamp, reading value, units, success flag, failure reason, anomaly flag.
- Time span, how many robots, how many waypoints.
- What "completed mission" vs "successful action" means in the columns. The gap lives here.
- Ask the NextEra people: what do operators complain about? Which failures are hardware, environment, or operator? That goes straight into the design.

## Analysis (Sat morning, pandas, before any UI)
Answer in this order and write each answer down as a sentence with a number:
1. Action success rate by action type. Which type drags the average down?
2. By location/waypoint. Are a few spots responsible for most failures?
3. By time: hour of day, day of week, week over week. Getting better or worse?
4. By mission: are failures spread out or clustered in bad missions?
5. Failure reason breakdown, if the field exists.
6. Repeat offenders: waypoint + action type pairs that fail 3+ times in a row.
7. Reading anomalies: per gauge, z-score against its own history; flag |z| > 3 and missing reads.

The top three findings become the headline of the dashboard and the first thing said to judges.

## Dashboard (Sat afternoon, Streamlit)
Three tabs, big numbers, plain words, red/yellow/green. No jargon on screen.

**1. Live mission**
- Current mission: progress bar of actions done / planned, running success count.
- Map or waypoint list with status per stop.
- Latest readings with green/red against normal range.
- "Needs a human" list: failed actions and anomalies, in order.

**2. Post-mission**
- Mission picker. Headline: "38 of 41 actions succeeded."
- What failed, where, why (reason field or best guess), and whether it has failed before at that spot.
- Plain-English brief (see below).
- One-click export to PDF or text for the shift log.

**3. Trends**
- Weekly action success rate, line.
- Failure rate by action type and by location, bars.
- Repeat-offender table: location, action type, streak, last seen.
- Gauge drift: readings over time with anomaly points marked.

## Plain-English brief (Hugging Face)
Small open-weight instruct model from the Hub (Qwen2.5-1.5B-Instruct or similar, CPU or ZeroGPU Space). Input: the mission's structured summary (counts, failures, anomalies, repeat flags). Output: 3 to 5 sentences an operator reads in 20 seconds.

Rules: the model only writes from the numbers it's given; it never invents a cause. Template fallback if the model is slow or wrong.

Example target: "Mission 412 finished with 38 of 41 actions successful. All three failures were thermal reads at the east feedwater pump, the third mission in a row at that spot, so the camera or the waypoint likely needs attention. Gauge PI-204 read 12% above its 30-day average and is flagged for a manual check. No acoustic anomalies."

## Anomaly flags
- Action failed (from data).
- Reading missing when expected.
- Reading out of range: z-score per gauge vs its own history, |z| > 3.
- Repeat failure: same waypoint + action type failed 3+ consecutive missions.
- Isolation Forest across readings only if time allows. Don't start here.

## Build plan
| When | Done means |
| --- | --- |
| Fri night | Data loaded, grain understood, 7 analysis questions answered in a notebook |
| Sat 12 PM | Streamlit skeleton with Trends tab live from real data |
| Sat 4 PM | Post-mission tab + anomaly flags |
| Sat 8 PM | Live mission tab (replay a mission from the data with a timer) + brief generator |
| Sat 11 PM | Demo recorded as backup video |
| Sun AM | Devpost writeup, 2-min video, rehearse 3x |

Cut order if behind: Isolation Forest, then live replay (show post-mission only), then the model brief (template fallback stays).

## Team split
- Daryl: data analysis, anomaly logic, post-mission and trends tabs.
- Teammate: Streamlit layout and styling, live replay tab, Devpost page, demo video.

## Demo script (2 minutes)
1. "You told us 94% of missions complete but 77% of actions succeed. Here's where the gap is." Trends tab: the one chart that shows the biggest failure driver.
2. Post-mission tab, one real mission: headline number, failures listed in plain words, the brief paragraph.
3. Live tab, replay 20 seconds: a failure comes in, "needs a human" updates.
4. Close: "Operators see what failed and what to do. Engineers see what to fix. Nobody has to read a log."

## Judging rubric to hit
- Makes mission data understandable and actionable: plain words, big numbers.
- Surfaces location, timestamp, reading value, anomaly flags: all four on every screen.
- Builds operator confidence real-time and post-mission: live tab and post-mission tab.
- No technical expertise required: zero jargon on screen; the brief is the test.

## Stack
Python, pandas, Streamlit, Plotly, scikit-learn (z-score by hand, Isolation Forest optional), transformers (brief), Databricks free edition for the analysis notebook.
