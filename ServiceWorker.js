const cacheName = "MekanGames-Human Tower-0.1.0";
const contentToCache = [
    "Build/42bf361e083a964dbb6d27006cdcce63.loader.js",
    "Build/d72f3918dcb3eca7150344f9f35ae9bf.framework.js.br",
    "Build/ef1b3e2d0c500574fb76a81019c572c3.data.br",
    "Build/60078b67489b6be292e76ba3723e8613.wasm.br",
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
