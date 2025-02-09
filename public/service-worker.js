const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_FILES = [
  './',             // Root URL
  './index.html',   // Main HTML file
  './manifest.json', // Manifest file
];

// Install event - Cache the offline files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching offline files...');
      return cache.addAll(OFFLINE_FILES);
    })
  );
});

// Activate event - Cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      console.log('Offline: Unable to fetch:', event.request.url);
    })
  );
});
