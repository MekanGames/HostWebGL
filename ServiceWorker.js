const cacheName = "MekanGames-Human Tower-0.1.0";
const contentToCache = [
    "Build/3a791f451af3dfd56e9ee0defe085342.loader.js",
    "Build/8d21b1a93c0ea05516b905f419ca9eee.framework.js",
    "Build/386cfb9186c102937b67b56581f8e4c6.data",
    "Build/d0fbeb1d98d5cea743a99ff92b147c2d.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
