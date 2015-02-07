var express    = require('express'),
		http       = require('http'),
		router     = express.Router(),
		movieQuery = 'jaws',
	  io         = require('socket.io'),
		RTApiKey   = '9q6akghmjx4gzbs35adrzp6z';

/* GET home page. */
router.get('/', function(req, res) {
var test = req.app.get('movieObject');
  res.render('index', { 
  	title: 'Express'
  });
});

module.exports = router;
