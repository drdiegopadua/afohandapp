/* ═══════════════════════════════════════════════
   AfoHand – App Logic
   Google Sheets como banco de dados
   ═══════════════════════════════════════════════ */

// ─── CONFIG ──────────────────────────────────
const CONFIG = {
  // Substitua pelo ID da sua planilha Google Sheets publicada
  // Vá em Arquivo → Compartilhar → Publicar na web → CSV
  SHEET_ID: 'YOUR_GOOGLE_SHEET_ID',
  
  // Nomes das abas (configure conforme sua planilha)
  SHEETS: {
    JOGOS: 'Jogos',        // aba com os jogos
    TIMES: 'Times',        // aba com os times (opcional)
    MATAMATA: 'MataMata'   // aba com mata-mata
  }
};

// URL de publicação da planilha (CSV público)
// Formato: https://docs.google.com/spreadsheets/d/{ID}/gviz/tq?tqx=out:csv&sheet={NOME_ABA}
const getSheetUrl = (sheetName) =>
  `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

// ─── DADOS DEMO (usados enquanto sheet não está configurada) ─
const DEMO = {
  times: {
    A: ['Falcões FC', 'Leões United', 'Thunder Hand', 'Raptors HB', 'Warriors 5', 'Storm Team'],
    B: ['Dragões FC', 'Phoenix HB', 'Eagles Hand', 'Wolves 5', 'Sharks FC', 'Bulls Hand']
  },
  jogos: [
    { id:1, grupo:'A', rodada:1, casa:'Falcões FC',  visitante:'Leões United',  gols_casa:5, gols_visitante:3, status:'realizado', data:'2025-06-01', hora:'09:00' },
    { id:2, grupo:'A', rodada:1, casa:'Thunder Hand',visitante:'Raptors HB',    gols_casa:4, gols_visitante:4, status:'realizado', data:'2025-06-01', hora:'10:00' },
    { id:3, grupo:'A', rodada:1, casa:'Warriors 5',  visitante:'Storm Team',    gols_casa:7, gols_visitante:2, status:'realizado', data:'2025-06-01', hora:'11:00' },
    { id:4, grupo:'B', rodada:1, casa:'Dragões FC',  visitante:'Phoenix HB',    gols_casa:6, gols_visitante:3, status:'realizado', data:'2025-06-01', hora:'13:00' },
    { id:5, grupo:'B', rodada:1, casa:'Eagles Hand', visitante:'Wolves 5',      gols_casa:4, gols_visitante:5, status:'realizado', data:'2025-06-01', hora:'14:00' },
    { id:6, grupo:'B', rodada:1, casa:'Sharks FC',   visitante:'Bulls Hand',    gols_casa:3, gols_visitante:6, status:'realizado', data:'2025-06-01', hora:'15:00' },
    { id:7, grupo:'A', rodada:2, casa:'Falcões FC',  visitante:'Thunder Hand',  gols_casa:0, gols_visitante:0, status:'pendente', data:'2025-06-08', hora:'09:00' },
    { id:8, grupo:'A', rodada:2, casa:'Leões United',visitante:'Warriors 5',    gols_casa:0, gols_visitante:0, status:'pendente', data:'2025-06-08', hora:'10:00' },
    { id:9, grupo:'A', rodada:2, casa:'Raptors HB',  visitante:'Storm Team',    gols_casa:0, gols_visitante:0, status:'pendente', data:'2025-06-08', hora:'11:00' },
    { id:10,grupo:'B', rodada:2, casa:'Dragões FC',  visitante:'Eagles Hand',   gols_casa:0, gols_visitante:0, status:'pendente', data:'2025-06-08', hora:'13:00' },
    { id:11,grupo:'B', rodada:2, casa:'Phoenix HB',  visitante:'Bulls Hand',    gols_casa:0, gols_visitante:0, status:'pendente', data:'2025-06-08', hora:'14:00' },
    { id:12,grupo:'B', rodada:2, casa:'Wolves 5',    visitante:'Sharks FC',     gols_casa:0, gols_visitante:0, status:'pendente', data:'2025-06-08', hora:'15:00' },
  ],
  matamata: [
    { fase:'Semifinal', jogo:1, time1:'Falcões FC', time2:'Dragões FC', gols1:5, gols2:4, status:'realizado' },
    { fase:'Semifinal', jogo:2, time1:'Warriors 5', time2:'Bulls Hand',  gols1:0, gols2:0, status:'pendente' },
    { fase:'3º Lugar',  jogo:1, time1:'Dragões FC', time2:'',            gols1:0, gols2:0, status:'pendente' },
    { fase:'Final',     jogo:1, time1:'Falcões FC', time2:'',            gols1:0, gols2:0, status:'pendente' },
  ]
};

// ─── STATE ──────────────────────────────────
let state = {
  jogos: [],
  matamata: [],
  currentPage: 'home',
  jogoFilter: 'todos',
  classifGroup: 'A',
  loaded: false
};

// ─── SPLASH / UNLOCK ──────────────────────────────────
function initSplash() {
  // particles
  const container = document.getElementById('particles');
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 4 + Math.random() * 8;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${Math.random()>0.5?'rgba(200,16,46,0.4)':'rgba(0,122,51,0.3)'};
      animation-duration:${4+Math.random()*6}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(p);
  }

  // unlock drag
  const track   = document.querySelector('.unlock-track');
  const btn     = document.getElementById('unlockBtn');
  const glow    = document.querySelector('.unlock-glow');
  const trackW  = () => track.offsetWidth;
  const btnW    = btn.offsetWidth;
  const maxX    = () => trackW() - btnW - 16;

  let dragging = false, startX = 0, curX = 0;

  const setPos = (x) => {
    x = Math.max(0, Math.min(x, maxX()));
    btn.style.transform = `translateX(${x}px)`;
    const pct = x / maxX() * 100;
    glow.style.width = pct + '%';
    return x;
  };

  const unlock = () => {
    btn.classList.add('unlocked');
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M5 13l4 4L19 7" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    setTimeout(() => {
      const splash = document.getElementById('splash');
      splash.classList.add('exit');
      document.getElementById('app').classList.remove('hidden');
      loadData();
      setTimeout(() => { splash.style.display = 'none'; }, 700);
    }, 400);
  };

  const onDown = (e) => {
    dragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX) - curX;
    btn.style.transition = 'none';
  };

  const onMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - startX;
    curX = setPos(x);
    if (curX >= maxX() - 4) { dragging = false; unlock(); }
  };

  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    if (curX < maxX() - 4) {
      btn.style.transition = 'transform 0.4s cubic-bezier(.34,1.56,.64,1)';
      setPos(0); curX = 0;
      glow.style.width = '0%';
    }
  };

  btn.addEventListener('mousedown',  onDown);
  btn.addEventListener('touchstart', onDown, { passive: false });
  document.addEventListener('mousemove',  onMove);
  document.addEventListener('touchmove',  onMove, { passive: false });
  document.addEventListener('mouseup',    onUp);
  document.addEventListener('touchend',   onUp);
}

// ─── NAV ──────────────────────────────────
function initNav() {
  const marker = document.getElementById('nav-marker');
  const items  = document.querySelectorAll('.nav-item');

  function moveMarker(el) {
    marker.style.left  = el.offsetLeft + 'px';
    marker.style.width = el.offsetWidth + 'px';
  }

  // Set initial marker position
  const activeItem = document.querySelector('.nav-item.active');
  if (activeItem) {
    // Wait for layout
    requestAnimationFrame(() => moveMarker(activeItem));
  }

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      if (!page) return;

      // Move marker
      moveMarker(item);

      // Active class
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      navigateTo(page);
    });

    // Hover preview
    item.addEventListener('mouseover', () => moveMarker(item));
    item.addEventListener('mouseleave', () => {
      const cur = document.querySelector('.nav-item.active');
      if (cur) moveMarker(cur);
    });
  });

  // Reposition on resize
  window.addEventListener('resize', () => {
    const cur = document.querySelector('.nav-item.active');
    if (cur) moveMarker(cur);
  });
}

function navigateTo(page) {
  const old = document.getElementById(`page-${state.currentPage}`);
  const nw  = document.getElementById(`page-${page}`);
  if (!nw || page === state.currentPage) return;

  old.classList.remove('active');
  nw.classList.add('active');
  state.currentPage = page;
}

// ─── DATA ──────────────────────────────────
async function loadData() {
  const refreshBtn = document.getElementById('refreshBtn');
  refreshBtn.classList.add('spinning');

  try {
    if (CONFIG.SHEET_ID === 'YOUR_GOOGLE_SHEET_ID') {
      // usa dados demo
      state.jogos    = DEMO.jogos;
      state.matamata = DEMO.matamata;
      showToast('📊 Usando dados de demonstração');
    } else {
      // busca planilha real
      const [jogosData, mmData] = await Promise.all([
        fetchSheet(CONFIG.SHEETS.JOGOS),
        fetchSheet(CONFIG.SHEETS.MATAMATA)
      ]);
      state.jogos    = parseJogos(jogosData);
      state.matamata = parseMM(mmData);
    }
    state.loaded = true;
    renderAll();
  } catch (err) {
    console.error(err);
    state.jogos    = DEMO.jogos;
    state.matamata = DEMO.matamata;
    state.loaded = true;
    renderAll();
    showToast('⚠️ Erro ao buscar dados, usando demo');
  } finally {
    refreshBtn.classList.remove('spinning');
  }
}

async function fetchSheet(sheetName) {
  const url = getSheetUrl(sheetName);
  const res = await fetch(url);
  const text = await res.text();
  return parseCSV(text);
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g,'').trim().toLowerCase());
  return lines.slice(1).map(line => {
    const values = line.match(/(".*?"|[^,]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g) || [];
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] || '').replace(/^"|"$/g, '').trim();
    });
    return obj;
  }).filter(r => Object.values(r).some(v => v));
}

function parseJogos(rows) {
  return rows.map((r, i) => ({
    id:              i + 1,
    grupo:           r.grupo || r['grupo'] || 'A',
    rodada:          parseInt(r.rodada) || 1,
    casa:            r.casa || r['time_casa'] || '',
    visitante:       r.visitante || r['time_visitante'] || '',
    gols_casa:       parseInt(r.gols_casa) || 0,
    gols_visitante:  parseInt(r.gols_visitante) || 0,
    status:          r.status || 'pendente',
    data:            r.data || '',
    hora:            r.hora || ''
  }));
}

function parseMM(rows) {
  return rows.map((r, i) => ({
    fase:    r.fase || '',
    jogo:    i + 1,
    time1:   r.time1 || r['time_1'] || '',
    time2:   r.time2 || r['time_2'] || '',
    gols1:   parseInt(r.gols1 || r['gols_1']) || 0,
    gols2:   parseInt(r.gols2 || r['gols_2']) || 0,
    status:  r.status || 'pendente'
  }));
}

// ─── CLASSIFICAÇÃO ──────────────────────────────────
function calcClassificacao(grupo) {
  const jogosGrupo = state.jogos.filter(j => j.grupo === grupo && j.status === 'realizado');
  const times = {};

  // inicializa com todos os times do grupo
  const allTimes = [...new Set(
    state.jogos
      .filter(j => j.grupo === grupo)
      .flatMap(j => [j.casa, j.visitante])
  )];

  allTimes.forEach(t => {
    times[t] = { nome: t, pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 };
  });

  jogosGrupo.forEach(j => {
    const c = j.gols_casa, v = j.gols_visitante;
    times[j.casa].j++;
    times[j.visitante].j++;
    times[j.casa].gp += c;
    times[j.casa].gc += v;
    times[j.visitante].gp += v;
    times[j.visitante].gc += c;

    if (c > v) {
      times[j.casa].pts += 3; times[j.casa].v++;
      times[j.visitante].d++;
    } else if (c < v) {
      times[j.visitante].pts += 3; times[j.visitante].v++;
      times[j.casa].d++;
    } else {
      times[j.casa].pts++; times[j.casa].e++;
      times[j.visitante].pts++; times[j.visitante].e++;
    }
  });

  Object.values(times).forEach(t => { t.sg = t.gp - t.gc; });

  return Object.values(times).sort((a, b) =>
    b.pts - a.pts || b.sg - a.sg || b.gp - a.gp
  );
}

// ─── RENDER ──────────────────────────────────
function renderAll() {
  renderHome();
  renderJogos();
  renderClassificacao('A');
  renderClassificacao('B');
  renderMataMata();
}

// HOME
function renderHome() {
  const jogosRealizados = state.jogos.filter(j => j.status === 'realizado');
  const totalGols = jogosRealizados.reduce((s, j) => s + j.gols_casa + j.gols_visitante, 0);

  document.getElementById('statJogos').textContent = jogosRealizados.length;
  document.getElementById('statGols').textContent  = totalGols;

  // próximos jogos
  const proximos = state.jogos.filter(j => j.status === 'pendente').slice(0, 4);
  const container = document.getElementById('proximosJogos');
  
  if (proximos.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="icon">📅</div><p>Nenhum jogo agendado</p></div>`;
  } else {
    container.innerHTML = proximos.map((j, idx) => {
      const [, mes, dia] = (j.data || '2025-07-01').split('-');
      const meses = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
      return `
        <div class="upcoming-card" style="animation-delay:${idx*0.07}s">
          <div class="upcoming-date">
            <div class="day">${dia || '??'}</div>
            <div class="mon">${meses[parseInt(mes)] || '??'}</div>
          </div>
          <div class="upcoming-match">
            <div class="teams">${j.casa} × ${j.visitante}</div>
            <div class="meta">${j.hora || 'Horário a definir'} · Rodada ${j.rodada}</div>
          </div>
          <div class="upcoming-group">Gr. ${j.grupo}</div>
        </div>
      `;
    }).join('');
  }

  // líderes
  const lidA = calcClassificacao('A')[0];
  const lidB = calcClassificacao('B')[0];
  const liderEl = document.getElementById('lideres');

  if (lidA || lidB) {
    liderEl.innerHTML = ['A','B'].map(g => {
      const lider = g === 'A' ? lidA : lidB;
      if (!lider) return `<div class="leader-card"><div class="leader-group-tag">GRUPO ${g}</div><div class="leader-team">Sem dados</div></div>`;
      return `
        <div class="leader-card" style="animation-delay:${g==='A'?0:0.1}s">
          <div class="leader-group-tag">GRUPO ${g}</div>
          <div class="leader-team">${lider.nome}</div>
          <div class="leader-pts">${lider.pts}<span class="leader-pts-label"> pts</span></div>
        </div>
      `;
    }).join('');
  }
}

