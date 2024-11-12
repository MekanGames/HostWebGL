const cacheName = "MekanGames-Human Tower-0.1.0";
const contentToCache = [
    "Build/ceccf83993b3e1498228ba598c85582c.loader.js",
    "Build/d72f3918dcb3eca7150344f9f35ae9bf.framework.js.br",
    "Build/509f9034dc277ec7ee4686e9d8952787.data.br",
    "Build/03eeeccc3ac57a8ef729d7a2a2618aec.wasm.br",
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
