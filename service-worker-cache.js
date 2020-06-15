var cacheName = 'wpak-app-71-20200615-033020';
var filesToCache = ['/',
'/debug.html',
'/vendor/jquery.velocity.js',
'/vendor/require.js',
'/vendor/underscore.js',
'/vendor/jquery.js',
'/vendor/text.js',
'/vendor/backbone.js',
'/vendor/async.js',
'/vendor/localstorage.js',
'/index.html',
'/lang/theme-messages.js',
'/core/messages.js',
'/core/app-dynamic-data.js',
'/core/phonegap/utils.js',
'/core/phonegap/geolocation.js',
'/core/theme-app.js',
'/core/lib/hooks.js',
'/core/lib/encryption/token.js',
'/core/lib/encryption/sha256.js',
'/core/lib/encryption/jsencrypt_LICENCE.txt',
'/core/lib/encryption/jsencrypt.js',
'/core/lib/parse-uri.js',
'/core/region-manager.js',
'/core/addons-internal.js',
'/core/models/custom-page.js',
'/core/models/navigation.js',
'/core/models/menu-items.js',
'/core/models/comments.js',
'/core/models/globals.js',
'/core/models/components.js',
'/core/models/items.js',
'/core/models/options.js',
'/core/stats.js',
'/core/launch.js',
'/core/app.js',
'/core/modules/comments.js',
'/core/modules/flags.js',
'/core/modules/authentication.js',
'/core/modules/persistent-storage.js',
'/core/modules/storage.js',
'/core/modules/deep-link.js',
'/core/css/debug.css',
'/core/views/custom-page.js',
'/core/views/comments.js',
'/core/views/backbone-template-view.js',
'/core/views/header.js',
'/core/views/layout.js',
'/core/views/head.js',
'/core/views/page.js',
'/core/views/menu.js',
'/core/views/single.js',
'/core/views/debug.js',
'/core/views/custom-component.js',
'/core/views/archive.js',
'/core/theme-tpl-tags.js',
'/core/addons.js',
'/core/app-utils.js',
'/core/router.js',
'/core/img/wpak-debug-close-off.svg',
'/core/img/wpak-lady-bug-light.svg',
'/core/img/wpak-debug-close-on.svg',
'/core/img/wpak-lady-bug-dark.svg',
'/themes/q-android/archive.html',
'/themes/q-android/icons/pwa-icon-192x192.png',
'/themes/q-android/icons/pwa-icon-48x48.png',
'/themes/q-android/icons/pwa-icon-144x144.png',
'/themes/q-android/icons/pwa-icon-96x96.png',
'/themes/q-android/icons/pwa-icon-512x512.png',
'/themes/q-android/archive-favorites.html',
'/themes/q-android/css/post-list.css',
'/themes/q-android/css/common.css',
'/themes/q-android/css/post-detail.css',
'/themes/q-android/js/velocity.min.js',
'/themes/q-android/js/functions.js',
'/themes/q-android/js/jquery.fitvids.js',
'/themes/q-android/js/moment.min.js',
'/themes/q-android/fonts/PT-Serif-Regular.ttf',
'/themes/q-android/layout.html',
'/themes/q-android/img/img-icon.svg',
'/themes/q-android/img/camera-icon.svg',
'/themes/q-android/img/menu-icon.svg',
'/themes/q-android/img/back-icon.svg',
'/themes/q-android/img/refresh-icon.svg',
'/themes/q-android/page.html',
'/themes/q-android/readme.md',
'/themes/q-android/single.html',
'/themes/q-android/head.html',
'/themes/q-android/menu.html',
'/themes/q-android/launch-content.html',
'/themes/q-android/launch-head.html',
'/themes/q-android/screenshot.jpg',
'/config.js'];

filesToCache = filesToCache.map( function( item ) {
	var subdir = location.pathname.replace( '/service-worker-cache.js', '' );
	return subdir + item;
} );

self.addEventListener( 'install', function ( e ) {
	console.log( '[WP-AppKit Service Worker] Install' );
	e.waitUntil(
		caches.open( cacheName ).then( function ( cache ) {
			console.log( '[WP-AppKit Service Worker] Caching app assets' );
			return cache.addAll( filesToCache );
		} )
	);
} );

self.addEventListener( 'activate', function ( e ) {
	console.log( '[WP-AppKit Service Worker] Activate' );
	e.waitUntil(
		caches.keys().then( function ( keyList ) {
			return Promise.all( keyList.map( function ( key ) {
				if ( key !== cacheName ) {
					console.log( '[WP-AppKit Service Worker] Removing old cache', key );
					return caches.delete( key );
				}
			} ) );
		} )
	);
	return self.clients.claim();
} );

self.addEventListener( 'fetch', function ( e ) {
	console.log( '[WP-AppKit Service Worker] Fetch', e.request.url );
	e.respondWith(
		caches.match( e.request ).then( function ( response ) {
			return response || fetch( e.request );
		} )
	);
} );


