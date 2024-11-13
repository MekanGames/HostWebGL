const cacheName = "MekanGames-Human Tower-0.1.0";
const contentToCache = [
    "Build/9cccb97b3de32c6cbec0c19480228100.loader.js",
    "Build/8d21b1a93c0ea05516b905f419ca9eee.framework.js",
    "Build/fcd99e0ed0890f760ceb4c462e511c6c.data",
    "Build/22afb0c2646f0cb6e4ce8d19d6907c95.wasm",
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
