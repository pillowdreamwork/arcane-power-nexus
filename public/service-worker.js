const CACHE_NAME = 'arcane-power-nexus-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/fonts/symbola.ttf'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip API requests (let them go to network)
  if (url.pathname.includes('/api/') || url.pathname.includes('/auth/')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache static assets and pages
            if (
              request.method === 'GET' && 
              (url.pathname.endsWith('.js') || 
               url.pathname.endsWith('.css') || 
               url.pathname.endsWith('.png') || 
               url.pathname.endsWith('.jpg') || 
               url.pathname.endsWith('.jpeg') || 
               url.pathname.endsWith('.svg') ||
               url.pathname.endsWith('.woff') ||
               url.pathname.endsWith('.woff2') ||
               url.pathname === '/' ||
               !url.pathname.includes('.'))
            ) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
            }

            return response;
          })
          .catch((error) => {
            console.log('Service Worker: Fetch failed', error);
            
            // Return a fallback response for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/');
            }
            
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'error-reporting') {
    event.waitUntil(
      // Send queued error reports when back online
      sendQueuedErrorReports()
    );
  }
});

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New spiritual insight available',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Arcane Power Nexus', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});

// Helper function to send queued error reports
async function sendQueuedErrorReports() {
  try {
    // This would implement logic to send any queued error reports
    // when the device comes back online
    console.log('Service Worker: Sending queued error reports');
  } catch (error) {
    console.error('Service Worker: Failed to send error reports', error);
  }
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_MARK') {
    console.log('Service Worker: Performance mark received', event.data.mark);
  }
});

console.log('Service Worker: Script loaded successfully');
