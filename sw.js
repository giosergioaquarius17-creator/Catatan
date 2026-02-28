const CACHE_NAME = 'tugasku-pro-v1';
const assets = [
  './',
  './index.html',
  'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'
];

// Install Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Fetching Assets
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
