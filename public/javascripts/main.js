var socket = io('localhost:3000');
var accessToken;

socket.on('token', function (data) {
	accessToken = data.token.access_token;
	var x = getData();
	console.log(x);
});

// function getData() {
// 	var xmlHttp = null;

// 	xmlHttp = new XMLHttpRequest();
//   xmlHttp.open( "GET", 'https://api.foodily.com/v1/beerLookup?name=budweiser&zone=EUR&limit=50', false );
//   xmlHttp.setRequestHeader( 'Authorization', 'Bearer ' + accessToken );
//   xmlHttp.send( null );

//   xmlhttp.onreadystatechange=function() {
//   if (xmlhttp.readyState==4 && xmlhttp.status==200) {
//     // do stuff here
//   return xmlHttp.responseText;
//   }
// }
// }

function getData() {
	// $.ajaxSetup({
	// 	headers: { 'Authorization' : 'Bearer ' + accessToken }
	// });
	$.ajax({
		headers: { 'Authorization' : 'Bearer ' + accessToken },
	  type: 'GET',
	  url: 'https://api.foodily.com/v1/beerLookup?name=budweiser&zone=EUR&limit=50',
	  dataType: 'jsonp',
	  success: function(data) {
	    console.log(data);
	  }
	});
}