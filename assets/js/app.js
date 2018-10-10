if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/service-worker.js', { updateViaCache: 'imports' })
		.then(function () { console.log('Registered service worker!'); });
}

$(function () {
	$.get("https://raw.githubusercontent.com/evancohen/evancohen-io/master/_data/location.json", function (data) {
		if (data) {
			let locations = JSON.parse(data)
			$("#location-current").text(locations.current)
			$("#location-next").text(locations.next)
		}
	})
})
