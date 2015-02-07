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

// Get the access token object for the client
oauth2.client.getToken({}, saveToken);

// OAuth Token
var token;

// On initial connection
io.on('connection', function (socket) {
  socket.emit('news', 'hello from node');
  socket.on('other', function (data) {
    console.log('hi from client');
  });
});



// Save the access token
function saveToken(error, result) {
  if (error) { console.log('Access Token Error', error.message); }
  token = oauth2.accessToken.create(result);
  hitApi(token.token.access_token);
  // console.log(token.token.access_token);
};

function hitApi(token) {
  var options = {
    host: 'api.foodily.com',
    path: '/v1/beerLookup?&zone=EUR',
    headers: { 'Authorization' : 'Bearer ' + token }
  };

  http.get(options, function(resp){
    resp.on('data', function(chunk){
      var obj = JSON.parse(chunk);
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