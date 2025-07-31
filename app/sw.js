const CACHE = "offline";
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
workbox.routing.registerRoute(
  ({request}) => true,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 5 * 24 * 60 * 60,
      }),
    ],
  })
);
