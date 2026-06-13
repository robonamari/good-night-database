const VERSION = "v2";

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/7.4.1/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([{
  url: "/app/index.html",
  revision: VERSION
},
{
  url: "/app/gifs.html",
  revision: VERSION
},
{
  url: "/app/texts.html",
  revision: VERSION
},
]);

workbox.routing.registerRoute(
  ({
    url
  }) => url.pathname.endsWith("database.json"),
  new workbox.strategies.NetworkFirst({
    cacheName: `data-cache-${VERSION}`,
    networkTimeoutSeconds: 3,
  })
);

workbox.routing.registerRoute(
  ({
    url
  }) =>
    url.pathname.startsWith("/assets/uploads/") &&
    url.pathname.endsWith(".gif"),
  new workbox.strategies.CacheFirst({
    cacheName: `gif-cache-${VERSION}`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({
    url
  }) =>
    url.pathname.startsWith("/assets/android/") ||
    url.pathname.startsWith("/assets/windows11/") ||
    url.pathname.startsWith("/assets/ios/"),
  new workbox.strategies.CacheFirst({
    cacheName: `image-cache-${VERSION}`,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);


workbox.routing.setCatchHandler(async ({
  event
}) => {
  if (event.request.destination === "document") {
    return caches.match("/app/index.html");
  }
  return Response.error();
});

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) =>
              ![
                `data-cache-${VERSION}`,
                `gif-cache-${VERSION}`,
                `image-cache-${VERSION}`,
              ].includes(key)
          )
          .map((key) => caches.delete(key))
      )
    )
  );
});
