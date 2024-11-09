const cacheName = "MekanGames-Human Tower-0.1.0";
const contentToCache = [
    "Build/934b5cf6cf63f1f250a374cf074022bf.loader.js",
    "Build/a15516e7cb18aa8c6e34614753436024.framework.js",
    "Build/56abc8d09acb46b6643f21b24762c0b3.data",
    "Build/db3e90867e87131cd8f2b00ca8839566.wasm",
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
