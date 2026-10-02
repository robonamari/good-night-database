const APP_SHELL_CACHE = "app-shell-v1";
const ASSETS_CACHE = "assets-v1";

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    url.pathname === "assets/js/notification.js"
  ) {
    event.respondWith(cacheFirst(event.request, APP_SHELL_CACHE));
    return;
  }
  if (url.pathname.endsWith(".gif")) {
    event.respondWith(cacheFirst(event.request, ASSETS_CACHE));
  }
});

const cacheFirst = async (request, cacheName) => {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
  }
  return response;
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.add("404.html");
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName !== APP_SHELL_CACHE &&
              cacheName !== ASSETS_CACHE
          )
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