// JOGOS
function renderJogos() {
  const filter = state.jogoFilter;
  const lista  = filter === 'todos'
    ? state.jogos
    : state.jogos.filter(j => j.status === filter);

  const container = document.getElementById('jogosList');

  if (lista.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="icon">🤾</div><p>Nenhum jogo encontrado</p></div>`;
    return;
  }

  container.innerHTML = lista.map((j, i) => {
    const realizado = j.status === 'realizado';
    const scoreHtml = realizado
      ? `<span class="jogo-score">${j.gols_casa} – ${j.gols_visitante}</span>`
      : `<span class="jogo-score pending">vs</span>`;

    const vencedorCasa = realizado && j.gols_casa > j.gols_visitante;
    const vencedorVis  = realizado && j.gols_visitante > j.gols_casa;

    return `
      <div class="jogo-card ${j.status}" style="animation-delay:${i*0.05}s">
        <div class="jogo-meta">
          <span class="jogo-rodada">Rodada ${j.rodada} · Grupo ${j.grupo}</span>
          <span class="jogo-status ${j.status}">${realizado ? 'Realizado' : 'A Jogar'}</span>
        </div>
        <div class="jogo-placar">
          <div class="jogo-team">
            <div class="team-name" style="${vencedorCasa?'color:var(--green-l)':''}">${j.casa}</div>
          </div>
          ${scoreHtml}
          <div class="jogo-team right">
            <div class="team-name" style="${vencedorVis?'color:var(--green-l)':''}">${j.visitante}</div>
          </div>
        </div>
        <div class="jogo-group-badge">
          <span>${j.data ? formatDate(j.data) : 'Data a definir'}</span>
          <span>${j.hora || ''}</span>
        </div>
      </div>
    `;
  }).join('');
}

// CLASSIFICAÇÃO
function renderClassificacao(grupo) {
  const cl = calcClassificacao(grupo);
  const wrap = document.getElementById(`table${grupo}`);

  if (cl.length === 0) {
    wrap.innerHTML = `<div class="empty-state"><div class="icon">📊</div><p>Sem dados para o Grupo ${grupo}</p></div>`;
    return;
  }

  const legendas = {
    0: '🟢 Classificado ao Mata-Mata',
    1: '🟢 Classificado ao Mata-Mata',
    2: '⚫ Eliminado'
  };

  const rows = cl.map((t, i) => {
    const posCls = i === 0 ? 'pos-1' : i === 1 ? 'pos-2' : i === 2 ? 'pos-3' : 'pos-other';
    const classif = i < 2 ? 'rgba(0,163,68,0.06)' : '';
    return `
      <tr style="${classif ? `background:${classif}` : ''}">
        <td>
          <div class="team-cell">
            <span class="pos-badge ${posCls}">${i+1}</span>
            <span class="team-cell-name">${t.nome}</span>
          </div>
        </td>
        <td>${t.j}</td>
        <td>${t.v}</td>
        <td>${t.e}</td>
        <td>${t.d}</td>
        <td>${t.gp}</td>
        <td>${t.gc}</td>
        <td>${t.sg > 0 ? '+' : ''}${t.sg}</td>
        <td class="pts-cell">${t.pts}</td>
      </tr>
    `;
  }).join('');

  wrap.innerHTML = `
    <div class="classif-label cl">🟢 Classificados ao Mata-Mata (Top 2)</div>
    <table class="standings-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>J</th><th>V</th><th>E</th><th>D</th>
          <th>GP</th><th>GC</th><th>SG</th><th>PTS</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="classif-label el" style="margin-top:8px">⚫ Eliminados</div>
  `;
}

// MATA-MATA
function renderMataMata() {
  const wrap = document.getElementById('bracketWrap');
  const fases = {};
  
  state.matamata.forEach(m => {
    if (!fases[m.fase]) fases[m.fase] = [];
    fases[m.fase].push(m);
  });

  // detecta campeão
  const final = (fases['Final'] || [])[0];
  let campeoHtml = '';
  if (final && final.status === 'realizado') {
    const camp = final.gols1 > final.gols2 ? final.time1 : final.time2;
    campeoHtml = `
      <div class="champion-card">
        <div class="champion-trophy">🏆</div>
        <div class="champion-label">Campeão AfoHand</div>
        <div class="champion-name">${camp}</div>
      </div>
    `;
  }

  const phaseOrder = ['Quartas de Final', 'Semifinal', '3º Lugar', 'Final'];
  const phaseLabels = {
    'Quartas de Final': { cls: '', label: '⚡ Quartas de Final' },
    'Semifinal':        { cls: 'semifinal', label: '🔥 Semifinal' },
    '3º Lugar':         { cls: 'terceiro', label: '🥉 3º Lugar' },
    'Final':            { cls: 'final', label: '🏆 Final' }
  };

  const phasesHtml = phaseOrder.filter(f => fases[f]).map(fase => {
    const matches = fases[fase];
    const { cls, label } = phaseLabels[fase] || { cls: '', label: fase };

    const matchesHtml = matches.map(m => {
      const realizado = m.status === 'realizado';
      const venc1 = realizado && m.gols1 > m.gols2;
      const venc2 = realizado && m.gols2 > m.gols1;

      return `
        <div class="bracket-match">
          <div class="bracket-team ${venc1 ? 'winner' : ''}">
            <span class="bt-name">${m.time1 || 'A definir'}</span>
            <span class="bt-score ${venc1 ? 'winner-score' : ''}">${realizado ? m.gols1 : '–'}</span>
          </div>
          <div class="bracket-team ${venc2 ? 'winner' : ''}">
            <span class="bt-name">${m.time2 || 'A definir'}</span>
            <span class="bt-score ${venc2 ? 'winner-score' : ''}">${realizado ? m.gols2 : '–'}</span>
          </div>
          <div class="bracket-match-meta">${realizado ? 'Encerrado' : 'Aguardando'}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="bracket-phase">
        <div class="phase-label ${cls}"><span class="pl-inner">${label}</span></div>
        <div class="bracket-matches">${matchesHtml}</div>
      </div>
    `;
  }).join('');

  wrap.innerHTML = campeoHtml + (phasesHtml || `<div class="empty-state"><div class="icon">🏆</div><p>Mata-mata não iniciado</p></div>`);
}

// ─── FILTER ──────────────────────────────────
function initFilters() {
  // Jogos filter
  document.querySelectorAll('.ftab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.jogoFilter = btn.dataset.filter;
      renderJogos();
    });
  });

  // Grupos tab
  document.querySelectorAll('.gtab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gtab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const g = btn.dataset.group;
      state.classifGroup = g;
      document.getElementById('tableA').className = `standings-wrap ${g==='A'?'active-table':'hidden-table'}`;
      document.getElementById('tableB').className = `standings-wrap ${g==='B'?'active-table':'hidden-table'}`;
    });
  });
}

// ─── REFRESH ──────────────────────────────────
function initRefresh() {
  document.getElementById('refreshBtn').addEventListener('click', () => {
    loadData();
  });
}

// ─── TOAST ──────────────────────────────────
function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

// ─── UTILS ──────────────────────────────────
function formatDate(d) {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

// ─── PWA INSTALL PROMPT ──────────────────────────────────
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // pode mostrar botão de instalar se quiser
});

// ─── INIT ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initNav();
  initFilters();
  initRefresh();
});

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
