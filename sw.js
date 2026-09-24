const CACHE_NAME = 'wispend-cache-v1';
const urlsToCache = [
  'dashboard.html',
  'transactions.html',
  'invoices.html',
  'reports.html',
  'history.html',
  'profile.html'
];

// 安装时缓存核心页面
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 拦截请求，确保用户总是能用上最新代码，同时支持离线
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
