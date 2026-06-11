const APP_SHELL_CACHE = "app-shell-v1";
const DATA_CACHE = "app-data-v1";
const GIF_CACHE = "gif-cache-v1";

importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

workbox.routing.registerRoute(
  ({
    url
  }) => url.pathname.startsWith("/app/"),
  new workbox.strategies.CacheFirst({
    cacheName: APP_SHELL_CACHE,
  })
);

workbox.routing.registerRoute(
  ({
    url
  }) => url.pathname.includes("database.json"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: DATA_CACHE
  })
);

workbox.routing.registerRoute(
  ({
    url
  }) => url.pathname.endsWith(".gif"),
  new workbox.strategies.CacheFirst({
    cacheName: GIF_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 100,
      }),
    ],
  })
);
