if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/service-worker.js', { updateViaCache: 'imports' })
		.then(function () { console.log('Registered service worker!'); });
}