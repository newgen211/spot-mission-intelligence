# Spot-MIA dashboard

Open `index.html` in a browser. No build, no server, no dependencies.

Files
- index.html: layout and the four views (Overview, Mission control, What needs attention, Is it getting better?)
- styles.css: light and dark teal palette, all classes scoped under #spot-click-through
- app.js: navigation, mission replay on the floor plan, telemetry, alerts, mission report, results filters, trends charts
- sample-data.js: window.SPOT_SAMPLE_DATA, generated from findings.json (27 missions, 270 actions, 40 anomalies, 15 reading flags, AI briefs)
- fictional_floor_plan.png: the facility map; waypoint pins are placed with the measured px/py in sample-data.js

How the replay works
- Pick a mission in the queue, press Play (or space bar). The robot walks the route pin to pin, the battery gauge drains, alerts appear on the right as they happen.
- Speeds 1x to 8x. Restart, Skip to end, click a numbered step, a pin on the map, or an alert to jump to that action. Space plays and pauses, left and right arrows step.
- Light / dark toggle in the header. The choice is remembered in the browser.
- When the mission ends the report fills in: actions succeeded, what the robot reported, the brief, the Next step, and the attention table.
- "Show on map" in What needs attention jumps straight to that action.

Where the numbers come from
- Everything on screen is read from sample-data.js. Nothing is computed from hard-coded values in app.js except chart layout.
- Briefs marked "Written by Qwen2.5-1.5B-Instruct" passed every code check. Missions whose AI draft failed a check show the template brief instead. The Next step is always chosen by code.
