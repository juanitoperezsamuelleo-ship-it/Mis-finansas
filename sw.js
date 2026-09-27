const V = 'mf-4a1729195d';
const ASSETS = ["./", "./app.css", "./app.js", "./config.js", "./fonts/archivo-latin-wght-italic.woff2", "./fonts/archivo-latin-wght-normal.woff2", "./fonts/bricolage-grotesque-latin-wght-normal.woff2", "./fonts/fraunces-latin-full-italic.woff2", "./fonts/fraunces-latin-full-normal.woff2", "./fonts/instrument-sans-latin-wght-italic.woff2", "./fonts/instrument-sans-latin-wght-normal.woff2", "./fonts/manrope-latin-wght-normal.woff2", "./fonts/nunito-latin-wght-italic.woff2", "./fonts/nunito-latin-wght-normal.woff2", "./fonts/sora-latin-wght-normal.woff2", "./fonts/unbounded-latin-wght-normal.woff2", "./icons/apple-touch-icon.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./index.html", "./manifest.webmanifest", "./security.js", "./vendor/htm.mjs", "./vendor/preact.mjs", "./vendor/supabase.js", "./view.js"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request).then((res) => {
    if (res.ok) { const cp = res.clone(); caches.open(V).then((c) => c.put(e.request, cp)); }
    return res;
  }).catch(() => caches.match('./index.html'))));
});
