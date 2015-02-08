var socket = io('localhost:3000');
var movies;

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

	// if movie titled has been clicked
	$('#movieTitles').on('click', function(data) {
		// Open the movie poster
		openMoviePoster(data.toElement.innerHTML);
	});

	// on movie enter
	socket.on('thisMovie', function (data) {

		movies = data;
		drawTitles(movies);

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

function drawTitles(movies) {
		for (var i=0; i<movies.length; i++) {
			var element = document.createElement('div');
			element.innerHTML = movies[i].title;
			var currentDiv = document.getElementById('movieTitles');
			currentDiv.appendChild(element);
		}
}

function openMoviePoster(title) {
	var imageDiv = document.getElementById('moviePoster');
	for (var i=0; i<movies.length; i++) {
		if (movies[i].title == title) {
			imageDiv.src = 'http://image.tmdb.org/t/p/w500' + movies[i].poster_path;
		}
	}
}