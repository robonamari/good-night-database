const CACHE = "app-shell-v1";

importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

workbox.routing.registerRoute(
  ({
    request
  }) =>
    url.pathname === "/app/" ||
    url.pathname === "/app/gifs" ||
    url.pathname === "/app/texts",
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
