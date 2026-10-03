const APP_SHELL_CACHE = "app-shell-v1.0.0";
const ASSETS_CACHE = "assets-v1.0.0";

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
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
  let platformAssets = [];
  if (/Android/i.test(navigator.userAgent)) {
    platformAssets = [
      "assets/android/android-launchericon-144-144.png",
      "assets/android/android-launchericon-192-192.png",
      "assets/android/android-launchericon-48-48.png",
      "assets/android/android-launchericon-512-512.png",
      "assets/android/android-launchericon-72-72.png",
      "assets/android/android-launchericon-96-96.png",
      "assets/android/home.png"
    ];
  } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    platformAssets = [
      "assets/ios/100.png",
      "assets/ios/1024.png",
      "assets/ios/114.png",
      "assets/ios/120.png",
      "assets/ios/128.png",
      "assets/ios/144.png",
      "assets/ios/152.png",
      "assets/ios/16.png",
      "assets/ios/167.png",
      "assets/ios/180.png",
      "assets/ios/192.png",
      "assets/ios/20.png",
      "assets/ios/256.png",
      "assets/ios/29.png",
      "assets/ios/32.png",
      "assets/ios/40.png",
      "assets/ios/50.png",
      "assets/ios/512.png",
      "assets/ios/57.png",
      "assets/ios/58.png",
      "assets/ios/60.png",
      "assets/ios/64.png",
      "assets/ios/72.png",
      "assets/ios/76.png",
      "assets/ios/80.png",
      "assets/ios/87.png",
    ];
  } else if (/Windows/i.test(navigator.userAgent)) {
    platformAssets = [
      "assets/windows11/home.png",
      "assets/windows11/LargeTile.scale-100.png",
      "assets/windows11/LargeTile.scale-125.png",
      "assets/windows11/LargeTile.scale-150.png",
      "assets/windows11/LargeTile.scale-200.png",
      "assets/windows11/LargeTile.scale-400.png",
      "assets/windows11/SmallTile.scale-100.png",
      "assets/windows11/SmallTile.scale-125.png",
      "assets/windows11/SmallTile.scale-150.png",
      "assets/windows11/SmallTile.scale-200.png",
      "assets/windows11/SmallTile.scale-400.png",
      "assets/windows11/SplashScreen.scale-100.png",
      "assets/windows11/SplashScreen.scale-125.png",
      "assets/windows11/SplashScreen.scale-150.png",
      "assets/windows11/SplashScreen.scale-200.png",
      "assets/windows11/SplashScreen.scale-400.png",
      "assets/windows11/Square150x150Logo.scale-100.png",
      "assets/windows11/Square150x150Logo.scale-125.png",
      "assets/windows11/Square150x150Logo.scale-150.png",
      "assets/windows11/Square150x150Logo.scale-200.png",
      "assets/windows11/Square150x150Logo.scale-400.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
      "assets/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
      "assets/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
      "assets/windows11/Square44x44Logo.scale-100.png",
      "assets/windows11/Square44x44Logo.scale-125.png",
      "assets/windows11/Square44x44Logo.scale-150.png",
      "assets/windows11/Square44x44Logo.scale-200.png",
      "assets/windows11/Square44x44Logo.scale-400.png",
      "assets/windows11/Square44x44Logo.targetsize-16.png",
      "assets/windows11/Square44x44Logo.targetsize-20.png",
      "assets/windows11/Square44x44Logo.targetsize-24.png",
      "assets/windows11/Square44x44Logo.targetsize-256.png",
      "assets/windows11/Square44x44Logo.targetsize-30.png",
      "assets/windows11/Square44x44Logo.targetsize-32.png",
      "assets/windows11/Square44x44Logo.targetsize-36.png",
      "assets/windows11/Square44x44Logo.targetsize-40.png",
      "assets/windows11/Square44x44Logo.targetsize-44.png",
      "assets/windows11/Square44x44Logo.targetsize-48.png",
      "assets/windows11/Square44x44Logo.targetsize-60.png",
      "assets/windows11/Square44x44Logo.targetsize-64.png",
      "assets/windows11/Square44x44Logo.targetsize-72.png",
      "assets/windows11/Square44x44Logo.targetsize-80.png",
      "assets/windows11/Square44x44Logo.targetsize-96.png",
      "assets/windows11/StoreLogo.scale-100.png",
      "assets/windows11/StoreLogo.scale-125.png",
      "assets/windows11/StoreLogo.scale-150.png",
      "assets/windows11/StoreLogo.scale-200.png",
      "assets/windows11/StoreLogo.scale-400.png",
      "assets/windows11/Wide310x150Logo.scale-100.png",
      "assets/windows11/Wide310x150Logo.scale-125.png",
      "assets/windows11/Wide310x150Logo.scale-150.png",
      "assets/windows11/Wide310x150Logo.scale-200.png",
      "assets/windows11/Wide310x150Logo.scale-400.png",
    ];
  }
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.addAll([
        ...platformAssets,
        "/",
        "gifs",
        "texts",
        "assets/css/common.css",
        "assets/js/notification.js",
      ]);
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
