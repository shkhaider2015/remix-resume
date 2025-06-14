self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("shakeel-haider-cache").then((cache) => {
        return cache.addAll(["/offline.html?v=2"]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      fetch(event.request).catch(() => {
        if(event.request.mode === "navigate") {
          return caches.match("/offline.html?v=2");
        }
      })
    );
  });
  