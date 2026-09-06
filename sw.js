const CACHE_NAME = 'namma-tour-v15'; // bumped again to force real Firebase keys to load
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './i18n.js',
  './places-data.js',
  './voice.js',
  './gemini-assistant.js',
  './firebase-config.js',
  './manifest.json',
  './icon.png',
  './icon-192.png',
  './icon-512.png',
  './qrcode.min.js',
  'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // cache each file individually so one failed (e.g. CDN) fetch doesn't
      // stop every other file from being cached for offline use
      Promise.all(FILES_TO_CACHE.map((url) => cache.add(url).catch((err) => console.warn('SW cache skip:', url, err))))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      // Without this, a newly-activated service worker still doesn't control
      // tabs that were already open — they'd keep reading the OLD cache
      // (old firebase-config.js) until fully closed and reopened. claim()
      // takes control immediately so an open tab gets the fix on next fetch.
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
