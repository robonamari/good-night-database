const CACHE = "offline";
const urlsToCache = [
  "/app/gifs",
  "/app/",
  "/app/texts"
];
importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }
});
workbox.routing.registerRoute(
  ({
    url
  }) => urlsToCache.includes(url.pathname),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60
      }),
    ],
  })
);
