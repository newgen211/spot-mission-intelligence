# SPOT dashboard app

```bash
pip install streamlit plotly pandas
streamlit run app/app.py        # from the repo root
```

The app reads only `app/findings.json`. To refresh the numbers:

```bash
python analysis/build_findings.py data app/findings.json
python analysis/brief_model.py app/findings.json --recheck
```

## Where things are in app.py

| Section | Function | What it shows |
| --- | --- | --- |
| Header | top of file | Title and the one-sentence story |
| Tab 1 | `mission_tab()` | Mission picker, four big numbers, shift-log brief, what-needs-attention table, map of the 10 stops |
| Tab 2 | `trends_tab()` | Headline findings, battery chart, V1 vs V2 at matched battery, battery start/end lines, action types, location map |
| Tab 3 | `live_tab()` | Replays a mission from the event stream with a progress bar and a needs-a-human list |

Lines marked `# EDIT HERE` are safe to change (colors, default mission, tagline, playback speed).
`pretty()` turns `SENSOR_TIMEOUT` into `Sensor timeout`; use it on anything from the data before showing it.
