const cacheName = "MekanGames-Human Tower-0.1.0";
const contentToCache = [
    "Build/fb7a1d64a0e05fc66279514d058b3a56.loader.js",
    "Build/d72f3918dcb3eca7150344f9f35ae9bf.framework.js",
    "Build/9ce49b39243c0b0910137c770b04c807.data",
    "Build/0e6a8303d61ed0ca6873a635f3a78c0a.wasm",
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
