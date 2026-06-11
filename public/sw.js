const CACHE = "app-shell-v1";

importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

workbox.routing.registerRoute(
  ({
    request
  }) =>
    request.destination === "document" ||
    request.destination === "script" ||
    request.destination === "style",
  new workbox.strategies.CacheFirst({
    cacheName: CACHE
  })
);

workbox.routing.registerRoute(
  ({
    url
  }) => url.pathname.includes("database.json"),
  new workbox.strategies.NetworkOnly()
);
