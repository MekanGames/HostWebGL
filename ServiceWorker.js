const cacheName = "MekanGames-Human Tower-0.1.0";
const contentToCache = [
    "Build/08cbc3e5a71fee73288ecf8585bbfa2f.loader.js",
    "Build/d72f3918dcb3eca7150344f9f35ae9bf.framework.js",
    "Build/d9c3fde1c8e9ce3953b8209969f6e241.data",
    "Build/353d9a3b9f86a5856095c5dae6cec8af.wasm",
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
