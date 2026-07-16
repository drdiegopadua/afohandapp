// AfoHand Service Worker
const CACHE      = 'afohand-v4';
const DATA_CACHE = 'afohand-data-v1';
// Caminhos relativos ao escopo do SW (funciona na raiz e em /afohandapp/)
const ASSETS = [
  './',
  './index.html',
  './tv.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE && k !== DATA_CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Sheets API — network first, cache fallback
  if (e.request.url.includes('sheets.googleapis.com')) {
    e.respondWith(
      fetch(e.request.clone())
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(DATA_CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request, { cacheName: DATA_CACHE }))
    );
    return;
  }

  // Fonts e outros recursos externos — só rede
  if (!e.request.url.startsWith(self.location.origin)) return;

  // HTML / navegação — network first, para atualizações chegarem imediatamente
  if (e.request.mode === 'navigate' || e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Demais estáticos — stale-while-revalidate (responde do cache e atualiza em segundo plano)
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});

// ── PUSH NOTIFICATIONS ──────────────────────────────
self.addEventListener('push', e => {
  let data = { title: '🤾 AFOHAND', body: 'Nova atualização!', url: './' };
  try { data = { ...data, ...e.data.json() }; } catch(_) {}

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      tag: 'afohand-result',
      renotify: true,
      data: { url: data.url || './' },
      actions: [{ action: 'open', title: 'Ver resultado' }]
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.includes(self.location.origin)) { c.focus(); return; }
      }
      return clients.openWindow(url);
    })
  );
});
