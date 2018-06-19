const APP_CACHE_NAME = 'evancohen-io-app';
const STATIC_CACHE_NAME = 'evancohen-io-static';

console.log(`installing sw.js`);

const CACHE_STATIC = [
    '/assets/css/style.css',
    '/assets/images/bullet.png',
    '/assets/images/nav-bg.gif',
    '/assets/images/hr.gif'
 ];

 const CACHE_APP = [
    '/',
    '/index.html',
 ];

self.addEventListener('install',function(e){
    e.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE_NAME),
            caches.open(APP_CACHE_NAME),
            self.skipWaiting()
          ]).then(function(storage){
            var static_cache = storage[0];
            var app_cache = storage[1];
            return Promise.all([
              static_cache.addAll(CACHE_STATIC),
              app_cache.addAll(CACHE_APP)]);
        })
    );
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then(function(keyList) {
                return Promise.all(
                    keyList.map(function(key) {
                        if (key !== APP_CACHE_NAME && key !== STATIC_CACHE_NAME) {
                            console.log('deleting', key);
                            return caches.delete(key);
                        }
                    })
                );
            })
        ])
    );
});

this.addEventListener('fetch', function(event) {
    console.log('Fetch event fired.', event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				console.log('Retrieving from cache...');
				return response;
			}
			console.log('Retrieving from URL...');
			return fetch(event.request).catch(function(event){
				console.log('Fetch request failed!');
			});
		})
	);
});