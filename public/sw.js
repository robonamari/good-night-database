const APP_SHELL_CACHE = "app-shell-v1.2.2";
const ASSETS_CACHE = "assets-v1.0.1";

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(async (cached) => {
      if (cached) {
        return cached;
      }
      const response = await fetch(event.request);
      if (new URL(event.request.url).pathname.endsWith(".gif") && response.ok) {
        const cache = await caches.open(ASSETS_CACHE);
        await cache.put(event.request, response.clone());
      }
      return response;
    }),
  );
});

self.addEventListener("install", (event) => {
  let platformAssets = [];
  if (/Android/i.test(navigator.userAgent)) {
    platformAssets = [
      ...[48, 72, 96, 144, 192, 512].map(
        (size) => `assets/android/android-launchericon-${size}-${size}.png`,
      ),
      "assets/android/home.png",
    ];
  } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    platformAssets = [
      ...[
        16, 20, 29, 32, 40, 50, 57, 58, 60, 64, 72, 76, 80, 87, 100, 114, 120,
        128, 144, 152, 167, 180, 192, 256, 512, 1024,
      ].map((size) => `assets/ios/${size}.png`),
    ];
  } else if (/Windows/i.test(navigator.userAgent)) {
    const scales = ["100", "125", "150", "200", "400"];
    const targetSizes = [
      16, 20, 24, 30, 32, 36, 40, 44, 48, 60, 64, 72, 80, 96, 256,
    ];
    platformAssets = [
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
    ];
  }
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.addAll([
        ...platformAssets,
        "/",
        "gifs",
        "texts",
        "favicon.ico",
        "assets/css/common.css",
        "assets/js/notification.js",
      ]);
    }),
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
              cacheName !== APP_SHELL_CACHE && cacheName !== ASSETS_CACHE,
          )
          .map((cacheName) => caches.delete(cacheName)),
      );
    }),
  );
});
