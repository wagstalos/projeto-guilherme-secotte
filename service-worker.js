const CACHE_NAME = "v3";
const URLS_TO_CACHE = [
  "/img/icons/maskable_icon_x192.webp",
  "/img/perfil.webp",
  "/img/maps.jpg",
  "/img/cerebro.webp",
  "/img/consultorio.webp",
  "/img/guilherme.png",
  "/img/senior.webp",
  "/img/family.webp",
  "/img/thumb.webp",
  "/img/img3.webp",
  "/img/tag.svg",
  "/img/tag2.svg",
  "/img/icon-brain.svg",
  "/img/arrow.svg",
  "/img/icon-online.svg",
  "/img/icon-heart.svg",
  "/img/icon-mestre.svg",
  "/img/check.svg",
  "/js/plugins.js",
  "/js/all.js",
  "/css/main.css",
  "/css/plugins.css",
];

// Instala o Service Worker e adiciona os arquivos ao cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Abrindo cache");
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Ativa o Service Worker e limpa caches antigos
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Removendo cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta as requisições de rede e serve do cache quando possível
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o recurso do cache, ou faz uma requisição de rede
      return response || fetch(event.request);
    })
  );
});
