const CACHE_NAME = 'nekobeats-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/js/visualizer.js',
    '/js/effects.js',
    '/js/controls.js',
    '/js/themes.js',
    '/js/barthemes.js',
    '/barthemes/default.json',
    '/barthemes/rounded.json',
    '/barthemes/thin.json',
    '/barthemes/hollow.json',
    '/barthemes/triangles.json',
    '/barthemes/dots.json',
    '/barthemes/space.json',
    '/favicon.ico'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});