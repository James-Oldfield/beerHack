var socket = io('localhost:3000');
var movies;

// SOCKET CONNECTION
socket.on('helloClient', function (data) {

	// Send hello to Node
	socket.emit('helloNode', 'Hello Node!');
	console.log(data);	

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
			var h1 = document.createElement('h1');
			var h3 = document.createElement('h3');

			h1.innerHTML = movies[i].title;
			h3.innerHTML = movies[i].release_date.slice(0, -6);
			var currentDiv = document.getElementById('movieTitles');

			currentDiv.appendChild(h1);
			currentDiv.appendChild(h3);
		}
}

function openMoviePoster(title) {
	var imageDiv = document.getElementById('moviePoster');
	for (var i=0; i<movies.length; i++) {
		if (movies[i].title == title) {
			var h1 = movies[i].title;
			document.getElementById('moviePosterTitle').innerHTML = h1;
			imageDiv.src = 'http://image.tmdb.org/t/p/w500' + movies[i].poster_path;
		}
	}
	$('#movieTitles').css('display', 'none');
}