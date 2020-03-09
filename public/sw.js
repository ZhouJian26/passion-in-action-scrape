importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  workbox.routing.registerRoute(
    "/api/courses",
    new workbox.strategies.CacheFirst({
      cacheName: "data-course",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 512,
          maxAgeSeconds: 60 * 60 // 1 ora
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );
  workbox.routing.registerRoute(
    "/",
    new workbox.strategies.StaleWhileRevalidate({
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
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "app-public-file",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );
}
