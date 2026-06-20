<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#C8102E" />
  <meta name="description" content="AfoHand - Campeonato de Handebol de 5" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="AfoHand" />
  <title>AfoHand – Handebol de 5</title>
  <link rel="manifest" href="https://drdiegopadua.github.io/afohandapp/manifest.json" />
  <link rel="icon" href="https://drdiegopadua.github.io/afohandapp/icons/icon-192.png" />
  <link rel="apple-touch-icon" href="https://drdiegopadua.github.io/afohandapp/icons/icon-192.png" />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
  <style>
/* ═══════════════════════════════════════════════
   AFOHAND – Design System
   Palette: #C8102E (vermelho), #007A33 (verde), #FFFFFF
   ═══════════════════════════════════════════════ */

:root {
  --red:     #C8102E;
  --red-d:   #9B0C23;
  --red-l:   #E8304A;
  --green:   #007A33;
  --green-d: #005A25;
  --green-l: #00A344;
  --white:   #FFFFFF;
  --off:     #F5F5F5;
  --dark:    #0D0D0D;
  --dark2:   #1A1A1A;
  --dark3:   #242424;
  --gray:    #6B7280;
  --gray-l:  #9CA3AF;
  --border:  rgba(255,255,255,0.08);

  --font-display: 'Bebas Neue', sans-serif;
  --font-body:    'Inter', sans-serif;

  --radius: 16px;
  --radius-sm: 10px;
  --shadow: 0 8px 32px rgba(0,0,0,0.4);
  --shadow-sm: 0 2px 12px rgba(0,0,0,0.25);

  --nav-h: 68px;
  --header-h: 60px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  height: 100%;
  overflow: hidden;
  background: var(--dark);
  color: var(--white);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* ═══════════ SPLASH ═══════════ */
#splash {
  position: fixed; inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

#splash.exit {
  opacity: 0;
  transform: scale(1.05);
  pointer-events: none;
}

.splash-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 30% 20%, var(--red-d) 0%, #0D0D0D 55%),
              radial-gradient(ellipse at 80% 80%, var(--green-d) 0%, transparent 50%);
}

.splash-particles {
  position: absolute; inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: float-particle linear infinite;
  opacity: 0;
}

@keyframes float-particle {
  0%   { transform: translateY(110vh) scale(0); opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.2; }
  100% { transform: translateY(-10vh) scale(1); opacity: 0; }
}

.splash-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 2;
  padding-bottom: 80px;
}

.splash-logo {
  position: relative;
  width: 120px; height: 120px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 8px;
}

.logo-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.15);
}
.logo-ring-1 { inset: 0; animation: spin 8s linear infinite; }
.logo-ring-2 { inset: 12px; animation: spin 5s linear infinite reverse; border-style: dashed; }

@keyframes spin { to { transform: rotate(360deg); } }

.logo-icon {
  width: 72px; height: 72px;
  background: linear-gradient(135deg, var(--red), var(--red-d));
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 40px rgba(200,16,46,0.6);
  animation: pulse-logo 2s ease-in-out infinite;
}

@keyframes pulse-logo {
  0%, 100% { box-shadow: 0 0 40px rgba(200,16,46,0.6); }
  50%       { box-shadow: 0 0 60px rgba(200,16,46,0.9), 0 0 100px rgba(200,16,46,0.3); }
}

.splash-title {
  font-family: var(--font-display);
  font-size: 56px;
  letter-spacing: 4px;
  color: var(--white);
  text-shadow: 0 4px 20px rgba(200,16,46,0.5);
  animation: fadeUp 0.8s ease 0.3s both;
}

