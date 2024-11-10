const cacheName = "MekanGames-Human Tower-0.1.0";
const contentToCache = [
    "Build/378b5de2c38ae4003be943691eb79ecd.loader.js",
    "Build/a15516e7cb18aa8c6e34614753436024.framework.js",
    "Build/bbff1a614aaf9fd89260e409743ed3d5.data",
    "Build/f34f429cbd04e59eda086ef6824a5c6f.wasm",
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
