const V="momentum-v2",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
if(r.method!="GET")return;
if(u.origin!=location.origin&&!["cdn.jsdelivr.net","fonts.googleapis.com","fonts.gstatic.com"].includes(u.hostname))return;
if(u.origin==location.origin&&(r.mode=="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith("index.html"))){
e.respondWith(fetch(u.href,{cache:"no-store"}).then(n=>{if(n.ok){const c=n.clone();caches.open(V).then(x=>x.put(r,c))}return n}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));return}
e.respondWith(caches.open(V).then(c=>c.match(r).then(m=>{const f=fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}).catch(()=>m);return m||f})))});