.splash-subtitle {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 6px;
  color: rgba(255,255,255,0.5);
  animation: fadeUp 0.8s ease 0.5s both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Unlock slider */
.splash-unlock-area {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  animation: fadeUp 0.8s ease 0.9s both;
}

.splash-hint {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  letter-spacing: 1px;
}

.unlock-track {
  position: relative;
  width: 280px;
  height: 64px;
  background: rgba(255,255,255,0.07);
  border: 1.5px solid rgba(255,255,255,0.15);
  border-radius: 32px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
}

.unlock-glow {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 0%;
  background: linear-gradient(90deg, rgba(200,16,46,0.3), transparent);
  border-radius: 32px;
  transition: width 0.05s;
  pointer-events: none;
}

.unlock-label {
  position: absolute;
  right: 24px;
  font-size: 22px;
  color: rgba(255,255,255,0.3);
  letter-spacing: -4px;
  pointer-events: none;
  animation: arrow-pulse 1.5s ease-in-out infinite;
}

@keyframes arrow-pulse {
  0%, 100% { opacity: 0.3; transform: translateX(0); }
  50%       { opacity: 0.7; transform: translateX(4px); }
}

.unlock-btn {
  width: 48px; height: 48px;
  background: linear-gradient(135deg, var(--red), var(--red-d));
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(200,16,46,0.5);
  cursor: grab;
  position: relative;
  z-index: 2;
  touch-action: none;
  transition: box-shadow 0.2s;
  flex-shrink: 0;
}

.unlock-btn:active { cursor: grabbing; }
.unlock-btn.unlocked {
  background: linear-gradient(135deg, var(--green), var(--green-d));
  box-shadow: 0 4px 20px rgba(0,122,51,0.6);
}

/* ═══════════ APP ═══════════ */
#app { position: fixed; inset: 0; display: flex; flex-direction: column; }
#app.hidden { display: none; }

/* Header */
.app-header {
  height: var(--header-h);
  background: rgba(13,13,13,0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  z-index: 10;
  flex-shrink: 0;
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  width: 38px; height: 38px;
  background: linear-gradient(135deg, var(--red), var(--red-d));
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}

.header-title {
  display: block;
  font-family: var(--font-display);
  font-size: 22px;
  letter-spacing: 2px;
  line-height: 1;
}

.header-tag {
  display: block;
  font-size: 10px;
  color: var(--gray-l);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.refresh-btn {
  background: rgba(255,255,255,0.08);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: white;
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.refresh-btn:hover { background: rgba(255,255,255,0.15); }
.refresh-btn.spinning svg { animation: spin 1s linear infinite; }

/* ── Bottom Nav – Glowing Marker ── */
.bottom-nav {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: var(--nav-h);
  background: rgba(13,13,13,0.97);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--border);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-list {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.nav-item {
  flex: 1;
}

.nav-item a {
  position: relative;
  color: var(--white);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  height: var(--nav-h);
  z-index: 1000;
  transition: 0.25s;
}

.nav-item a ion-icon {
  font-size: 1.5em;
  pointer-events: none;
  opacity: 0.25;
  transition: opacity 0.25s, transform 0.3s cubic-bezier(.34,1.56,.64,1);
}

.nav-item a span {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  opacity: 0.25;
  transition: opacity 0.25s;
  pointer-events: none;
}

.nav-item.active a ion-icon,
.nav-item.active a span {
  opacity: 1;
}

.nav-item.active a ion-icon {
  transform: translateY(-2px) scale(1.1);
}

/* Glowing marker */
#nav-marker {
  position: absolute;
  top: 0;
  height: 3px;
  border-radius: 0 0 4px 4px;
  transition: left 0.4s cubic-bezier(.68,-.55,.27,1.55), width 0.4s cubic-bezier(.68,-.55,.27,1.55);
  z-index: 1;
  pointer-events: none;
}

#nav-marker::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  border-radius: 0 0 6px 6px;
  background: var(--red);
  box-shadow:
    0 0 10px var(--red),
    0 0 20px var(--red),
    0 0 40px var(--red),
    0 0 60px rgba(200,16,46,0.4);
  transition: background 0.4s, box-shadow 0.4s;
}

/* Color per tab */
.nav-item:nth-child(1).active ~ #nav-marker::before {
  background: #C8102E;
  box-shadow: 0 0 10px #C8102E, 0 0 25px #C8102E, 0 0 50px rgba(200,16,46,0.5);
}
.nav-item:nth-child(2).active ~ #nav-marker::before {
  background: #5da6ff;
  box-shadow: 0 0 10px #5da6ff, 0 0 25px #5da6ff, 0 0 50px rgba(93,166,255,0.5);
}
.nav-item:nth-child(3).active ~ #nav-marker::before {
  background: #00e676;
  box-shadow: 0 0 10px #00e676, 0 0 25px #00e676, 0 0 50px rgba(0,230,118,0.5);
}
.nav-item:nth-child(4).active ~ #nav-marker::before {
  background: #ff9800;
  box-shadow: 0 0 10px #ff9800, 0 0 25px #ff9800, 0 0 50px rgba(255,152,0,0.5);
}

