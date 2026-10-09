const C="rq-v4",A=["./","index.html","manifest.json","icon-192.png","icon-512.png"],F="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Amiri&family=Noto+Naskh+Arabic&family=Scheherazade+New&family=Noto+Sans+Arabic&display=swap";
self.addEventListener("install",e=>{e.waitUntil((async()=>{const c=await caches.open(C);await Promise.all(A.map(u=>c.add(u).catch(()=>{})));
try{const r=await fetch(F),t=await r.clone().text();await c.put(F,r);const us=[...new Set([...t.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]))];await Promise.all(us.map(u=>fetch(u).then(x=>c.put(u,x)).catch(()=>{})))}catch(x){}})());self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!="GET")return;
e.respondWith((async()=>{const c=await caches.open(C),m=await c.match(q,{ignoreVary:true,ignoreSearch:q.mode=="navigate"}),
n=fetch(q).then(r=>{if(r&&(r.ok||r.type=="opaque"))c.put(q,r.clone());return r}).catch(()=>null);
if(m){e.waitUntil(n);return m}
const r=await n;if(r)return r;
if(q.mode=="navigate")return(await c.match("index.html"))||(await c.match("./"))||Response.error();
return Response.error()})())});
