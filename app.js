var
  fs           = require('fs'),
  http         = require('http'),
  express      = require('express'),
  app          = express(),
  path         = require('path'),
  server       = http.createServer(app),
  io           = require('socket.io')(server),
  cors         = require('cors'),

  favicon      = require('serve-favicon'),
  logger       = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser   = require('body-parser'),

  routes       = require('./routes/index');

  // use CORS
  app.use(cors());

  // Listen on port 3000
  server.listen(process.env.PORT || 3000, function () {
    console.log('listening on port 3000');
  });

var oauth2 = require('simple-oauth2')({
  clientID: 'ab-65',
  clientSecret: 'aOMnJ5z0RpfkNHRi',
  site: 'https://api.foodily.com',
  tokenPath: '/v1/token'
});

// OAuth Token
var token, keyword, obj, returnBeerData, returnMovieData;

// On initial connection
io.on('connection', function (socket) {
  socket.emit('helloClient', 'Hello client!');

  // Send hello to client
  socket.on('helloNode', function (data) {
    console.log(data);
  });

  // ON CLIENT beer
  socket.on('whatBeer', function (data) {
    console.log(data);

    // store the entered value in keyword var
    keyword = data;

    // Get the access token object for the client
    oauth2.client.getToken({}, saveToken);

    returnBeerData = function(obj) {
      socket.emit('thisBeer', obj);
    }
  });

 // ON CLIENT movie
  socket.on('whatMovie', function (data) {
    hitMovieApi(data);

    returnMovieData = function (obj) {
      socket.emit('thisMovie', obj);
      console.log('returned');
    }
  });
});

// Save the access token
function saveToken(error, result) {
  if (error) { console.log('Access Token Error', error.message); }
  token = oauth2.accessToken.create(result);
  hitApi(token.token.access_token, keyword);
};

// Hit the beer API
function hitApi(token, keyword) {
  var options = {
    host: 'api.foodily.com',
    path: '/v1/beerLookup?name=' + keyword + '&zone=EUR',
    headers: { 'Authorization' : 'Bearer ' + token }
  };

  http.get(options, function(resp) {
    resp.on('data', function(chunk) {
      obj = JSON.parse(chunk);
      console.log(obj);
      // return the object
      returnBeerData(obj);
    });
  }).on('error', function(e){
    console.log("Error: " + e.message); 
    console.log( e.stack );
  });
}

// Hit the RT API
function hitMovieApi(movieQuery) {
  RTApiKey = '26c5cdc6064e67ecfea591598675b0ea';

  var options = {
    host: 'api.themoviedb.org',
    path: '/3/search/movie?api_key=' + RTApiKey + '&query='+ movieQuery
  };

  http.get(options, function(resp) {
    resp.on('data', function(chunk) {
      var obj = JSON.parse(chunk);
      var poster = obj.results[0].poster_path;

      returnMovieData(poster);
    });
  }).on('error', function(e){
    console.log("Error: " + e.message); 
    console.log( e.stack );
  });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.set('testlol', 'testlol');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;