/* Pages */
.pages-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  margin-top: var(--header-h);
  margin-bottom: var(--nav-h);
}

.page {
  position: absolute; inset: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateX(30px);
  pointer-events: none;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.page.active {
  opacity: 1;
  transform: translateX(0);
  pointer-events: all;
}

.page.exit-left {
  opacity: 0;
  transform: translateX(-30px);
}

.page-scroll {
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-bottom: 24px;
  scrollbar-width: none;
}
.page-scroll::-webkit-scrollbar { display: none; }

/* ═══════════ HOME ═══════════ */
.home-hero {
  position: relative;
  height: 220px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 24px;
}

.hero-bg-animation {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--dark) 0%, var(--red-d) 60%, var(--green-d) 100%);
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: orb-drift 6s ease-in-out infinite;
}
.orb1 { width: 200px; height: 200px; background: rgba(200,16,46,0.4); top: -60px; right: -40px; animation-delay: 0s; }
.orb2 { width: 160px; height: 160px; background: rgba(0,122,51,0.3); bottom: -40px; left: 20%; animation-delay: 2s; }
.orb3 { width: 120px; height: 120px; background: rgba(200,16,46,0.2); top: 30%; left: 10%; animation-delay: 4s; }

@keyframes orb-drift {
  0%, 100% { transform: translate(0, 0); }
  33%       { transform: translate(10px, -15px); }
  66%       { transform: translate(-8px, 10px); }
}

.hero-content { position: relative; z-index: 2; }

.hero-eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-bottom: 6px;
  background: rgba(255,255,255,0.1);
  padding: 4px 10px;
  border-radius: 20px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 44px;
  line-height: 1;
  letter-spacing: 2px;
  color: white;
}
.hero-title em { color: var(--red-l); font-style: normal; }

.hero-desc {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  margin-top: 6px;
}

.hero-org {
  font-size: 10px;
  color: rgba(255,255,255,0.35);
  margin-top: 6px;
  line-height: 1.5;
  max-width: 220px;
  font-style: italic;
}

.hero-ball {
  position: absolute;
  right: -20px; top: -20px;
  width: 180px; height: 180px;
  animation: ball-float 4s ease-in-out infinite;
}

@keyframes ball-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-12px) rotate(10deg); }
}

/* Stats */
.home-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 16px;
}

