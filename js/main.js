(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const STATUS = {
    online:   'online',
    wip:      'em dev',
    archived: 'arquivado',
  };

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const safeUrl = (u) => (/^(https?:|mailto:|\.{0,2}\/)/i.test(u) ? u : '#');
  const linkHTML = (l) => {
    const url = safeUrl(l.url);
    const external = /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${esc(url)}"${external}>${esc(l.label)}</a>`;
  };

  // ---------- perfil ----------
  function renderProfile() {
    const name = PROFILE.name || 'anon';
    document.title = `${name} // ~/projetos`;

    const h1 = $('#name');
    h1.textContent = name;
    h1.dataset.text = name;

    $('#handle').textContent = PROFILE.handle || 'user';
    $('#prompt-user').textContent = `guest@${PROFILE.handle || 'portfolio'}`;
    $('#bio').textContent = PROFILE.bio || '';
    $('#footer-name').textContent = name;
    $('#year').textContent = new Date().getFullYear();

    const links = (PROFILE.links || []).map((l) => `<li>${linkHTML(l)}</li>`).join('');
    $('#links').innerHTML = links;
    $('#footer-links').innerHTML = links;

    const rows = [
      ['user', PROFILE.handle],
      ['loc', PROFILE.location],
      ['projetos', PROJECTS.length],
      ['stack', PROFILE.stack],
      ['status', PROFILE.status && `<span class="ok">●</span> ${esc(PROFILE.status)}`, true],
    ].filter(([, v]) => v !== undefined && v !== '');
    $('#sysinfo').innerHTML = rows
      .map(([k, v, raw]) => `<dt>${esc(k)}</dt><dd>${raw ? v : esc(v)}</dd>`)
      .join('');
  }

  function typeRoles() {
    const el = $('#role');
    const roles = PROFILE.roles || [];
    if (!roles.length) return;
    if (reduceMotion || roles.length === 1) { el.textContent = roles[0]; return; }

    let r = 0, i = 0, deleting = false;
    const tick = () => {
      const word = roles[r];
      i += deleting ? -1 : 1;
      el.textContent = word.slice(0, i);
      let delay = deleting ? 30 : 65;
      if (!deleting && i === word.length) { deleting = true; delay = 1800; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
      setTimeout(tick, delay);
    };
    tick();
  }

  // ---------- projetos ----------
  const state = { type: 'all', query: '' };

  function renderFilters() {
    const counts = {};
    PROJECTS.forEach((p) => { counts[p.type] = (counts[p.type] || 0) + 1; });
    const ordered = Object.keys(TYPES).filter((t) => counts[t])
      .concat(Object.keys(counts).filter((t) => !TYPES[t]));

    const chip = (key, label, n) =>
      `<button type="button" class="chip" data-type="${esc(key)}" aria-pressed="${state.type === key}">` +
      `${esc(label)}<span>${n}</span></button>`;

    $('#filters').innerHTML = chip('all', 'todos', PROJECTS.length) +
      ordered.map((t) => chip(t, TYPES[t]?.label ?? t, counts[t])).join('');
  }

  function matches(p) {
    if (state.type !== 'all' && p.type !== state.type) return false;
    if (!state.query) return true;
    const hay = [p.title, p.description, TYPES[p.type]?.label, p.type, ...(p.tags || [])]
      .join(' ').toLowerCase();
    return state.query.split(/\s+/).every((w) => hay.includes(w));
  }

  function cardHTML(p, i) {
    const type = TYPES[p.type] || { tag: String(p.type || '???').toUpperCase().slice(0, 3), color: '#00f0ff' };
    const idx = '0x' + (PROJECTS.indexOf(p) + 1).toString(16).toUpperCase().padStart(2, '0');
    const status = STATUS[p.status] ? p.status : 'online';
    const tags = (p.tags || []).map((t) => `<li>${esc(t)}</li>`).join('');
    const links = (p.links || []).map(linkHTML).join('');

    return `
      <article class="card" style="--accent:${esc(type.color)};--i:${i}">
        <div class="card-frame">
          <div class="card-body">
            <header class="card-head">
              <span class="badge">${esc(type.tag)}</span>
              <span class="idx">${idx}${p.year ? ` · ${esc(p.year)}` : ''}</span>
              <span class="status status--${status}">${STATUS[status]}</span>
            </header>
            <h3 class="card-title">${esc(p.title)}</h3>
            <p class="card-desc">${esc(p.description)}</p>
            ${tags ? `<ul class="tags">${tags}</ul>` : ''}
            ${links ? `<footer class="card-links">${links}</footer>` : ''}
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const list = PROJECTS.filter(matches);
    $('#grid').innerHTML = list.map(cardHTML).join('');
    $('#count').textContent = `[${list.length}/${PROJECTS.length}]`;

    const empty = $('#empty');
    empty.hidden = list.length > 0;
    if (!list.length) {
      empty.innerHTML = state.query
        ? `<span class="err">grep:</span> nenhum resultado para "${esc(state.query)}"`
        : '<span class="err">ls:</span> nenhum projeto nesta categoria';
    }
  }

  function setType(type) {
    state.type = type;
    document.querySelectorAll('#filters .chip').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.type === type));
    });
    const url = type === 'all' ? location.pathname + location.search : `#${type}`;
    history.replaceState(null, '', url);
    renderGrid();
  }

  function bindControls() {
    $('#filters').addEventListener('click', (e) => {
      const b = e.target.closest('.chip');
      if (b) setType(b.dataset.type);
    });

    const search = $('#search');
    search.addEventListener('input', () => {
      state.query = search.value.trim().toLowerCase();
      renderGrid();
    });
    search.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { search.value = ''; state.query = ''; renderGrid(); search.blur(); }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey) return;
      if (/^(input|textarea|select)$/i.test(document.activeElement?.tagName)) return;
      e.preventDefault();
      search.focus();
    });

    const fromHash = location.hash.slice(1);
    if (fromHash && PROJECTS.some((p) => p.type === fromHash)) state.type = fromHash;
  }

  // ---------- efeitos ----------
  function boot() {
    const el = $('#boot');
    let seen = false;
    try {
      seen = sessionStorage.getItem('booted') === '1';
      sessionStorage.setItem('booted', '1');
    } catch { /* storage indisponível */ }
    if (seen || reduceMotion) { el.remove(); return; }

    const lines = [
      '[  OK  ] mounting /dev/portfolio',
      '[  OK  ] loading modules: neon.ko glitch.ko',
      `[  OK  ] decrypting projects.db ... ${PROJECTS.length} entries`,
      '[  OK  ] establishing secure uplink',
      '> access granted_',
    ];
    const log = $('#boot-log');
    let n = 0;

    const done = () => {
      if (el.classList.contains('boot--done')) return;
      el.classList.add('boot--done');
      setTimeout(() => el.remove(), 500);
    };
    const next = () => {
      if (n >= lines.length) { setTimeout(done, 350); return; }
      log.textContent += lines[n++] + '\n';
      setTimeout(next, 120);
    };

    el.addEventListener('click', done);
    window.addEventListener('keydown', done, { once: true });
    next();
  }

  function rain() {
    const canvas = $('#rain');
    if (reduceMotion) { canvas.remove(); return; }

    const ctx = canvas.getContext('2d');
    const chars = '01アイウエオカキクケコサシスセソ<>/{}[]#$%&*+=ABCDEF';
    const size = 16;
    let w, h, cols, drops;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${size - 2}px "JetBrains Mono", monospace`;
      cols = Math.ceil(w / size);
      drops = Array.from({ length: cols }, () => Math.random() * -(h / size));
    };
    resize();
    window.addEventListener('resize', resize);

    let last = 0;
    const draw = (t) => {
      requestAnimationFrame(draw);
      if (t - last < 60) return;
      last = t;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      for (let i = 0; i < cols; i++) {
        const y = drops[i] * size;
        ctx.fillStyle = Math.random() > 0.97 ? '#ff2bd6' : '#00f0ff';
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * size, y);
        drops[i] = y > h && Math.random() > 0.975 ? 0 : drops[i] + 1;
      }
    };
    requestAnimationFrame(draw);
  }

  function uptime() {
    const start = Date.now();
    const el = $('#uptime');
    setInterval(() => {
      const s = ((Date.now() - start) / 1000) | 0;
      el.textContent = [s / 3600 | 0, (s / 60 | 0) % 60, s % 60]
        .map((n) => String(n).padStart(2, '0')).join(':');
    }, 1000);
  }

  // ---------- init ----------
  boot();
  renderProfile();
  bindControls();
  renderFilters();
  renderGrid();
  typeRoles();
  rain();
  uptime();

  console.log('%c>_ wake up, neo...', 'color:#00f0ff;font:bold 14px monospace;text-shadow:0 0 6px #00f0ff');
})();
