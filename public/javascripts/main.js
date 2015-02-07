var socket = io('localhost:3000');
var titles;

// SOCKET CONNECTION
socket.on('helloClient', function (data) {

	// Send hello to Node
	socket.emit('helloNode', 'Hello Node!');
	console.log(data);	

	// On submit emit to server
	// $('#beerSubmit').on('click', function () {
	// 	var enteredBeer = document.getElementById('beerInput').value;
	// 	socket.emit('whatBeer', enteredBeer);
	// });

	// On submit emit to server
	$("#movieInput").change(function () {
		var enteredMovie = escape(document.getElementById('movieInput').value);
		socket.emit('whatMovie', enteredMovie);
	});

	socket.on('thisMovie', function (data) {

		titles = data;
		drawTitles(titles);

		console.log(titles);

		// var element = document.createElement('img');
		// element.src = 'http://image.tmdb.org/t/p/w500' + data;
		// var currentDiv = document.getElementById('moviePosters');
		// currentDiv.appendChild(element);

	});

	socket.on('thisBeer', function (data) {
		for (var i=0; i < data.beers.length; i++) {
			var element = document.createElement('div');
			var content = document.createTextNode(data.beers[i].name);
			element.appendChild(content);

			var currentDiv = document.getElementById('test');
			document.body.insertBefore(element, currentDiv);
			// document.getElementById('test').innerHTML = data.beers[i].name;
			console.log(data.beers[i].name);
		}
	});
});

function drawTitles(titles) {
		for (var i=0; i<titles.length; i++) {
			var element = document.createElement('div');
			element.innerHTML = titles[i].title;
			var currentDiv = document.getElementById('movieTitles');
			currentDiv.appendChild(element);
		}
}