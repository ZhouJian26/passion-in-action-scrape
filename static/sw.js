importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  workbox.routing.registerRoute(
    "/api/dataFetch.js",
    new workbox.strategies.NetworkFirst({
      cacheName: "data-course",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );
  workbox.routing.registerRoute(
    "/",
    new workbox.strategies.NetworkFirst({
      cacheName: "app",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );
  workbox.routing.registerRoute(
    /static/,
    new workbox.strategies.CacheFirst({
      cacheName: "app-static-file",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 32,
          maxAgeSeconds: 60 * 60 * 24 * 365 // 365 giorni
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );
}
