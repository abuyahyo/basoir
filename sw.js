// Basaair PWA service worker.
//
// Strategy is chosen per request type so that updates reach returning
// users automatically — no manual cache-clearing and no need to bump a
// version string on every deploy:
//
//   * Navigations + data.json  -> network-first
//       Online users always get the freshest index.html / content, and
//       fall back to cache only when offline.
//   * Other same-origin assets -> stale-while-revalidate
//       (icons, manifest) served instantly from cache, then refreshed in
//       the background so a later visit picks up any change.
//
// CACHE is still versioned, but only as a safety hatch: bumping it forces
// a clean slate. Day-to-day content changes no longer require it.
const CACHE = 'basaair-v2';
const PRECACHE = [
  './',
  './index.html',
  './data.json',
  './manifest.webmanifest',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c){ return c.addAll(PRECACHE); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; })
        .map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

// Allow the page to trigger an immediate activation of a waiting worker.
self.addEventListener('message', function(e){
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

function networkFirst(req){
  return fetch(req).then(function(res){
    if (res && res.ok && res.type === 'basic') {
      var copy = res.clone();
      caches.open(CACHE).then(function(c){ c.put(req, copy); });
    }
    return res;
  }).catch(function(){
    return caches.match(req).then(function(cached){
      // For navigations, fall back to the cached app shell if the exact
      // URL isn't cached (e.g. deep link opened offline).
      return cached || caches.match('./index.html') || caches.match('./');
    });
  });
}

function staleWhileRevalidate(req){
  return caches.match(req).then(function(cached){
    var fetching = fetch(req).then(function(res){
      if (res && res.ok && res.type === 'basic') {
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
      }
      return res;
    }).catch(function(){ return cached; });
    return cached || fetching;
  });
}

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  var isNavigation = req.mode === 'navigate';
  var isData = new URL(req.url).pathname.endsWith('/data.json')
            || new URL(req.url).pathname.endsWith('data.json');

  if (isNavigation || isData) {
    e.respondWith(networkFirst(req));
  } else {
    e.respondWith(staleWhileRevalidate(req));
  }
});
