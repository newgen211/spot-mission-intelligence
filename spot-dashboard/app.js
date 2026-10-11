// Dashboard navigation, waypoint controls, results, and replay.
(() => {
    const root = document.getElementById('spot-click-through');
    const data = window.SPOT_SAMPLE_DATA;
    const missions = data.missions;
    let current = missions[0], step = 0, filter = 'review', scope = null;
    const q = s => root.querySelector(s), qa = s => Array.from(root.querySelectorAll(s));
    const esc = s => String(s ?? '—').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const friendly = s => String(s || 'Unknown').toLowerCase().replace(/_/g, ' ').replace(/^./, c => c.toUpperCase());
    const when = s => s ? `${s.slice(0, 10)} · ${s.slice(11, 19)}` : '—';
    const loc = id => data.locations.find(l => l.id === id)?.name || id;
    const field = (label, value) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
    function view(name) { qa('[data-screen]').forEach(el => el.hidden = el.dataset.screen !== name); qa('[data-view]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.view === name))); q('#sp-page-title').textContent = ({ overview: 'Spot, at a glance', missions: 'What did Spot do?', demo: 'Follow a mission', results: 'What needs attention?' })[name]; }
    function actionDetails(m, a) { const flag = m.flags.find(f => f.s === a.s), anom = m.anoms.filter(n => n.s === a.s); return `<h3>${esc(m.id)} · Step ${a.s}</h3><dl>${field('Location', `${loc(a.loc)} · ${a.loc}`)}${field('Asset', a.asset)}${field('Timestamp', when(a.ts))}${field('Inspection', friendly(a.type))}${field('Reading value', flag ? `${flag.val} ${flag.unit === 'pct' ? '%' : flag.unit}` : 'Reading not supplied')}${field('Step result', a.ok ? 'Successful' : `Unsuccessful · ${friendly(a.fail)}`)}${field('Anomaly flag', anom.length ? anom.map(n => `${friendly(n.type)} · ${n.rev ? 'Needs review' : 'No review requested'}`).join('; ') : 'No recorded flag for this step')}</dl>`; }
    // Pin centers measured on the supplied 1095 × 595 illustration.
    // These are display coordinates, not physical robot coordinates.
    const floorPins = [
        { id: 'WP01', floor: '1', x: 109, y: 451 },
        { id: 'WP02', floor: '1', x: 112, y: 306 },
        { id: 'WP03', floor: '1', x: 253, y: 229 },
        { id: 'WP04', floor: '1', x: 216, y: 79 },
        { id: 'WP05', floor: '1', x: 447, y: 214 },
        { id: 'WP06', floor: '1', x: 554, y: 79 },
        { id: 'WP07', floor: '1', x: 664, y: 273 },
        { id: 'WP08', floor: '1', x: 380, y: 401 },
        { id: 'WP09', floor: '1', x: 552, y: 401 },
        { id: 'WP10', floor: '1', x: 672, y: 416 },
        { id: 'WP11', floor: '2', x: 850, y: 127 },
        { id: 'WP12', floor: '2', x: 1002, y: 135 },
        { id: 'WP13', floor: '2', x: 837, y: 314 },
        { id: 'WP14', floor: '2', x: 992, y: 343 },
        { id: 'WP15', floor: '2', x: 895, y: 467 }
    ];
    let mapFloor = 'all';
    let selectedWaypoint = null;
    let selectedWaypointStep = null;
    function waypointState(id) {
        const acts = current.acts.filter(a => a.loc === id);
        if (!acts.length)
            return 'absent';
        if (current.anoms.some(n => n.loc === id && n.rev))
            return 'review';
        if (acts.some(a => !a.ok))
            return 'missed';
        return 'visited';
    }
    const stateLabels = { absent: 'Not in mission', review: 'Needs review', missed: 'Missed step', visited: 'Successful steps' };
    function selectWaypoint(id, requestedStep) {
        selectedWaypoint = id;
        const pin = floorPins.find(p => p.id === id);
        const acts = current.acts.filter(a => a.loc === id);
        qa('[data-point]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.point === id)));
        if (!acts.length) {
            selectedWaypointStep = null;
            q('#sp-waypoint-detail').innerHTML = `<h3>${esc(id)} · Floor ${esc(pin.floor)}</h3><p>${esc(loc(id))}</p><span class="sp-badge">Not in selected mission</span><p class="sp-muted">No recorded inspection steps for this waypoint in ${esc(current.id)}.</p>`;
            return;
        }
        const a = acts.find(a => a.s === requestedStep) ||
            acts.find(a => current.flags.some(f => f.s === a.s)) ||
            acts.find(a => current.anoms.some(n => n.s === a.s && n.rev)) || acts[0];
        selectedWaypointStep = a.s;
        q('#sp-waypoint-detail').innerHTML = `<p class="sp-small sp-muted">${esc(id)} · Floor ${esc(pin.floor)} · ${acts.length} recorded step${acts.length === 1 ? '' : 's'}</p>` +
            (acts.length > 1 ? `<label class="sp-step-picker">Inspection step<select id="sp-waypoint-step">${acts.map(item => `<option value="${item.s}" ${item.s === a.s ? 'selected' : ''}>Step ${item.s} · ${esc(friendly(item.type))}</option>`).join('')}</select></label>` : '') + actionDetails(current, a);
        const picker = q('#sp-waypoint-step');
        if (picker)
            picker.onchange = e => selectWaypoint(id, Number(e.target.value));
    }
    function renderMap() {
        q('#sp-map-mission').value = current.id;
        q('#sp-floor-viewport').dataset.floor = mapFloor;
        qa('.sp-map-toolbar [data-floor]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.floor === mapFloor)));
        const points = floorPins.filter(p => mapFloor === 'all' || p.floor === mapFloor);
        q('#sp-map-hotspots').innerHTML = points.map(p => {
            const state = waypointState(p.id);
            return `<button type="button" class="sp-map-hit cursor-interaction" data-point="${p.id}" data-state="${state}" aria-pressed="false" aria-label="${p.id}, Floor ${p.floor}, ${esc(loc(p.id))}, ${stateLabels[state]}" style="left:${(p.x / 1095 * 100).toFixed(4)}%;top:${(p.y / 595 * 100).toFixed(4)}%"></button>`;
        }).join('');
        q('#sp-point-grid').innerHTML = points.map(p => {
            const state = waypointState(p.id);
            return `<button type="button" class="cursor-interaction" data-point="${p.id}" data-state="${state}" aria-pressed="false"><span>${p.id}</span><small>${stateLabels[state]}</small></button>`;
        }).join('');
        q('#sp-map-caption').textContent = `Mission ${current.id} · ${when(current.start)} · ${new Set(current.acts.map(a => a.loc)).size} waypoints recorded`;
        qa('[data-point]').forEach(b => b.onclick = () => selectWaypoint(b.dataset.point));
        if (selectedWaypoint && points.some(p => p.id === selectedWaypoint))
            selectWaypoint(selectedWaypoint, selectedWaypointStep);
        else {
            selectedWaypoint = null;
            selectedWaypointStep = null;
            q('#sp-waypoint-detail').innerHTML = '<h3>Inspection details</h3><p class="sp-muted">Select a pin or waypoint to view its location, timestamp, reading, and anomaly flag.</p>';
        }
    }
    q('#sp-map-mission').innerHTML = missions.map(m => `<option value="${m.id}">${m.id} · ${when(m.start)}</option>`).join('');
    q('#sp-map-mission').onchange = e => {
        current = missions.find(m => m.id === e.target.value);
        selectedWaypoint = null;
        selectedWaypointStep = null;
        step = 0;
        renderMap();
        renderDemo();
    };
    qa('.sp-map-toolbar [data-floor]').forEach(b => b.onclick = () => { mapFloor = b.dataset.floor; renderMap(); });
    function renderMissions() { q('#sp-mission-list').innerHTML = missions.slice().reverse().map(m => `<button class="sp-mission cursor-interaction" data-mission="${m.id}"><span><span>${m.id} · ${esc(friendly(m.status))}</span><br><span class="sp-small sp-muted">${when(m.start)} · ${m.dur} min</span></span><span class="sp-small">${m.acts.filter(a => a.ok).length}/${m.acts.length} steps successful<br>${m.anoms.filter(a => a.rev).length} flags need review →</span></button>`).join(''); qa('[data-mission]').forEach(b => b.onclick = () => { current = missions.find(m => m.id === b.dataset.mission); scope = current.id; filter = 'review'; renderMap(); renderResults(); view('results'); }); }
    function renderResults() {
        qa('#sp-result-filters button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
        q('#sp-results-scope').textContent = scope ? `Mission ${scope} · ${missions.find(m => m.id === scope).brief}` : 'All sample missions';
        const ms = scope ? missions.filter(m => m.id === scope) : missions;
        let rows = [];
        for (const m of ms) {
            if (filter === 'review')
                for (const a of m.anoms.filter(a => a.rev))
                    rows.push({ m, a: m.acts.find(s => s.s === a.s), value: friendly(a.type), flag: `${friendly(a.sev)} · Needs review` });
            if (filter === 'failed')
                for (const a of m.acts.filter(a => !a.ok))
                    rows.push({ m, a, value: 'No successful reading confirmed', flag: friendly(a.fail) });
            if (filter === 'readings')
                for (const f of m.flags)
                    rows.push({ m, a: m.acts.find(a => a.s === f.s), value: `${f.val} ${f.unit === 'pct' ? '%' : f.unit}`, flag: friendly(f.type) });
        }
        q('#sp-selected-result').innerHTML = '';
        q('#sp-result-content').innerHTML = rows.length ? `<table><thead><tr><th>Location / asset</th><th>Timestamp</th><th>${filter === 'readings' ? 'Reading' : 'Finding'}</th><th>Flag / reason</th><th>Details</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td>${esc(loc(r.a.loc))}<br><span class="sp-muted">${esc(r.a.asset)} · ${r.m.id}</span></td><td>${esc(when(r.a.ts))}</td><td>${esc(r.value)}</td><td>${esc(r.flag)}</td><td><button class="cursor-interaction" data-row="${i}">View</button></td></tr>`).join('')}</tbody></table>` : '<p class="sp-muted" style="padding:18px 0">No matching records in this mission.</p>';
        qa('[data-row]').forEach(b => b.onclick = () => { const r = rows[Number(b.dataset.row)]; q('#sp-selected-result').innerHTML = `<hr class="sp-separator">${actionDetails(r.m, r.a)}`; });
    }
    function renderDemo() { const a = current.acts[step]; q('#sp-demo-mission').value = current.id; q('#sp-demo-stage').innerHTML = `<span class="sp-badge">Sample event ${step + 1} / ${current.acts.length}</span><h2>${esc(loc(a.loc))}</h2><p>${esc(friendly(a.type))} · ${esc(a.asset)}</p><span>${a.ok ? 'Step successful' : `Step unsuccessful · ${esc(friendly(a.fail))}`}</span><p class="sp-small sp-muted">Recorded ${when(a.ts)} · Battery at this event: ${a.bat}%</p>`; q('#sp-prev').disabled = step === 0; q('#sp-next').disabled = step === current.acts.length - 1; }
    qa('[data-view]').forEach(b => b.onclick = () => { if (b.dataset.view === 'demo')
        renderDemo(); if (b.dataset.view === 'results')
        renderResults(); view(b.dataset.view); });
    qa('[data-go]').forEach(b => b.onclick = () => { if (b.dataset.filter) {
        filter = b.dataset.filter;
        scope = null;
        renderResults();
    } view(b.dataset.go); });
    q('#sp-open-demo').onclick = () => { step = 0; renderDemo(); view('demo'); };
    q('#sp-demo-mission').innerHTML = missions.map(m => `<option value="${m.id}">${m.id} · ${when(m.start)}</option>`).join('');
    q('#sp-demo-mission').onchange = e => { current = missions.find(m => m.id === e.target.value); step = 0; renderDemo(); renderMap(); };
    q('#sp-prev').onclick = () => { step = Math.max(0, step - 1); renderDemo(); };
    q('#sp-next').onclick = () => { step = Math.min(current.acts.length - 1, step + 1); renderDemo(); };
    q('#sp-demo-results').onclick = () => { scope = current.id; filter = 'failed'; renderResults(); view('results'); };
    qa('#sp-result-filters button').forEach(b => b.onclick = () => { filter = b.dataset.filter; renderResults(); });
    q('#sp-all-results').onclick = () => { scope = null; renderResults(); };
    renderMap();
    renderMissions();
    renderDemo();
    renderResults();
})();