.stat-card {
  background: var(--dark2);
  padding: 16px 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-num {
  font-family: var(--font-display);
  font-size: 36px;
  color: var(--red);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: var(--gray-l);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Section */
.section-block { padding: 0 16px; margin-top: 24px; }

.section-title {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gray-l);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* Upcoming */
.upcoming-list { display: flex; flex-direction: column; gap: 10px; }

.upcoming-card {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s ease both;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.upcoming-date {
  background: rgba(200,16,46,0.15);
  border: 1px solid rgba(200,16,46,0.3);
  border-radius: 8px;
  padding: 6px 10px;
  text-align: center;
  flex-shrink: 0;
  min-width: 48px;
}
.upcoming-date .day { font-family: var(--font-display); font-size: 22px; color: var(--red); line-height: 1; }
.upcoming-date .mon { font-size: 9px; color: var(--gray-l); text-transform: uppercase; letter-spacing: 1px; }

.upcoming-match { flex: 1; min-width: 0; }
.upcoming-match .teams {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.upcoming-match .meta {
  font-size: 11px;
  color: var(--gray-l);
  margin-top: 3px;
}

.upcoming-group {
  background: rgba(0,122,51,0.15);
  border: 1px solid rgba(0,122,51,0.3);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  color: var(--green-l);
}

/* Leaders */
.leaders-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.leader-card {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px;
  animation: slideIn 0.3s ease both;
}

.leader-group-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--red);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.leader-group-tag::before {
  content: '';
  display: inline-block;
  width: 8px; height: 8px;
  background: var(--red);
  border-radius: 50%;
}

.leader-team {
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.leader-pts {
  margin-top: 6px;
  font-family: var(--font-display);
  font-size: 28px;
  color: var(--green-l);
  line-height: 1;
}

.leader-pts-label { font-size: 11px; color: var(--gray-l); }

/* ═══════════ JOGOS ═══════════ */
.page-header-bar {
  padding: 20px 16px 12px;
  border-bottom: 1px solid var(--border);
  position: sticky; top: 0;
  background: var(--dark);
  z-index: 5;
}

.page-header-bar h2 {
  font-family: var(--font-display);
  font-size: 32px;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.filter-tabs {
  display: flex;
  gap: 6px;
}

.ftab {
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--gray-l);
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body);
}

.ftab.active {
  background: var(--red);
  border-color: var(--red);
  color: white;
}

.jogos-list {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.jogo-card {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  animation: slideIn 0.3s ease both;
  position: relative;
  overflow: hidden;
}

.jogo-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--border);
}

.jogo-card.realizado::before { background: var(--green); }
.jogo-card.pendente::before  { background: var(--red); }

.jogo-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.jogo-rodada {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--gray-l);
  text-transform: uppercase;
}

.jogo-status {
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 10px;
  letter-spacing: 1px;
}
.jogo-status.realizado { background: rgba(0,163,68,0.15); color: var(--green-l); }
.jogo-status.pendente  { background: rgba(200,16,46,0.15); color: var(--red-l); }

.jogo-placar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
}

.jogo-team {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.jogo-team.right { text-align: right; align-items: flex-end; }

.team-name {
  font-weight: 700;
  font-size: 14px;
  line-height: 1.2;
}

.jogo-score {
  font-family: var(--font-display);
  font-size: 36px;
  color: var(--white);
  letter-spacing: 4px;
  text-align: center;
  line-height: 1;
}

.jogo-score.pending { color: var(--gray); font-size: 24px; }

.jogo-group-badge {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: var(--gray-l);
}

/* ═══════════ CLASSIFICAÇÃO ═══════════ */
.group-tabs {
  display: flex;
  padding: 12px 16px;
  gap: 8px;
  border-bottom: 1px solid var(--border);
  position: sticky; top: 77px;
  background: var(--dark);
  z-index: 4;
}

.gtab {
  flex: 1;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--gray-l);
  padding: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-body);
  letter-spacing: 1px;
}

.gtab.active {
  background: var(--red);
  border-color: var(--red);
  color: white;
}

.standings-wrap { padding: 12px 16px; }
.hidden-table { display: none; }
.active-table { display: block; }

.standings-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.standings-table th {
  text-align: center;
  padding: 8px 4px;
  color: var(--gray-l);
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border);
}

.standings-table th:first-child { text-align: left; }

.standings-table td {
  text-align: center;
  padding: 12px 4px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.2s;
}

.standings-table td:first-child { text-align: left; }

