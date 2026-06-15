const VERSION = "v2026-06-16";

importScripts("https://storage.googleapis.com/workbox-cdn/releases/7.4.1/workbox-sw.js");

workbox.routing.registerRoute(
  ({
    url
  }) => url.pathname.startsWith("/app/"),
  new workbox.strategies.CacheFirst({
    cacheName: `app-shell-${VERSION}`,
  })
);

workbox.routing.registerRoute(
  ({
    url
  }) => url.pathname.includes("database.json"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: `app-data-${VERSION}`
  })
);

workbox.routing.registerRoute(
  ({
    url
  }) => url.pathname.endsWith(".gif"),
  new workbox.strategies.CacheFirst({
    cacheName: `gif-cache-${VERSION}`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 100,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                ![
                  `app-shell-${VERSION}`,
                  `app-data-${VERSION}`,
                  `gif-cache-${VERSION}`,
                ].includes(key)
            )
            .map((key) => caches.delete(key))
        )
      ),
    ])
  );
});
