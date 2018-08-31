// Require express
var express = require('express');

// Declare a new router
var router = express.Router();

var db = require('../models');

// Get the authorization helper function
var loggedIn = require('../middleware/loggedIn')

// Define routes
//
router.get('/', loggedIn, function(req, res){
  res.render('profile/index');
});

router.get('/addworkout', loggedIn, function(req, res){
  res.render('profile/addworkout');
});

router.get('/edit', loggedIn, function(req, res){
  res.render('profile/edit');
});

router.put('/profile/edit', loggedIn, function(req, res){
  res.send(req.body);
});

router.post('profile/workouts', loggedIn, function(req, res){
  res.render('profile/workouts');
});

router.get('/workouts', loggedIn, function(req, res){
  db.workout.findAll().then(function(allWorkouts){
  res.render('profile/workouts', {workouts: allWorkouts});
}).catch(function(err){
  res.render('error')
})
});


module.exports = router;
