var socket = io('localhost:3000');
var movies, movieScore, beers, map, food;

// SOCKET CONNECTION
socket.on('helloClient', function (data) {

	socket.emit('whatBeer', 'what Beer?');

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

	socket.on('thisFood', function (data) {

		// food = data;
		// drawFood(food);

	});

	socket.on('thisBeer', function (data) {
		beers = data.beers;
		console.log('beers loaded');
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

function drawFood (food) {
	// console.log(food);
	document.getElementById('recipe').innerHTML = food.recipePairings[0].pairings[0].type + " !!";
	document.getElementById('recipeLink').src = food.recipePairings[0].recipe.href;
	document.getElementById('recipeLink').innerHTML = "Get recipe!!;"

}


function openMoviePoster(title) {
	var imageDiv = document.getElementById('moviePoster');
	for (var i=0; i<movies.length; i++) {
		if (movies[i].title == title) {
			var h1 = movies[i].title;
			movieScore = movies[i].vote_average;
			map = 
			(movieScore - 3) * 10 / 6;
			map = 10 - map;
			if (map <= 0 || map >= 11) {
				map = 10;
			}
			console.log('map is ' + map);
			document.getElementById('moviePosterTitle').innerHTML = h1;
			imageDiv.src = 'http://image.tmdb.org/t/p/w500' + movies[i].poster_path;
		}
	}
	$('#movieTitles').css('display', 'none');

		var beerIndex;
		var beerArray = [];

	for (var i=0; i<beers.length; i++) {
		if (map-1 <= beers[i].abv && map+1 >= beers[i].abv) {
			console.log(i +' index');
			console.log(beers[i].abv + ' strenth');
			beerArray.push(i);
		}
	}

var obj = beers[beerArray[0]],
		beerTitle  = obj.name,
		beerRating = obj.abv,
		beerDesc   = obj.description,
		beerImage  = obj.imageUrl;

	beerRating = beerRating.toFixed(2);

	document.getElementById('beerTitle').innerHTML = beerTitle;
	document.getElementById('beerRating').innerHTML = beerRating + '% ABV';
	document.getElementById('beerDesc').innerHTML = beerDesc;
	document.getElementById('need').innerHTML = "YOU'LL BE NEEDING:";

	for ( var i=0; i<map.toFixed(0)-1; i++ ) {
		var img = document.createElement('img');
		var loc = document.getElementById('beerImages');
		loc.appendChild(img);

		img.src = beerImage;
	}

			var currentDiv = document.getElementById('movieTitles');

	socket.emit('whatFood', beers[beerArray[0]].flavorProfile);

}
