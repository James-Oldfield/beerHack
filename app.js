var
  http         = require('http'),
  express      = require('express'),
  app          = express(),
  path         = require('path'),
  server       = http.createServer(app),
  io           = require('socket.io')(server),

  favicon      = require('serve-favicon'),
  logger       = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser   = require('body-parser'),

  routes       = require('./routes/index');

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

// SOCKET.IO CONNECTION
io.on('connection', function (socket) {
  io.emit('token', token);
});

// Save the access token
function saveToken(error, result) {
  if (error) { console.log('Access Token Error', error.message); }
  token = oauth2.accessToken.create(result);
  io.emit('token', token);
};

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