const cacheName = "MekanGames-Human Tower-0.1.0";
const contentToCache = [
    "Build/7b1f439904e6a64f66ec40ffc7584ad3.loader.js",
    "Build/a15516e7cb18aa8c6e34614753436024.framework.js",
    "Build/ead24742af6a96bdd9c3dde535a86ed6.data",
    "Build/e922a15cf0d2d2225c018b148d85aac0.wasm",
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