.standings-table tr:hover td { background: rgba(255,255,255,0.03); }

.pos-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px; height: 24px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 12px;
  margin-right: 6px;
  flex-shrink: 0;
}

.pos-1 { background: #FFD700; color: #0D0D0D; }
.pos-2 { background: #C0C0C0; color: #0D0D0D; }
.pos-3 { background: #CD7F32; color: white; }
.pos-other { background: rgba(255,255,255,0.08); color: var(--gray-l); }

.team-cell {
  display: flex;
  align-items: center;
  font-weight: 600;
  min-width: 0;
}

.team-cell-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
}

.pts-cell {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--green-l);
  font-weight: 900;
}

.classif-label {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 0 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--gray-l);
  text-transform: uppercase;
}
.classif-label.cl { color: var(--green-l); }
.classif-label.el { color: var(--gray); }

/* ═══════════ MATA-MATA ═══════════ */
.bracket-outer {
  padding: 16px;
}

.bracket-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gray-l);
  text-align: center;
  margin-bottom: 20px;
}

.bracket-phase {
  margin-bottom: 28px;
}

.phase-label {
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--gray-l);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.phase-label::before, .phase-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.phase-label.semifinal  .pl-inner { color: var(--red-l); }
.phase-label.final      .pl-inner { color: #FFD700; }
.phase-label.terceiro   .pl-inner { color: #CD7F32; }

.bracket-matches { display: flex; flex-direction: column; gap: 10px; }

.bracket-match {
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  animation: slideIn 0.3s ease both;
}

.bracket-team {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  transition: background 0.2s;
}

.bracket-team:first-child { border-bottom: 1px solid var(--border); }

.bracket-team.winner {
  background: rgba(0,122,51,0.12);
}

.bracket-team.winner .bt-name { color: var(--green-l); font-weight: 700; }

.bt-name {
  font-size: 14px;
  font-weight: 600;
}

.bt-score {
  font-family: var(--font-display);
  font-size: 22px;
}

.bt-score.winner-score { color: var(--green-l); }

.bracket-match-meta {
  padding: 6px 14px;
  background: rgba(0,0,0,0.2);
  font-size: 10px;
  color: var(--gray-l);
  letter-spacing: 1px;
  text-align: center;
  border-top: 1px solid var(--border);
}

.champion-card {
  background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(200,16,46,0.1));
  border: 1px solid rgba(255,215,0,0.3);
  border-radius: var(--radius);
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
  animation: slideIn 0.5s ease both;
}

.champion-trophy {
  font-size: 48px;
  margin-bottom: 8px;
}

.champion-label {
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,215,0,0.6);
  margin-bottom: 6px;
}

.champion-name {
  font-family: var(--font-display);
  font-size: 32px;
  color: #FFD700;
  letter-spacing: 2px;
}

/* ═══════════ UTILITIES ═══════════ */
.loading-skeleton {
  height: 68px;
  background: var(--dark3);
  border-radius: var(--radius-sm);
  animation: shimmer 1.5s ease-in-out infinite;
  background-image: linear-gradient(90deg, var(--dark3) 0%, rgba(255,255,255,0.06) 50%, var(--dark3) 100%);
  background-size: 200% 100%;
}
.loading-skeleton.tall { height: 140px; }

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: var(--gray);
}
.empty-state .icon { font-size: 48px; margin-bottom: 12px; }
.empty-state p { font-size: 14px; line-height: 1.5; }

