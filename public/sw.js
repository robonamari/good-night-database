const APP_SHELL_CACHE = "app-shell-v0.1.1";
const APP_SHELL_ASSETS = [
  "/",
  "gifs",
  "favicon.ico",
  "texts",
  "assets/css/common.css",
  "assets/js/notification.js",
];

self.addEventListener("install", (event) => {
  if (/Android/i.test(navigator.userAgent)) {
    APP_SHELL_ASSETS.push(
      ...[48, 72, 96, 144, 192, 512].map(
        (size) => `/assets/android/android-launchericon-${size}-${size}.png`,
      ),
      "/assets/android/home.png",
    );
  } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    APP_SHELL_ASSETS.push(
      ...[
        16, 20, 29, 32, 40, 50, 57, 58, 60, 64, 72, 76, 80, 87, 100, 114, 120,
        128, 144, 152, 167, 180, 192, 256, 512, 1024,
      ].map((size) => `/assets/ios/${size}.png`),
    );
  } else if (/Windows/i.test(navigator.userAgent)) {
    const scales = ["100", "125", "150", "200", "400"];
    const targetSizes = [
      16, 20, 24, 30, 32, 36, 40, 44, 48, 60, 64, 72, 80, 96, 256,
    ];
    APP_SHELL_ASSETS.push(
      "/assets/windows11/home.png",
      ...[
        "LargeTile",
        "SmallTile",
        "SplashScreen",
        "Square150x150Logo",
        "StoreLogo",
        "Wide310x150Logo",
        "Square44x44Logo",
      ].flatMap((name) =>
        scales.map((scale) => `/assets/windows11/${name}.scale-${scale}.png`),
      ),
      ...["altform-lightunplated", "altform-unplated"].flatMap((variant) =>
        targetSizes.map(
          (size) =>
            `/assets/windows11/Square44x44Logo.${variant}_targetsize-${size}.png`,
        ),
      ),
      ...targetSizes.map(
        (size) => `/assets/windows11/Square44x44Logo.targetsize-${size}.png`,
      ),
    );
  }
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const oldCaches = await Promise.all(
        cacheNames
          .filter(
            (name) => name.startsWith("app-shell-") && name !== APP_SHELL_CACHE,
          )
          .map((name) => caches.open(name)),
      );
      const cache = await caches.open(APP_SHELL_CACHE);
      await Promise.all(
        [...APP_SHELL_ASSETS].map(async (url) => {
          let cachedResponse;
          for (const oldCache of oldCaches) {
            cachedResponse = await oldCache.match(url);
            if (cachedResponse) break;
          }
          const headers = new Headers();
          const etag = cachedResponse?.headers.get("ETag");
          if (etag) {
            headers.set("If-None-Match", etag);
          }
          const response = await fetch(url, {
            headers,
            cache: "no-store",
          });
          if (response.status === 304 && cachedResponse) {
            await cache.put(url, cachedResponse);
          } else if (response.ok) {
            await cache.put(url, response);
          } else {
            throw new Error(`Failed to fetch ${url}: ${response.status}`);
          }
        }),
      );
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== APP_SHELL_CACHE)
          .map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    const cache = await caches.open(APP_SHELL_CACHE);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse !== undefined) {
      return cachedResponse;
    } else {
      return fetch(event.request);
    }
  })());
});
