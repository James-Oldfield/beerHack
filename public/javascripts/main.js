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

		food = data;
		drawFood(food);

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
	console.log(food);
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
			if (map < 0) {
				map = map - 10;
			}
			document.getElementById('moviePosterTitle').innerHTML = h1;
			imageDiv.src = 'http://image.tmdb.org/t/p/w500' + movies[i].poster_path;
		}
	}
	$('#movieTitles').css('display', 'none');

		var beerIndex;
		var beerArray = [];

		// Initial comparison
		for (var i=0; i<beers.length; i++) {
			if ((map-0.2 <= beers[i].abv && map+0.2 >= beers[i].abv)
				&& (!beers[i].flavorProfile == "")) {
				beerIndex = i;
				beerArray.push(i);
			} 
		}

		// NEED TO REMOVE DUPLICATES
		// second comparison
		if (beerIndex == undefined /*|| beerArray.length < 3*/) {
			for (var i=0; i<beers.length; i++) {
				if ( ( map-0.5 <= beers[i].abv && map+0.5 >= beers[i].abv) 
				&& ( !beers[i].flavorProfile == "" ) ) {
					beerIndex = i;
					beerArray.push(i);
				} 
			}
		}

		// second comparison
		if (beerIndex == undefined /*|| beerArray.length < 3*/) {
			for (var i=0; i<beers.length; i++) {
				if ( ( map-0.75 <= beers[i].abv && map+0.75 >= beers[i].abv) 
				&& ( !beers[i].flavorProfile == "" ) ) {
					beerIndex = i;
					beerArray.push(i);
				} 
			}
		}

		// second comparison
		if (beerIndex == undefined || beerArray.length < 3) {
			for (var i=0; i<beers.length; i++) {
				if ( ( map-10 <= beers[i].abv && map+10 >= beers[i].abv) 
				&& ( !beers[i].flavorProfile == "" ) ) {
					beerIndex = i;
					beerArray.push(i);
				} 
			}
		}

	var beerTitle = beers[beerArray[0]].name;
	var beerImage = beers[beerArray[0]].imageUrl;

	document.getElementById('beerTitle').innerHTML = beerTitle;
	document.getElementById('beerImage').src = beerImage;

	socket.emit('whatFood', beers[beerArray[0]].flavorProfile);

}