.toast {
  position: fixed;
  bottom: calc(var(--nav-h) + 12px);
  left: 50%; transform: translateX(-50%) translateY(20px);
  background: var(--dark2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 100;
  pointer-events: none;
}
.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ═══════════ RESPONSIVE ═══════════ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

  </style>
</head>
<body>

<!-- ═══════════════ SPLASH SCREEN ═══════════════ -->
<div id="splash">
  <div class="splash-bg"></div>
  <div class="splash-particles" id="particles"></div>

  <div class="splash-content">
    <div class="splash-logo">
      <div class="logo-ring logo-ring-1"></div>
      <div class="logo-ring logo-ring-2"></div>
      <div class="logo-icon">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" stroke="white" stroke-width="3" opacity="0.3"/>
          <path d="M25 28 L40 20 L55 28 L55 52 L40 60 L25 52 Z" fill="white" opacity="0.9"/>
          <circle cx="40" cy="40" r="8" fill="#C8102E"/>
          <path d="M32 36 L40 22 L48 36" stroke="#C8102E" stroke-width="2" fill="none"/>
          <path d="M30 44 L40 58 L50 44" stroke="#C8102E" stroke-width="2" fill="none"/>
        </svg>
      </div>
    </div>

    <h1 class="splash-title">AfoHand</h1>
    <p class="splash-subtitle">HANDEBOL DE 5</p>

    <div class="splash-unlock-area">
      <p class="splash-hint">Deslize para desbloquear</p>
      <div class="unlock-track">
        <div class="unlock-glow"></div>
        <div class="unlock-btn" id="unlockBtn">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
            <path d="M5 12H19M13 6L19 12L13 18" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="unlock-label">›</div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════ APP SHELL ═══════════════ -->
<div id="app" class="hidden">

  <!-- Header -->
  <header class="app-header">
    <div class="header-inner">
      <div class="header-logo">
        <div class="header-icon">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <path d="M12 14 L20 10 L28 14 L28 26 L20 30 L12 26 Z" fill="white" opacity="0.9"/>
            <circle cx="20" cy="20" r="4" fill="#C8102E"/>
          </svg>
        </div>
        <div>
          <span class="header-title">AfoHand</span>
          <span class="header-tag">Handebol de 5</span>
        </div>
      </div>
      <button class="refresh-btn" id="refreshBtn" title="Atualizar dados">
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
          <path d="M4 12a8 8 0 018-8V2L20 6l-8 4V8a4 4 0 100 8 4 4 0 004-3.874" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </header>

  <!-- Nav -->
  <nav class="bottom-nav">
    <ul class="nav-list">
      <li class="nav-item active" data-page="home">
        <a href="#">
          <ion-icon name="home-outline"></ion-icon>
          <span>Início</span>
        </a>
      </li>
      <li class="nav-item" data-page="jogos">
        <a href="#">
          <ion-icon name="calendar-outline"></ion-icon>
          <span>Jogos</span>
        </a>
      </li>
      <li class="nav-item" data-page="classificacao">
        <a href="#">
          <ion-icon name="podium-outline"></ion-icon>
          <span>Classificação</span>
        </a>
      </li>
      <li class="nav-item" data-page="matamata">
        <a href="#">
          <ion-icon name="shield-outline"></ion-icon>
          <span>Mata-Mata</span>
        </a>
      </li>
      <div id="nav-marker"></div>
      <div id="nav-marker"></div>
    </ul>
  </nav>

  <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

  <!-- Pages -->
  <main class="pages-container">

    <!-- HOME PAGE -->
    <section class="page active" id="page-home">
      <div class="page-scroll">
        <div class="home-hero">
          <div class="hero-bg-animation">
            <div class="hero-orb orb1"></div>
            <div class="hero-orb orb2"></div>
            <div class="hero-orb orb3"></div>
          </div>
          <div class="hero-content">
            <span class="hero-eyebrow">Edição 2026</span>
            <h2 class="hero-title">Campeonato<br><em>AfoHand</em></h2>
            <p class="hero-desc">O maior torneio de handebol de 5 de Afonso Cláudio</p>
            <p class="hero-org">Um evento realizado pela Prefeitura Municipal de Afonso Cláudio via Secretaria de Esportes e Lazer</p>
          </div>
          <div class="hero-ball">
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="54" fill="white" fill-opacity="0.08" stroke="white" stroke-width="2" stroke-opacity="0.3"/>
              <circle cx="60" cy="60" r="38" fill="white" fill-opacity="0.1"/>
              <path d="M30 60 Q60 30 90 60 Q60 90 30 60Z" fill="white" fill-opacity="0.2"/>
              <path d="M60 18 Q80 40 80 60 Q80 80 60 102 Q40 80 40 60 Q40 40 60 18Z" fill="white" fill-opacity="0.15"/>
            </svg>
          </div>
        </div>

        <div class="home-stats" id="homeStats">
          <div class="stat-card">
            <span class="stat-num" id="statTimes">12</span>
            <span class="stat-label">Times</span>
          </div>
          <div class="stat-card">
            <span class="stat-num" id="statJogos">9</span>
            <span class="stat-label">Jogos</span>
          </div>
          <div class="stat-card">
            <span class="stat-num" id="statMinutos">+270</span>
            <span class="stat-label">Min. de Handebol</span>
          </div>
        </div>

        <div class="section-block">
          <h3 class="section-title">Próximos Jogos</h3>
          <div id="proximosJogos" class="upcoming-list">
            <div class="loading-skeleton"></div>
            <div class="loading-skeleton"></div>
          </div>
        </div>

        <div class="section-block">
          <h3 class="section-title">Líderes por Grupo</h3>
          <div id="lideres" class="leaders-grid">
            <div class="loading-skeleton tall"></div>
            <div class="loading-skeleton tall"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- JOGOS PAGE -->
    <section class="page" id="page-jogos">
      <div class="page-scroll">
        <div class="page-header-bar">
          <h2>Jogos</h2>
          <div class="filter-tabs">
            <button class="ftab active" data-filter="todos">Todos</button>
            <button class="ftab" data-filter="pendente">A Jogar</button>
            <button class="ftab" data-filter="realizado">Realizados</button>
          </div>
        </div>
        <div id="jogosList" class="jogos-list">
          <div class="loading-skeleton"></div>
          <div class="loading-skeleton"></div>
          <div class="loading-skeleton"></div>
        </div>
      </div>
    </section>

    <!-- CLASSIFICAÇÃO PAGE -->
    <section class="page" id="page-classificacao">
      <div class="page-scroll">
        <div class="page-header-bar">
          <h2>Classificação</h2>
        </div>

        <div class="group-tabs">
          <button class="gtab active" data-group="A">Grupo A</button>
          <button class="gtab" data-group="B">Grupo B</button>
        </div>

        <div id="tableA" class="standings-wrap active-table">
          <div class="loading-skeleton tall"></div>
        </div>
        <div id="tableB" class="standings-wrap hidden-table">
          <div class="loading-skeleton tall"></div>
        </div>
      </div>
    </section>

    <!-- MATA-MATA PAGE -->
    <section class="page" id="page-matamata">
      <div class="page-scroll">
        <div class="page-header-bar">
          <h2>Mata-Mata</h2>
        </div>
        <div id="bracketWrap" class="bracket-outer">
          <div class="loading-skeleton tall"></div>
        </div>
      </div>
    </section>

  </main>
</div>

<!-- Toast -->
<div id="toast" class="toast"></div>

<script>
/* ═══════════════════════════════════════════════
   AfoHand – App Logic
   Google Sheets como banco de dados
   ═══════════════════════════════════════════════ */

// ─── CONFIG ──────────────────────────────────
const CONFIG = {
  SHEET_ID: '1CT9nND4HHVakDZHydtDyF6g2ULwuF8iMpyE9OqaMQVU',
  API_KEY:  'AIzaSyBzIsc4TKy_he2P8PcOgOzs8Eor3EVHBzw',
};

// Lê range específico via Sheets API v4
const apiUrl = (range) =>
  `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${encodeURIComponent(range)}?key=${CONFIG.API_KEY}`;

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
    const [gruposRes, mmRes] = await Promise.all([
      fetch(apiUrl("'Fase de Grupos'!A5:S7")),
      fetch(apiUrl("'Mata-Mata'!A4:M17")),
    ]);
    const gruposData = await gruposRes.json();
    const mmData     = await mmRes.json();

    state.jogos    = parseGrupos(gruposData.values || []);
    state.matamata = parseMataMata(mmData.values || []);
    state.loaded = true;
    renderAll();
  } catch (err) {
    console.error('[AFOHAND]', err);
    state.jogos    = DEMO.jogos;
    state.matamata = DEMO.matamata;
    state.loaded = true;
    renderAll();
    showToast('⚠️ Sem conexão — dados demo');
  } finally {
    refreshBtn.classList.remove('spinning');
  }
}

