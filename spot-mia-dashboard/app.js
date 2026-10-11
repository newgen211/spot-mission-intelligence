// Spot-MIA dashboard: navigation, mission replay on the floor plan, report, results, and trends.
// Reads only window.SPOT_SAMPLE_DATA (sample-data.js). No numbers are computed from anywhere else.
(() => {
    const root = document.getElementById('spot-click-through');
    const D = window.SPOT_SAMPLE_DATA;
    const MS = D.missions;
    const LOC = Object.fromEntries(D.locations.map(l => [l.id, l]));
    const S = D.summary;
    const q = s => root.querySelector(s), qa = s => Array.from(root.querySelectorAll(s));
    const esc = s => String(s ?? '—').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const PRETTY = { NAVIGATION: 'Navigation', VISUAL_INSPECTION: 'Visual inspection', THERMAL_INSPECTION: 'Thermal inspection', ACOUSTIC_INSPECTION: 'Acoustic inspection', GAUGE_READING: 'Gauge reading' };
    const friendly = s => !s ? '' : (PRETTY[s] || String(s).toLowerCase().replace(/_/g, ' ').replace(/^./, c => c.toUpperCase()));
    const readingName = t => friendly(t).replace(/ (pct|c|db|psi)$/, '');
    const unit = u => u === 'pct' ? '%' : ' ' + u;
    const when = s => s ? `${new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${s.slice(11, 16)}` : '—';
    const pct = x => Math.round(x * 100) + '%';
    const SVG = 'http://www.w3.org/2000/svg';
    const sv = (tag, attrs = {}, text) => { const e = document.createElementNS(SVG, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); if (text != null) e.textContent = text; return e; };
    const reviewCount = m => m.anoms.filter(a => a.rev).length;

    /* ---------------- Navigation ---------------- */
    const TITLES = { overview: ['Spot, at a glance', 'What the robot reported, and what it missed.'], control: ['Mission control', 'Replay any mission on the floor plan, then read the report.'], results: ['What needs attention?', 'Everything an operator should look at, across all missions.'], trends: ['Is it getting better?', 'Why missions fail, and what changed between V1 and V2.'] };
    function view(name) {
        qa('[data-screen]').forEach(el => el.hidden = el.dataset.screen !== name);
        qa('.sp-nav [data-view]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.view === name)));
        q('#sp-page-title').textContent = TITLES[name][0]; q('#sp-page-sub').textContent = TITLES[name][1];
        if (name === 'trends') drawTrends();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    qa('[data-view]').forEach(b => b.onclick = () => view(b.dataset.view));

    /* ---------------- Theme ---------------- */
    let theme = null; try { theme = localStorage.getItem('sp-theme'); } catch (e) { }
    const applyTheme = () => { document.documentElement.style.colorScheme = theme || ''; q('#sp-theme').textContent = theme === 'dark' ? 'Light mode' : theme === 'light' ? 'Dark mode' : (matchMedia('(prefers-color-scheme: dark)').matches ? 'Light mode' : 'Dark mode'); };
    q('#sp-theme').onclick = () => { const sysDark = matchMedia('(prefers-color-scheme: dark)').matches; theme = theme ? (theme === 'dark' ? 'light' : 'dark') : (sysDark ? 'light' : 'dark'); try { localStorage.setItem('sp-theme', theme); } catch (e) { } applyTheme(); };
    applyTheme();

    /* ---------------- Overview ---------------- */
    q('#sp-hero-line').textContent = `${S.missions_completed} of ${S.missions} missions say completed. ${S.completed_missions_with_failures} of them had a failed inspection inside.`;
    q('#sp-hero-sub').textContent = `Overall, ${pct(S.action_success_rate)} of actions succeeded. The biggest reason they fail is battery: below 30%, success drops to about half.`;
    const stats = [
        [`${S.missions_completed} / ${S.missions}`, 'Missions completed', 'A finished route can still miss readings.', 'control'],
        [`${S.actions_ok} / ${S.actions}`, 'Inspection steps successful', `${S.actions - S.actions_ok} steps were unsuccessful.`, 'results', 'failed'],
        [String(S.anomalies_review_required), 'Anomalies needing review', `of ${S.anomalies} anomaly flags recorded.`, 'results', 'review'],
        [String(S.anomalies_on_successful_actions), 'Hidden behind a success', 'Anomalies on steps the robot reported as fine.', 'results', 'hidden'],
    ];
    q('#sp-stats').innerHTML = stats.map(([v, l, s, go, f]) => `<button class="sp-stat" data-go="${go}" ${f ? `data-filter="${f}"` : ''}><span class="sp-value">${esc(v)}</span><span>${esc(l)}</span><span class="sp-small">${esc(s)}</span></button>`).join('');
    const acts = MS.flatMap(m => m.acts.map(a => ({ ...a, v: m.v, mid: m.id })));
    const rate = rs => rs.length ? rs.filter(a => a.ok).length / rs.length : 0;
    const low = acts.filter(a => a.bat < 30), high = acts.filter(a => a.bat >= 30);
    const drain = v => { const ms = MS.filter(m => m.v === v); return Math.round(ms.reduce((s, m) => s + m.b0 - m.b1, 0) / ms.length); };
    const findings = [
        [`${S.completed_missions_with_failures} of ${S.missions_completed}`, 'completed missions had a failed action inside. Mission status is a receipt, not an inspection.'],
        [pct(rate(low)), `of actions succeed under 30% battery, against ${pct(rate(high))} above it. Battery is the biggest driver of failure.`],
        [`${drain('V1')} → ${drain('V2')} pts`, 'battery used per mission, V1 to V2. At the same battery level the two versions perform about the same.'],
        [String(S.anomalies_on_successful_actions), 'anomalies sit on actions that reported success, including a critical abnormal temperature.'],
    ];
    q('#sp-findings').innerHTML = findings.map(([b, p]) => `<div class="sp-finding"><b class="sp-num">${esc(b)}</b><p>${esc(p)}</p></div>`).join('');
    qa('[data-go]').forEach(b => b.onclick = () => { if (b.dataset.filter) { filter = b.dataset.filter; scope = null; renderResults(); } view(b.dataset.go); });
    q('#sp-start-tour').onclick = () => { view('control'); load('M014'); setTimeout(() => { if (!playing) play(); }, 350); };
    const DEMO = { M014: 'Start here', M020: 'Critical, hidden' };
    const V2_FIRST = MS.find(m => m.v === 'V2').id;
    const avgDrain = { V1: drain('V1'), V2: drain('V2') };
    {
        const s = q('#sp-timeline'), W = 1200, H = 190, t = 26, b = 44, l = 36, r = 10, bw = (W - l - r) / MS.length, Y = v => H - b - (H - b - t) * v / 10;
        [0, 5, 10].forEach(v => { s.append(sv('line', { class: 'grid-l', x1: l, x2: W - r, y1: Y(v), y2: Y(v) })); s.append(sv('text', { x: l - 6, y: Y(v) + 4, 'text-anchor': 'end' }, v)); });
        MS.forEach((m, i) => {
            const ok = m.acts.filter(a => a.ok).length, x = l + i * bw + bw * .15, w = bw * .7, rev = reviewCount(m);
            const bar = sv('rect', { class: 'bar', x, y: Y(ok), width: w, height: Y(0) - Y(ok), rx: 3, fill: m.v === 'V1' ? 'var(--sp-v1)' : 'var(--sp-v2)', opacity: m.status === 'COMPLETED' ? 1 : .35 });
            bar.append(sv('title', {}, `${m.id} · ${m.v} · ${when(m.start)}\n${ok} of 10 succeeded · robot said ${m.status}\n${rev ? rev + ' need review' : 'nothing to review'} · battery ${m.b0}% → ${m.b1}%`));
            bar.addEventListener('click', () => { view('control'); load(m.id, true); });
            s.append(bar);
            if (rev) s.append(sv('rect', { x: x + w / 2 - 4, y: Y(ok) - 10, width: 8, height: 5, rx: 1.5, fill: 'var(--sp-bad)', 'pointer-events': 'none' }));
            if (ok < 10) s.append(sv('text', { x: x + w / 2, y: Y(0) + 4 + 7, 'text-anchor': 'middle', fill: 'var(--sp-bad)', 'font-size': 10 }, (10 - ok) + '✕'));
            if (i % 3 === 0 || m.id === V2_FIRST) s.append(sv('text', { x: x + w / 2, y: H - 18, 'text-anchor': 'middle', 'font-size': 11 }, m.id));
            if (m.id === V2_FIRST) { s.append(sv('line', { x1: x - bw * .15, x2: x - bw * .15, y1: t - 8, y2: Y(0), stroke: 'var(--sp-v2)', 'stroke-dasharray': '4 3' })); s.append(sv('text', { x: x - bw * .15 + 6, y: t, fill: 'var(--sp-v2)', 'font-size': 11, 'font-weight': 600 }, 'Configuration V2 begins · ' + when(m.start).split(' ·')[0])); }
        });
        s.append(sv('text', { x: l, y: H - 2, 'font-size': 11 }, `V1: ${MS.filter(m => m.v === 'V1').length} missions, Sep 1–7 · V2: ${MS.filter(m => m.v === 'V2').length} missions, Sep 7–10 · faded bar = robot said FAILED · ✕ = actions failed inside`));
    }

    /* ---------------- Mission queue ---------------- */
    let qf = 'all';
    qa('#sp-queue-filters button').forEach(b => b.onclick = () => { qf = b.dataset.qf; qa('#sp-queue-filters button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); renderQueue(); });
    function renderQueue() {
        const list = MS.filter(m => qf === 'all' || (qf === 'review' ? reviewCount(m) > 0 : m.v === qf)).slice().reverse();
        q('#sp-queue-count').textContent = `${list.length} shown`;
        q('#sp-mission-list').innerHTML = list.map((m, i) => { const n = reviewCount(m); const divider = (qf === 'all' || qf === 'review') && m.v === 'V1' && list[i - 1]?.v === 'V2' ? `<div class="sp-divider">Configuration V2 begins above · Sep 7</div>` : ''; return divider + `<button class="sp-mission" data-mission="${m.id}" aria-current="${m.id === cur?.id}"><span><span class="sp-mono">${m.id}</span> <span class="sp-small sp-muted">${when(m.start)}</span>${DEMO[m.id] ? ` <span class="sp-tag start">${DEMO[m.id]}</span>` : ''}</span><span class="sp-pill ${m.v.toLowerCase()}">${m.v}</span><span class="sp-small ${n ? 'sp-bad' : 'sp-muted'}" style="grid-column:1/-1">${m.acts.filter(a => a.ok).length}/10 succeeded${n ? ` · ${n} need${n === 1 ? 's' : ''} review` : ''}${m.status === 'FAILED' ? ' · robot said FAILED' : ''}</span><span class="sp-strip" aria-hidden="true">${m.acts.map(a => `<i class="${a.ok ? '' : 'f'}"></i>`).join('')}</span></button>`; }).join('');
        qa('[data-mission]').forEach(b => b.onclick = () => load(b.dataset.mission, true));
    }

    /* ---------------- Map overlay on the floor plan ---------------- */
    const ov = q('#sp-overlay');
    function stopPositions(m) {
        const seen = {};
        return m.acts.map(a => { const l = LOC[a.loc]; const k = seen[a.loc] = (seen[a.loc] || 0) + 1; const ang = (k - 2) * 1.1 + 0.5; const off = k === 1 ? 0 : 30; return { x: l.px + Math.cos(ang) * off, y: l.py - Math.sin(ang) * off, px: l.px, py: l.py, leader: k > 1 }; });
    }
    function drawBase() {
        ov.replaceChildren();
        ov.append(sv('path', { class: 'route-shadow', id: 'sp-route-shadow' }), sv('path', { class: 'route', id: 'sp-route' }), sv('path', { class: 'trail', id: 'sp-trail' }), sv('path', { class: 'trail-core', id: 'sp-trail-core' }));
        ov.append(sv('g', { id: 'sp-stops' }));
        ov.append(sv('circle', { class: 'robot-halo', id: 'sp-halo', r: 26, cx: -100, cy: -100 }), sv('circle', { class: 'robot', id: 'sp-robot', r: 11, cx: -100, cy: -100 }));
    }

    /* ---------------- Playback ---------------- */
    let cur = null, P = [], idx = -1, playing = false, speed = 2, raf = 0, phase = 'idle', phaseStart = 0, lastPos = null, alertN = 0;
    const TRAVEL = 1500, WORK = 900, SPEEDS = [1, 2, 4, 8];
    SPEEDS.forEach(s => { const b = document.createElement('button'); b.textContent = s + 'x'; b.setAttribute('aria-pressed', String(s === speed)); b.onclick = () => { speed = s; qa('#sp-speed button').forEach((x, i) => x.setAttribute('aria-pressed', String(SPEEDS[i] === s))); }; q('#sp-speed').append(b); });

    function load(id, finished) {
        cancelAnimationFrame(raf); playing = false;
        cur = MS.find(m => m.id === id); P = stopPositions(cur);
        qa('[data-mission]').forEach(b => b.setAttribute('aria-current', String(b.dataset.mission === id)));
        q('#sp-map-title').textContent = `Facility map · ${id}`;
        q('#sp-map-caption').textContent = `${when(cur.start)} · ${cur.dur} min · ${new Set(cur.acts.map(a => a.loc)).size} waypoints`;
        q('#sp-map-badge').textContent = `Config ${cur.v}`;
        const d = 'M' + P.map(p => `${p.px},${p.py}`).join(' L');
        q('#sp-route').setAttribute('d', d); q('#sp-route-shadow').setAttribute('d', d);
        const stops = q('#sp-stops'); stops.replaceChildren();
        P.forEach((p, i) => { const g = sv('g', { class: 'stop pending', id: 'sp-stop' + i }); const a = cur.acts[i]; g.append(sv('title', {}, `Action ${a.s}: ${friendly(a.type)} · ${a.asset} at ${LOC[a.loc].name}\nBattery ${a.bat}% · ${a.ok ? 'succeeded' : 'failed: ' + friendly(a.fail).toLowerCase()}${cur.anoms.some(x => x.s === a.s && x.rev) ? ' · needs review' : ''}\nClick to jump here`)); g.addEventListener('click', () => jumpTo(i)); if (p.leader) g.append(sv('line', { x1: p.px, y1: p.py, x2: p.x, y2: p.y, stroke: '#fff', 'stroke-width': 1.5, opacity: .7 })); g.append(sv('circle', { class: 'ping', id: 'sp-ping' + i, cx: p.x, cy: p.y, r: 14 }), sv('circle', { cx: p.x, cy: p.y, r: 13 }), sv('text', { x: p.x, y: p.y }, String(i + 1))); stops.append(g); });
        q('#sp-steps').innerHTML = cur.acts.map((a, i) => `<button aria-label="Jump to action ${i + 1}">${i + 1}</button>`).join('');
        qa('#sp-steps button').forEach((b, i) => b.onclick = () => jumpTo(i));
        reset();
        if (finished) finish();
    }
    function reset() {
        idx = -1; phase = 'idle'; lastPos = { x: P[0].px, y: P[0].py };
        qa('#sp-stops .stop').forEach(s => s.setAttribute('class', 'stop pending'));
        qa('#sp-steps button').forEach(b => b.className = '');
        q('#sp-trail').setAttribute('d', ''); q('#sp-trail-core').setAttribute('d', '');
        placeRobot(lastPos.x, lastPos.y);
        q('#sp-alerts').innerHTML = '<p class="sp-empty">Nothing yet. Alerts appear here as the mission runs.</p>'; setAlertCount(0);
        setBattery(cur.b0); setStats(0, 0, 0); q('#sp-clock').textContent = cur.start.slice(11, 19);
        sparkFrame(); sparkDraw(0, cur.b0);
        setNow(null); q('#sp-tele-state').textContent = 'Ready';
        renderReport(false); setPlayLabel();
    }
    const SX = i => 30 + (300 - 30 - 8) * i / 10, SY = v => 66 - 58 * v / 100;
    function sparkFrame() {
        const s = q('#sp-spark'); s.replaceChildren();
        s.append(sv('rect', { x: SX(0), y: SY(30), width: SX(10) - SX(0), height: SY(0) - SY(30), fill: 'var(--sp-bad)', opacity: .1 }));
        [0, 30, 60, 100].forEach(v => { s.append(sv('line', { class: 'grid-l', x1: SX(0), x2: SX(10), y1: SY(v), y2: SY(v), stroke: 'var(--sp-line)' })); s.append(sv('text', { x: SX(0) - 4, y: SY(v) + 3, 'text-anchor': 'end' }, v + '%')); });
        s.append(sv('text', { x: SX(0), y: 78 }, 'start'), sv('text', { x: SX(10), y: 78, 'text-anchor': 'end' }, 'action 10'));
        s.append(sv('path', { id: 'sp-spark-line', fill: 'none', stroke: 'var(--sp-robot)', 'stroke-width': 2, 'stroke-linejoin': 'round' }), sv('circle', { id: 'sp-spark-dot', r: 3.5, fill: 'var(--sp-robot)' }));
    }
    function sparkDraw(n, liveX, liveB) {
        const pts = [[SX(0), SY(cur.b0)], ...cur.acts.slice(0, n).map((a, i) => [SX(i + 1), SY(a.bat)])];
        if (liveB != null) pts.push([SX(liveX), SY(liveB)]);
        q('#sp-spark-line').setAttribute('d', 'M' + pts.map(p => p.join(',')).join(' L'));
        const last = pts[pts.length - 1]; const d = q('#sp-spark-dot'); d.setAttribute('cx', last[0]); d.setAttribute('cy', last[1]); d.setAttribute('fill', last[1] > SY(30) ? 'var(--sp-bad)' : 'var(--sp-robot)');
    }
    function placeRobot(x, y) { for (const id of ['sp-robot', 'sp-halo']) { const c = q('#' + id); c.setAttribute('cx', x); c.setAttribute('cy', y); } }
    function setTrail(points) { const d = points.length ? 'M' + points.map(p => `${p.x},${p.y}`).join(' L') : ''; q('#sp-trail').setAttribute('d', d); q('#sp-trail-core').setAttribute('d', d); }
    function setBattery(b) {
        const v = Math.round(b); const el = q('#sp-bat'); el.textContent = v + '%'; el.classList.toggle('low', v < 30);
        const f = q('#sp-gauge-fill'); f.style.width = v + '%'; f.style.background = v < 30 ? 'var(--sp-bad)' : v < 45 ? 'var(--sp-amber)' : 'var(--sp-ok)';
        q('#sp-bat-note').innerHTML = v < 30 ? '<span class="sp-bad">In the danger zone. Sensor failures rise sharply here.</span>' : v < 45 ? '<span style="color:var(--sp-amber)">Approaching the danger zone</span>' : '<span class="sp-muted">Healthy range</span>';
    }
    function setStats(d, o, b) { q('#sp-st-done').textContent = d; q('#sp-st-ok').textContent = o; q('#sp-st-bad').textContent = b; }
    function setNow(a, state) {
        const n = q('#sp-now');
        if (!a) { n.innerHTML = '<div class="k">Current action</div><div class="sp-small sp-muted">Waiting to start. Press Play to replay this mission.</div>'; return; }
        const l = LOC[a.loc];
        n.innerHTML = `<div class="k">Action ${a.s} of 10 · ${state === 'travel' ? 'walking to' : state === 'work' ? 'inspecting' : 'result'}</div><div class="t">${esc(friendly(a.type))}</div><div class="sp-small sp-muted">${esc(a.asset)} at ${esc(l.name)}</div>` + (state === 'done' ? `<div class="r ${a.ok ? 'sp-ok' : 'sp-bad'}">${a.ok ? '✓ Succeeded' : '✕ Failed: ' + esc(friendly(a.fail))}</div>` : state === 'work' ? '<div class="r" style="color:var(--sp-robot)">● Running…</div>' : '');
    }
    function setAlertCount(n) { alertN = n; const e = q('#sp-alert-n'); e.textContent = n; e.className = 'sp-alertn' + (n ? '' : ' zero'); }
    function pushAlert(kind, top, title, sub, tags, step) {
        const box = q('#sp-alerts'); if (!alertN) box.innerHTML = '';
        const a = document.createElement('div'); a.className = 'sp-alert new ' + kind; a.title = 'Click to show this on the map';
        if (step != null) a.addEventListener('click', () => jumpTo(step - 1));
        a.innerHTML = `<div class="top"><span>${esc(top[0])}</span><span>${esc(top[1])}</span></div><div class="t">${esc(title)}</div><div class="s">${esc(sub)}</div>` + tags.map(([c, t]) => `<span class="sp-tag ${c}">${esc(t)}</span>`).join('');
        box.prepend(a); setAlertCount(alertN + 1);
    }
    function resolveAction(i) {
        const a = cur.acts[i];
        const needsReview = cur.anoms.some(x => x.s === a.s && x.rev);
        q('#sp-stop' + i).setAttribute('class', 'stop ' + (a.ok ? 'ok' : 'bad') + (needsReview ? ' review' : ''));
        qa('#sp-steps button')[i].className = a.ok ? 'ok' : 'bad';
        if (!a.ok) { const p = q('#sp-ping' + i); p.classList.remove('go'); void p.getBBox(); p.classList.add('go'); }
        const done = i + 1, ok = cur.acts.slice(0, done).filter(x => x.ok).length;
        setStats(done, ok, done - ok); setBattery(a.bat); q('#sp-clock').textContent = a.ts.slice(11, 19); setNow(a, 'done'); sparkDraw(done);
        const where = LOC[a.loc].name, t = a.ts.slice(11, 16);
        if (!a.ok) pushAlert('fail', ['ACTION ' + a.s, t], `${friendly(a.type)} failed: ${friendly(a.fail).toLowerCase()}`, `${a.asset} at ${where} · battery ${a.bat}%`, a.bat < 30 ? [['hid', 'Under 30% battery']] : [], a.s);
        cur.anoms.filter(x => x.s === a.s).forEach(x => {
            const kind = x.sev === 'CRITICAL' || x.sev === 'HIGH' ? 'crit' : x.sev === 'MEDIUM' ? '' : 'low';
            const tags = []; if (x.rev) tags.push(['rev', 'Needs review']); if (x.onOk) tags.push(['hid', 'Hidden behind a success']);
            pushAlert(kind, [x.sev, t], friendly(x.type), `${x.asset} at ${LOC[x.loc].name}`, tags, a.s);
        });
        cur.flags.filter(f => f.s === a.s).forEach(f => pushAlert('read', ['READING', t], `${readingName(f.type)} ${f.val}${unit(f.unit)}`, `${f.asset} · normal is about ${f.norm}${unit(f.unit)}`, [], a.s));
        setTrail(P.slice(0, done).map(p => ({ x: p.px, y: p.py })));
    }
    function tick(now) {
        if (!playing) return;
        const dt = (now - phaseStart) * speed;
        if (phase === 'travel') {
            const from = lastPos, to = { x: P[idx].px, y: P[idx].py };
            const k = Math.min(1, dt / (idx === 0 ? 400 : TRAVEL)); const e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
            const x = from.x + (to.x - from.x) * e, y = from.y + (to.y - from.y) * e;
            placeRobot(x, y);
            const prevB = idx === 0 ? cur.b0 : cur.acts[idx - 1].bat; const liveB = prevB + (cur.acts[idx].bat - prevB) * k; setBattery(liveB); sparkDraw(idx, idx + k, liveB);
            setTrail([...P.slice(0, idx).map(p => ({ x: p.px, y: p.py })), { x, y }]);
            if (k >= 1) { phase = 'work'; phaseStart = now; setNow(cur.acts[idx], 'work'); q('#sp-tele-state').textContent = 'Inspecting'; }
        } else if (phase === 'work' && dt >= WORK) { resolveAction(idx); lastPos = { x: P[idx].px, y: P[idx].py }; next(now); }
        if (playing) raf = requestAnimationFrame(tick);
    }
    function next(now) {
        if (idx >= cur.acts.length - 1) { complete(true); return; }
        idx++; phase = 'travel'; phaseStart = now;
        qa('#sp-steps button').forEach((b, i) => b.classList.toggle('cur', i === idx));
        setNow(cur.acts[idx], 'travel'); q('#sp-tele-state').textContent = 'Walking';
    }
    function complete(scroll) {
        playing = false; phase = 'done'; setPlayLabel();
        if (scroll) { const panel = q('#sp-report-panel'); setTimeout(() => { panel.scrollIntoView({ behavior: 'smooth', block: 'start' }); panel.classList.remove('sp-flash'); void panel.offsetWidth; panel.classList.add('sp-flash'); }, 250); }
        qa('#sp-steps button').forEach(b => b.classList.remove('cur'));
        setBattery(cur.b1); q('#sp-clock').textContent = cur.end.slice(11, 19); q('#sp-tele-state').textContent = 'Mission ended';
        renderReport(true);
    }
    function play() {
        if (phase === 'done') reset();
        playing = !playing; setPlayLabel();
        if (playing) { const t = performance.now(); if (phase === 'idle') next(t); else if (phase === 'paused') { next(t); } else phaseStart = t; raf = requestAnimationFrame(tick); }
    }
    function setPlayLabel() { q('#sp-play').textContent = playing ? 'Pause' : phase === 'done' ? 'Replay mission' : phase === 'idle' ? 'Play' : 'Resume'; }
    function finish() { cancelAnimationFrame(raf); playing = false; reset(); cur.acts.forEach((_, i) => resolveAction(i)); placeRobot(P[P.length - 1].px, P[P.length - 1].py); idx = cur.acts.length - 1; complete(); }
    function jumpTo(i) { cancelAnimationFrame(raf); playing = false; reset(); for (let j = 0; j <= i; j++) resolveAction(j); idx = i; lastPos = { x: P[i].px, y: P[i].py }; placeRobot(lastPos.x, lastPos.y); if (i === cur.acts.length - 1) complete(); else { phase = 'paused'; q('#sp-tele-state').textContent = 'Paused'; qa('#sp-steps button').forEach((b, k) => b.classList.toggle('cur', k === i)); setPlayLabel(); } }
    q('#sp-play').onclick = play;
    q('#sp-restart').onclick = () => { cancelAnimationFrame(raf); playing = false; reset(); };
    q('#sp-skip').onclick = finish;
    document.addEventListener('keydown', e => {
        if (q('[data-screen="control"]').hidden || ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        if (e.code === 'Space' && document.activeElement.tagName !== 'BUTTON') { e.preventDefault(); play(); }
        if (e.code === 'ArrowRight') { e.preventDefault(); jumpTo(Math.min(cur.acts.length - 1, idx + 1)); }
        if (e.code === 'ArrowLeft') { e.preventDefault(); if (idx <= 0) { cancelAnimationFrame(raf); playing = false; reset(); } else jumpTo(idx - 1); }
    });

    /* ---------------- Report ---------------- */
    function renderReport(done) {
        const r = q('#sp-report'); q('#sp-report-sub').textContent = cur.id;
        if (!done) { r.innerHTML = '<p class="sp-muted sp-small">The report appears when the mission ends. Press Skip to end to see it now.</p>'; return; }
        const ok = cur.acts.filter(a => a.ok).length, nf = 10 - ok, isAI = !!cur.ai, rej = isAI ? null : D.rejected.find(x => x.m === cur.id);
        const rank = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        const rows = [];
        cur.anoms.slice().sort((a, b) => rank[a.sev] - rank[b.sev]).forEach(x => rows.push([friendly(x.sev), 'sp-sev ' + x.sev[0].toLowerCase(), friendly(x.type), x.asset, LOC[x.loc].name, cur.acts[x.s - 1].ts.slice(11, 16), [x.rev ? 'Needs review' : '', x.onOk ? 'On a successful action' : ''].filter(Boolean).join(' · ')]));
        cur.acts.filter(a => !a.ok).forEach(a => rows.push(['Failed', 'sp-sev f', `${friendly(a.type)}: ${friendly(a.fail).toLowerCase()}`, a.asset, LOC[a.loc].name, a.ts.slice(11, 16), `Battery ${a.bat}%`]));
        cur.flags.forEach(f => rows.push(['Reading', 'sp-sev r', `${readingName(f.type)} ${f.val}${unit(f.unit)} (normal about ${f.norm}${unit(f.unit)})`, f.asset, LOC[cur.acts[f.s - 1].loc].name, cur.acts[f.s - 1].ts.slice(11, 16), '']));
        r.innerHTML = `
      <div class="sp-rep-head">
        <div class="hl">${ok}<small> of 10 actions succeeded</small></div>
        <div><div class="sp-small sp-muted" style="text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">Robot reported</div><span class="sp-stamp ${cur.status === 'COMPLETED' ? 'ok' : 'bad'}">${esc(cur.status)}</span></div>
        <div class="sp-rep-meta"><span>Battery <b class="sp-num">${cur.b0}% → ${cur.b1}%</b></span><span>Duration <b class="sp-num">${cur.dur} min</b></span><span>Config <b>${esc(cur.v)}</b></span></div>
      </div>
      ${cur.status === 'COMPLETED' && nf ? `<div class="sp-irony">The robot stamped this mission completed, but ${nf} of its actions failed.</div>` : ''}
      <div class="sp-ctx">Used <b>${cur.b0 - cur.b1} pts</b> of battery in ${cur.dur} min. The V1 average is <b>${avgDrain.V1}</b>, the V2 average is <b>${avgDrain.V2}</b>.${cur.b1 < 30 ? ` Ended inside the danger zone, where ${pct(rate(low))} of actions succeed.` : ''}</div>
      <div class="sp-brief">
        <p>${esc(isAI ? cur.ai : cur.brief)}</p>
        <div class="sp-next"><span>Next</span>${esc(cur.next.charAt(0).toUpperCase() + cur.next.slice(1))}</div>
        <div class="sp-prov">${isAI ? `<span class="ai">✓ Written by ${esc(D.ai_model)} from this mission's numbers. Passed every check.</span>` : '<span class="tp">Template brief. The AI draft for this mission failed a check, so it is not shown.</span>'}<span>The Next step is chosen by code, never by the model.</span></div>
        ${rej ? `<div class="sp-rejected"><span class="w">What the AI said, and why we threw it out</span><q>${esc(rej.said.replace(/^"|"$/g, ''))}</q><div class="sp-muted" style="margin-top:4px">${esc(rej.why)}</div></div>` : ''}
        <details class="sp-honest"><summary>How we keep the AI honest</summary>
          <p style="margin-top:8px" class="sp-muted">The model only rewrites a fact sheet that code builds for one mission. About 20 checks in code reject any draft with a number, asset or place not in the facts, a guessed cause, an opinion, a wrong review flag, or above and below normal flipped. ${MS.filter(m => m.ai).length} of ${MS.length} drafts passed. Some that didn't:</p>
          <ul>${D.rejected.map(x => `<li><span class="sp-mono">${esc(x.m)}</span> <q>${esc(x.said.replace(/^"|"$/g, ''))}</q> ${esc(x.why)}</li>`).join('')}</ul>
        </details>
      </div>
      <div class="sp-rep-tools"><button class="sp-mini" id="sp-copy">Copy report as text</button><button class="sp-mini" data-scope-results="${cur.id}">All findings for this mission</button></div>
      ${rows.length ? `<h3 class="sp-sect">What requires attention</h3><div class="sp-table-wrap"><table><thead><tr><th>Priority</th><th>What</th><th>Asset</th><th>Where</th><th>Time</th><th>Note</th></tr></thead><tbody>${rows.map(x => `<tr><td class="${x[1]}">${esc(x[0])}</td><td>${esc(x[2])}</td><td class="sp-mono">${esc(x[3])}</td><td>${esc(x[4])}</td><td class="sp-mono">${esc(x[5])}</td><td class="sp-muted">${esc(x[6])}</td></tr>`).join('')}</tbody></table></div>` : '<p class="sp-ok" style="margin-top:14px">Nothing on this mission needs attention.</p>'}`;
        q('#sp-copy').onclick = () => {
            const txt = [`${cur.id} · ${cur.v} · ${when(cur.start)} · robot reported ${cur.status}`, `${ok} of 10 actions succeeded · battery ${cur.b0}% → ${cur.b1}% · ${cur.dur} min`, '', isAI ? cur.ai : cur.brief, `Next: ${cur.next}`, '', ...rows.map(x => `[${x[0]}] ${x[2]} · ${x[3]} · ${x[4]} · ${x[5]}${x[6] ? ' · ' + x[6] : ''}`)].join('\n');
            const b = q('#sp-copy'); (navigator.clipboard?.writeText(txt) || Promise.reject()).then(() => b.textContent = 'Copied', () => { b.textContent = 'Copy failed'; }); setTimeout(() => b.textContent = 'Copy report as text', 1500);
        };
        q('[data-scope-results]').onclick = () => { scope = cur.id; filter = 'review'; renderResults(); view('results'); };
    }

    /* ---------------- Results ---------------- */
    let filter = 'review', scope = null;
    function renderResults() {
        qa('#sp-result-filters button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
        q('#sp-results-scope').textContent = scope ? `Mission ${scope}` : `All ${MS.length} missions`;
        const ms = scope ? MS.filter(m => m.id === scope) : MS; const rows = [];
        const rank = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        for (const m of ms) {
            if (filter === 'review') m.anoms.filter(a => a.rev).forEach(a => rows.push({ m, a: m.acts[a.s - 1], what: friendly(a.type), flag: friendly(a.sev), sev: rank[a.sev], note: a.onOk ? 'Hidden behind a success' : '' }));
            if (filter === 'hidden') m.anoms.filter(a => a.onOk).forEach(a => rows.push({ m, a: m.acts[a.s - 1], what: friendly(a.type), flag: friendly(a.sev), sev: rank[a.sev], note: a.rev ? 'Needs review' : 'No review needed' }));
            if (filter === 'failed') m.acts.filter(a => !a.ok).forEach(a => rows.push({ m, a, what: friendly(a.type), flag: friendly(a.fail), sev: a.bat < 30 ? 0 : 1, note: `Battery ${a.bat}%` }));
            if (filter === 'readings') m.flags.forEach(f => rows.push({ m, a: m.acts[f.s - 1], what: `${readingName(f.type)} ${f.val}${unit(f.unit)}`, flag: `Normal about ${f.norm}${unit(f.unit)}`, sev: 0, note: '' }));
        }
        rows.sort((x, y) => x.sev - y.sev);
        if (filter === 'assets') {
            const by = {};
            for (const m of ms) { m.acts.forEach(a => { const o = by[a.asset] ||= { asset: a.asset, missions: new Set(), fails: 0, rev: 0, anoms: 0, locs: new Set(), first: null }; if (!a.ok) { o.fails++; o.missions.add(m.id); o.first ||= [m.id, a.s]; } o.locs.add(LOC[a.loc].name); }); m.anoms.forEach(x => { const o = by[x.asset] ||= { asset: x.asset, missions: new Set(), fails: 0, rev: 0, anoms: 0, locs: new Set(), first: null }; o.anoms++; if (x.rev) { o.rev++; o.missions.add(m.id); o.first ||= [m.id, x.s]; } }); }
            const list = Object.values(by).filter(o => o.missions.size).sort((a, b) => b.missions.size - a.missions.size || b.rev - a.rev);
            q('#sp-result-content').innerHTML = `<table><thead><tr><th>Asset</th><th>Missions with a problem</th><th>Failed actions</th><th>Anomalies</th><th>Needs review</th><th>Where</th><th></th></tr></thead><tbody>${list.map(o => `<tr><td class="sp-mono">${esc(o.asset)}</td><td class="sp-num ${o.missions.size >= 3 ? 'sp-bad' : ''}">${o.missions.size}</td><td>${o.fails}</td><td>${o.anoms}</td><td>${o.rev || ''}</td><td class="sp-muted">${esc([...o.locs].join(', '))}</td><td><button data-replay="${o.first[0]}" data-step="${o.first[1]}">Show on map</button></td></tr>`).join('')}</tbody></table>`;
            qa('[data-replay]').forEach(b => b.onclick = () => { view('control'); load(b.dataset.replay); jumpTo(Number(b.dataset.step) - 1); });
            return;
        }
        q('#sp-result-content').innerHTML = rows.length ? `<table><thead><tr><th>Mission</th><th>Where / asset</th><th>Time</th><th>${filter === 'readings' ? 'Reading' : 'Finding'}</th><th>${filter === 'failed' ? 'Reason' : filter === 'readings' ? 'Normal' : 'Severity'}</th><th>Note</th><th></th></tr></thead><tbody>${rows.map(r => `<tr><td class="sp-mono">${r.m.id}</td><td>${esc(LOC[r.a.loc].name)}<br><span class="sp-muted sp-small">${esc(r.a.asset)}</span></td><td class="sp-mono">${esc(when(r.a.ts))}</td><td>${esc(r.what)}</td><td>${esc(r.flag)}</td><td class="sp-muted">${esc(r.note)}</td><td><button data-replay="${r.m.id}" data-step="${r.a.s}">Show on map</button></td></tr>`).join('')}</tbody></table>` : '<p class="sp-muted" style="padding:18px 0">No matching records.</p>';
        qa('[data-replay]').forEach(b => b.onclick = () => { view('control'); load(b.dataset.replay); jumpTo(Number(b.dataset.step) - 1); });
    }
    qa('#sp-result-filters button').forEach(b => b.onclick = () => { filter = b.dataset.filter; renderResults(); });
    q('#sp-all-results').onclick = () => { scope = null; renderResults(); };

    /* ---------------- Trends ---------------- */
    let trendsDrawn = false;
    function tipFor(svg) { const box = svg.parentElement; box.style.position = 'relative'; let t = box.querySelector('.sp-tip'); if (!t) { t = document.createElement('div'); t.className = 'sp-tip'; t.hidden = true; box.append(t); } return { show(ev, lines) { t.innerHTML = lines.map((l, i) => `<div class="${i ? '' : 'k'}">${esc(l)}</div>`).join(''); t.hidden = false; const b = box.getBoundingClientRect(); let x = ev.clientX - b.left + 12; if (x + t.offsetWidth > b.width) x = ev.clientX - b.left - t.offsetWidth - 12; t.style.left = x + 'px'; t.style.top = (ev.clientY - b.top + 12) + 'px'; }, hide() { t.hidden = true; } }; }
    function drawTrends() {
        if (trendsDrawn) return; trendsDrawn = true;
        { const s = q('#ch-head'), T = tipFor(s); const clean = MS.filter(m => m.status === 'COMPLETED' && m.acts.every(a => a.ok)), withF = MS.filter(m => m.status === 'COMPLETED' && m.acts.some(a => !a.ok)), failed = MS.filter(m => m.status !== 'COMPLETED');
            const segs = [['Completed, every action succeeded', clean, 'var(--sp-ok)'], ['Completed, but actions failed inside', withF, '#e0962e'], ['Robot said FAILED', failed, 'var(--sp-bad)']];
            const W = 1000, x0 = 10, bw = W - 20, y = 34, h = 36; let x = x0;
            segs.forEach(([lab, ms, c], si) => { const w = bw * ms.length / MS.length; const anchor = si === 0 ? 'start' : si === segs.length - 1 ? 'end' : 'middle', lx = si === 0 ? x : si === segs.length - 1 ? x + w - 2 : x + w / 2 - 1; const r = sv('rect', { x, y, width: w - 2, height: h, rx: 5, fill: c }); r.addEventListener('mousemove', ev => T.show(ev, [lab, `${ms.length} of ${MS.length} missions`, ms.map(m => m.id).join(', ')])); r.addEventListener('mouseleave', T.hide); s.append(r);
                s.append(sv('text', { class: 'lbl', x: x + w / 2 - 1, y: y + h / 2 + 5, 'text-anchor': 'middle', fill: '#fff', 'font-size': 15 }, ms.length)); s.append(sv('text', { x: lx, y: y + h + 16, 'text-anchor': anchor, 'font-size': 11 }, lab)); x += w; });
            s.append(sv('text', { class: 'lbl', x: x0, y: 20, 'font-size': 12 }, `${S.missions_completed} of ${S.missions} missions reported COMPLETED. Only ${clean.length} of those had every action succeed.`));
            s.append(sv('text', { x: x0, y: 106, 'font-size': 11 }, 'Mission status says the robot finished its route. It says nothing about whether the inspections worked.'));
        }
        const bands = [['Under 20%', 0, 20], ['20–29%', 20, 30], ['30–39%', 30, 40], ['40–49%', 40, 50], ['50–59%', 50, 60], ['60%+', 60, 101]];
        { const s = q('#ch-cliff'), T = tipFor(s); const W = 520, H = 270, l = 38, b = 42, t = 20, r = 8, bw = (W - l - r) / bands.length;
            [0, 25, 50, 75, 100].forEach(v => { const y = H - b - (H - b - t) * v / 100; s.append(sv('line', { class: 'grid-l', x1: l, x2: W - r, y1: y, y2: y })); s.append(sv('text', { x: l - 6, y: y + 4, 'text-anchor': 'end' }, v + '%')); });
            bands.forEach(([lab, lo, hi], i) => { const rs = acts.filter(a => a.bat >= lo && a.bat < hi), v = rate(rs); const h = (H - b - t) * v, x = l + i * bw + bw * .18, w = bw * .64, y = H - b - h;
                const rect = sv('rect', { x, y, width: w, height: h, rx: 4, fill: hi <= 30 ? 'var(--sp-bad)' : 'var(--sp-v1)' }); rect.addEventListener('mousemove', ev => T.show(ev, [`Battery ${lab}`, `${pct(v)} succeeded`, `${rs.filter(a => a.ok).length} of ${rs.length} actions`])); rect.addEventListener('mouseleave', T.hide); s.append(rect);
                s.append(sv('text', { class: 'lbl', x: x + w / 2, y: y - 6, 'text-anchor': 'middle' }, pct(v))); s.append(sv('text', { x: x + w / 2, y: H - 24, 'text-anchor': 'middle' }, lab)); s.append(sv('text', { x: x + w / 2, y: H - 10, 'text-anchor': 'middle', 'font-size': 10 }, `n = ${rs.length}`)); });
            const xd = l + 2 * bw; s.append(sv('line', { x1: xd, x2: xd, y1: t - 6, y2: H - b, stroke: 'var(--sp-bad)', 'stroke-dasharray': '4 3' })); s.append(sv('text', { x: xd - 6, y: t + 2, 'text-anchor': 'end', fill: 'var(--sp-bad)', 'font-size': 11 }, '30% line'));
        }
        { const s = q('#ch-vs'), T = tipFor(s); const groups = [['All actions', 0], ['30%+ battery', 30], ['60%+ battery', 60]]; const W = 520, H = 250, l = 38, b = 30, t = 30, r = 8, gw = (W - l - r) / groups.length;
            [0, 25, 50, 75, 100].forEach(v => { const y = H - b - (H - b - t) * v / 100; s.append(sv('line', { class: 'grid-l', x1: l, x2: W - r, y1: y, y2: y })); s.append(sv('text', { x: l - 6, y: y + 4, 'text-anchor': 'end' }, v + '%')); });
            groups.forEach(([lab, min], i) => { ['V1', 'V2'].forEach((v, j) => { const rs = acts.filter(a => a.v === v && a.bat >= min), val = rate(rs); const h = (H - b - t) * val, w = gw * .28, x = l + i * gw + gw * .2 + j * (w + 6), y = H - b - h;
                const rect = sv('rect', { x, y, width: w, height: h, rx: 4, fill: v === 'V1' ? 'var(--sp-v1)' : 'var(--sp-v2)' }); rect.addEventListener('mousemove', ev => T.show(ev, [lab, `${v}: ${pct(val)} succeeded`, `${rs.length} actions`])); rect.addEventListener('mouseleave', T.hide); s.append(rect);
                s.append(sv('text', { class: 'lbl', x: x + w / 2, y: y - 6, 'text-anchor': 'middle' }, pct(val))); }); s.append(sv('text', { x: l + i * gw + gw / 2, y: H - 10, 'text-anchor': 'middle' }, lab));
                const gap = Math.round(100 * (rate(acts.filter(a => a.v === 'V2' && a.bat >= min)) - rate(acts.filter(a => a.v === 'V1' && a.bat >= min)))); const gx = l + i * gw + gw / 2; s.append(sv('rect', { x: gx - 34, y: 2, width: 68, height: 20, rx: 10, fill: i === 0 ? 'var(--sp-v2)' : 'var(--sp-line)' })); s.append(sv('text', { class: 'lbl', x: gx, y: 16, 'text-anchor': 'middle', fill: i === 0 ? '#fff' : 'var(--sp-ink)', 'font-size': 12 }, `gap ${gap > 0 ? '+' : ''}${gap}`)); });
        }
        { const s = q('#ch-drain'), T = tipFor(s); const W = 520, H = 270, b = 28, t = 32, x0 = 110, x1 = W - 110;
            const avg = v => { const ms = MS.filter(m => m.v === v); const d = ms.reduce((a, m) => a + m.b0 - m.b1, 0) / ms.length, mn = ms.reduce((a, m) => a + m.dur, 0) / ms.length; return `${v}: ${Math.round(d)} pts in ${Math.round(mn)} min (${(d / mn).toFixed(1)} per min)`; };
            s.append(sv('text', { class: 'lbl', x: 10, y: 16, 'font-size': 12, fill: 'var(--sp-v1)' }, avg('V1'))); s.append(sv('text', { class: 'lbl', x: W - 10, y: 16, 'font-size': 12, fill: 'var(--sp-v2)', 'text-anchor': 'end' }, avg('V2'))); const Y = v => H - b - (H - b - t) * v / 100;
            s.append(sv('rect', { x: x0, y: Y(30), width: x1 - x0, height: Y(0) - Y(30), fill: 'var(--sp-bad)', opacity: .1 })); s.append(sv('text', { x: (x0 + x1) / 2, y: Y(14), 'text-anchor': 'middle', fill: 'var(--sp-bad)' }, 'Danger zone: under 30%'));
            [0, 30, 60, 100].forEach(v => { s.append(sv('line', { class: 'grid-l', x1: x0, x2: x1, y1: Y(v), y2: Y(v) })); s.append(sv('text', { x: x0 - 8, y: Y(v) + 4, 'text-anchor': 'end' }, v + '%')); });
            s.append(sv('text', { class: 'lbl', x: x0, y: H - 6, 'text-anchor': 'middle' }, 'Start')); s.append(sv('text', { class: 'lbl', x: x1, y: H - 6, 'text-anchor': 'middle' }, 'End'));
            MS.forEach(m => { const c = m.v === 'V1' ? 'var(--sp-v1)' : 'var(--sp-v2)'; s.append(sv('line', { x1: x0, y1: Y(m.b0), x2: x1, y2: Y(m.b1), stroke: c, 'stroke-width': 2, opacity: .65, 'stroke-linecap': 'round' })); s.append(sv('circle', { cx: x1, cy: Y(m.b1), r: 3.5, fill: c }));
                const hit = sv('line', { x1: x0, y1: Y(m.b0), x2: x1, y2: Y(m.b1), stroke: 'transparent', 'stroke-width': 12 }); hit.addEventListener('mousemove', ev => T.show(ev, [`${m.id} · ${m.v}`, `${m.b0}% → ${m.b1}% in ${m.dur} min`, `${((m.b0 - m.b1) / m.dur).toFixed(1)} pts per minute`])); hit.addEventListener('mouseleave', T.hide); s.append(hit); });
        }
        { const tb = q('#sp-heat'); const cols = [['Under 30%', 0, 30], ['30–60%', 30, 60], ['60%+', 60, 101]]; const fails = acts.filter(a => !a.ok);
            const sensor = new Set(['READING_UNRELIABLE', 'SENSOR_TIMEOUT', 'TARGET_NOT_DETECTED', 'SIGNAL_NOISE']);
            const nIn = (lo, hi) => acts.filter(a => a.bat >= lo && a.bat < hi).length;
            const cell = (n, lo, hi, max) => { const r = 100 * n / nIn(lo, hi); return `<td class="sp-num sp-mono rate" title="${n} failures in ${nIn(lo, hi)} actions" style="background:rgba(217,59,59,${n ? (.08 + .5 * r / max).toFixed(2) : 0})">${n ? r.toFixed(0) : '·'}</td>`; };
            const render = byType => {
                const groups = byType ? [...new Set(fails.map(a => a.fail))].sort((a, b) => (sensor.has(b) - sensor.has(a)) || fails.filter(x => x.fail === b).length - fails.filter(x => x.fail === a).length).map(ty => [friendly(ty) + ` <span class="sp-muted sp-small">${sensor.has(ty) ? 'sensor' : 'navigation'}</span>`, a => a.fail === ty]) : [['<span class="grp">Sensor failures</span> <span class="sp-muted sp-small">reading unreliable, sensor timeout, target not detected, signal noise</span>', a => sensor.has(a.fail)], ['<span class="grp">Navigation failures</span> <span class="sp-muted sp-small">localization, communication, obstacle, path blocked</span>', a => !sensor.has(a.fail)]];
                const counts = groups.map(([, f]) => cols.map(([, lo, hi]) => fails.filter(a => f(a) && a.bat >= lo && a.bat < hi).length));
                const max = Math.max(...counts.flatMap((row, gi) => row.map((n, ci) => 100 * n / nIn(cols[ci][1], cols[ci][2]))));
                tb.innerHTML = `<thead><tr><th>Failures per 100 actions</th>${cols.map(([c, lo, hi]) => `<th>${c}<br><span class="sp-muted" style="font-weight:400;text-transform:none;letter-spacing:0">${nIn(lo, hi)} actions</span></th>`).join('')}</tr></thead><tbody>${groups.map(([lab], gi) => `<tr><td>${lab}</td>${cols.map(([, lo, hi], ci) => cell(counts[gi][ci], lo, hi, max)).join('')}</tr>`).join('')}</tbody>`;
            };
            render(false);
            q('#sp-heat-toggle').onclick = e => { const on = e.currentTarget.getAttribute('aria-pressed') !== 'true'; e.currentTarget.setAttribute('aria-pressed', String(on)); e.currentTarget.textContent = on ? 'Show sensor vs navigation' : 'Show by failure type'; render(on); };
        }
        { const s = q('#ch-loc'); const by = {}; acts.forEach(a => { const o = by[a.loc] ||= { n: 0, f: 0 }; o.n++; if (!a.ok) o.f++; });
            const rows = D.locations.map(l => ({ l, ...by[l.id] })).sort((a, b) => b.f / b.n - a.f / a.n).slice(0, 10); const left = 170, W = 520, rw = W - left - 110;
            rows.forEach((o, i) => { const y = 10 + i * 31, fr = o.f / o.n; s.append(sv('text', { x: left - 10, y: y + 12, 'text-anchor': 'end' }, o.l.name)); s.append(sv('rect', { x: left, y, width: rw, height: 16, rx: 4, fill: 'var(--sp-bg)' })); s.append(sv('rect', { x: left, y, width: rw * fr / .7, height: 16, rx: 4, fill: i < 3 ? 'var(--sp-bad)' : 'var(--sp-line)' })); s.append(sv('text', { class: 'lbl', x: left + rw + 8, y: y + 12 }, `${pct(fr)} · ${o.f} of ${o.n}`)); });
        }
        { const s = q('#ch-type'); const types = [...new Set(acts.map(a => a.type))].map(t => ({ t, v: rate(acts.filter(a => a.type === t)), n: acts.filter(a => a.type === t).length })).sort((a, b) => a.v - b.v); const l = 150, W = 520, rw = W - l - 50;
            types.forEach((o, i) => { const y = 14 + i * 38; s.append(sv('text', { x: l - 10, y: y + 13, 'text-anchor': 'end' }, friendly(o.t))); s.append(sv('rect', { x: l, y, width: rw, height: 18, rx: 4, fill: 'var(--sp-bg)' })); s.append(sv('rect', { x: l, y, width: rw * o.v, height: 18, rx: 4, fill: i === 0 ? 'var(--sp-bad)' : 'var(--sp-line)' })); s.append(sv('text', { class: 'lbl', x: l + rw + 8, y: y + 13 }, pct(o.v))); });
        }
    }

    /* ---------------- Boot ---------------- */
    drawBase();
    cur = MS.find(m => m.id === 'M014');
    renderQueue();
    load('M014', true);
    renderResults();
})();
