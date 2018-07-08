---
    layout: null
---
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

// Use offline Google Analytics
workbox.googleAnalytics.initialize();

workbox.precaching.precacheAndRoute([
    "{{ '/assets/css/style.css?v=' | append: site.github.build_revision | relative_url }}",
    { url: '/', revision: '{{ site.github.build_revision }}' }
]);

// Cache manifest
workbox.routing.registerRoute(
    "/manifest.json",
    workbox.strategies.staleWhileRevalidate(),
);

// Cache CSS and JavaScript
workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    workbox.strategies.staleWhileRevalidate(),
);

// Cache images
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images-cache'
    })
);