// Parseia 3 linhas da "Fase de Grupos" (matriz: Grupo A cols 0-8, Grupo B cols 10-18)
// Colunas: [JOGO, EQUIPE1, _, GOLS1, X, GOLS2, EQUIPE2, _, RESULTADO]
function parseGrupos(rows) {
  const jogos = [];
  rows.forEach((row, ri) => {
    const gA_eq1 = row[1] || '';
    const gA_eq2 = row[6] || '';
    const gA_g1  = row[3] || '';
    const gA_g2  = row[5] || '';
    if (gA_eq1 && gA_eq2) {
      const temGol = gA_g1 !== '' && gA_g2 !== '';
      jogos.push({
        id: parseInt(row[0]) || ri + 1,
        grupo: 'A', rodada: 1,
        casa: gA_eq1, visitante: gA_eq2,
        gols_casa: temGol ? parseInt(gA_g1) : 0,
        gols_visitante: temGol ? parseInt(gA_g2) : 0,
        status: temGol ? 'realizado' : 'pendente',
        data: '', hora: '',
      });
    }
    const gB_eq1 = row[11] || '';
    const gB_eq2 = row[16] || '';
    const gB_g1  = row[13] || '';
    const gB_g2  = row[15] || '';
    if (gB_eq1 && gB_eq2) {
      const temGol = gB_g1 !== '' && gB_g2 !== '';
      jogos.push({
        id: parseInt(row[10]) || ri + 4,
        grupo: 'B', rodada: 1,
        casa: gB_eq1, visitante: gB_eq2,
        gols_casa: temGol ? parseInt(gB_g1) : 0,
        gols_visitante: temGol ? parseInt(gB_g2) : 0,
        status: temGol ? 'realizado' : 'pendente',
        data: '', hora: '',
      });
    }
  });
  return jogos;
}

