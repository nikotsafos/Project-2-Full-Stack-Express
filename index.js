// Require .env files variables
require('dotenv').config();

// require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var passport = require('./config/passportConfig');
var session = require('express-session');
var flash = require('connect-flash');
var request = require('request');
var moment = require('moment');

// declare app variable
var app = express();

// set amd use statements
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware -- fun
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.currentUserId = req.id;
  res.locals.alerts = req.flash();
  res.locals.moment = moment;
  next();
});

// Include controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));



// define routes
// app.get('/', function(req, res){
//   res.render('home');
// });

app.get('/', function(req, res) {
  var exerciseUrl = 'https://wger.de/api/v2/exercise/?limit=199&language=2&status=2';
  // Use request to call the API
  request(exerciseUrl, function(error, response, body) {
    var exercise = JSON.parse(body).results;
    res.render('home', { exercise: exercise });
  });
});

// listen on port 3000
app.listen(process.env.PORT || 3000);
