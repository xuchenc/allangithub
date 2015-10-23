if(process.env.NODE_ENV !== 'production'){
	require('dotenv').load();
}
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8888;
var passport = require('passport');
var mongoose = require('mongoose');
require('./models/User');
require('./models/GroupPost');
require('./models/Movie');
require('./config/passport');

//mongoose.connect("mongodb://localhost/VoteApp");
//mongoose.connect("mongodb://allancai:123123@ds043324.mongolab.com:43324/allandatabase");
mongoose.connect(process.env.MONGO_STRING);

app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

var movieRoutes = require('./routes/movieRoutes');
var userRoutes = require('./routes/userRoutes');

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

app.use('/api/movie', movieRoutes);
app.use('/api/users', userRoutes);

app.use(function(err,req,res,next){
	console.log(err);
	res.status(400).send(err);
});

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});
