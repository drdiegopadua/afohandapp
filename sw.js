// AfoHand Service Worker
const CACHE      = 'afohand-v3';
const DATA_CACHE = 'afohand-data-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/tv.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
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

  // App shell — cache first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type !== 'basic') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});

// ── PUSH NOTIFICATIONS ──────────────────────────────
self.addEventListener('push', e => {
  let data = { title: '🤾 AFOHAND', body: 'Nova atualização!', url: '/' };
  try { data = { ...data, ...e.data.json() }; } catch(_) {}

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'afohand-result',
      renotify: true,
      data: { url: data.url || '/' },
      actions: [{ action: 'open', title: 'Ver resultado' }]
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.includes(self.location.origin)) { c.focus(); return; }
      }
      return clients.openWindow(url);
    })
  );
});