// Parseia "Mata-Mata": SF1 rows 0-1, SF2 rows 5-6, Final rows 11-12 (dentro do range A4:M17)
function parseMataMata(rows) {
  const get = (ri, ci) => (rows[ri] && rows[ri][ci]) ? rows[ri][ci].toString().trim() : '';
  const buildJogo = (fase, nameRow, golRow) => {
    const t1  = get(nameRow, 1);
    const t2  = get(nameRow, 7);
    const g1s = get(golRow, 1);
    const g2s = get(golRow, 7);
    const temGol = g1s !== '' && g2s !== '';
    return {
      fase, jogo: 1,
      time1: t1 || fase + ' T1', time2: t2 || fase + ' T2',
      gols1: temGol ? parseInt(g1s) : 0,
      gols2: temGol ? parseInt(g2s) : 0,
      status: temGol ? 'realizado' : 'pendente',
    };
  };
  return [
    buildJogo('Semifinal', 0, 1),
    buildJogo('Semifinal', 5, 6),
    buildJogo('Final',     11, 12),
  ];
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

  // Atualiza contagem de jogos se tiver dados da planilha
  if (state.loaded) {
    document.getElementById('statJogos').textContent = jogosRealizados.length;
  }
  // statMinutos e statTimes ficam fixos conforme definido no HTML

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

</script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>
