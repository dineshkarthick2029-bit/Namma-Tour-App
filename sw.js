// Namma Tour — sw.js
// Service worker. Bump CACHE_NAME whenever you change a file to force
// fresh caching on next open.

const CACHE_NAME = 'namma-tour-v30'; // bumped: 7 languages, map, SOS, fare, phrasebook

const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './style.css-addition.css',
  './app.js',
  './i18n.js',
  './voice.js',
  './places-data.js',
  './places-data-addition.js',
  './phrases-data.js',
  './fare-data.js',
  './festivals-data.js',
  './scams-data.js',
  './emergency-data.js',
  './routes-data.js',
  './offline-router.js',
  './map-online.js',
  './map-offline.js',
  './dk-assistant.js',
  './firebase-config.js',
  './gemini-assistant.js', // legacy — safe to keep, ignored if unused
  './manifest.json',
  './icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png',
  './qrcode.min.js',

  // External libraries — cached after first successful load
  'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js',
];

// Install: cache each file individually so one failure (CDN down, file
// missing) doesn't block the rest.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        FILES_TO_CACHE.map((url) =>
          cache.add(url).catch((err) => console.warn('SW cache skip:', url, err.message || err))
        )
      )
    )
  );
  self.skipWaiting();
});

// Activate: delete any older cache versions, then claim open tabs so they
// immediately use the new files (otherwise a still-open tab keeps the old
// cached JS until fully closed).
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for everything except:
//   • OSM map tiles (always go live — they'd fill the cache instantly)
//   • Non-GET requests
//   • Firebase API writes (must always reach the network)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Skip map tiles (OSM) — never cache these
  if (/tile\.openstreetmap\.org/.test(url.hostname)) return;

  // Skip Firebase writes/reads for backups (must be live)
  if (/firestore\.googleapis\.com/.test(url.hostname)) return;

  // For navigation requests, prefer network so the app updates, fall back to cache.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
          return resp;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Everything else: cache-first, then network (and cache the response).
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        if (resp.ok && (resp.type === 'basic' || resp.type === 'cors')) {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        }
        return resp;
      }).catch(() => cached); // if network fails and no cache, return undefined → browser shows error
    })
  );
});
