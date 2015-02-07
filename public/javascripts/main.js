$.ajax({
  type: 'GET',
  url: 'https://api.foodily.com/v1/beerLookup?name=budweiser&zone=EUR&limit=50',
  dataType: 'jsonp',
  success: function(data){
    console.log(data);
  }
});