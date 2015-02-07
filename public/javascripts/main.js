var socket = io('localhost:3000');

socket.on('news', function (data) {
	console.log(data);	
	socket.emit('other', 'other');
});

// On submit
$('#beerSubmit').on('click', function () {
	var enteredBeer = document.getElementById('beerInput').value;
	console.log(enteredBeer);
});



// socket.on('token', function (data) {
// 	accessToken = data.token.access_token;
// 	var x = getData(accessToken);
// 	console.log(x);
// });
