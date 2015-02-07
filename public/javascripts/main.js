var socket = io('localhost:3000');

socket.on('helloClient', function (data) {
	console.log(data);	

	// Send hello to Node
	socket.emit('helloNode', 'Hello Node!');

	// On submit emit to server
	$('#beerSubmit').on('click', function () {
		var enteredBeer = document.getElementById('beerInput').value;
		socket.emit('whatBeer', enteredBeer);
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
