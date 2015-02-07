var socket = io('localhost:3000');

// SOCKET CONNECTION
socket.on('helloClient', function (data) {
	console.log(data);	

	// Send hello to Node
	socket.emit('helloNode', 'Hello Node!');

	// On submit emit to server
	// $('#beerSubmit').on('click', function () {
	// 	var enteredBeer = document.getElementById('beerInput').value;
	// 	socket.emit('whatBeer', enteredBeer);
	// });

	// On submit emit to server
	$('#movieSubmit').on('click', function () {
		var enteredMovie = document.getElementById('movieInput').value;
		socket.emit('whatMovie', enteredMovie);
	});

	socket.on('thisMovie', function (data) {
		var element = document.createElement('img');
		element.src = 'http://image.tmdb.org/t/p/w500' + data;

		var currentDiv = document.getElementById('moviePosters');
		document.body.insertBefore(element, currentDiv);
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
