import os, hashlib
S = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'site')
files = []
for root, _, fs in os.walk(S):
    for f in fs:
        p = os.path.relpath(os.path.join(root, f), S)
        if p in ('sw.js',) or p.startswith('.'): continue
        files.append(p.replace(os.sep, '/'))
files.sort()
h = hashlib.sha1()
for p in files: h.update(open(os.path.join(S, p), 'rb').read())
ver = h.hexdigest()[:10]
assets = ['./'] + ['./' + p for p in files]
sw = """const V = 'mf-%s';
const ASSETS = %s;
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
""" % (ver, repr(assets).replace("'", '"'))
open(os.path.join(S, 'sw.js'), 'w').write(sw)
print('sw', ver, len(files), 'archivos')
