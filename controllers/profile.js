// Require express
var express = require('express');

// Declare a new router
var router = express.Router();

var db = require('../models');

// Get the authorization helper function
var loggedIn = require('../middleware/loggedIn')

// Define routes

router.get('/', loggedIn, function(req, res){
  res.render('profile/index');
});


router.get('/edit/:id', loggedIn, function(req, res){
  res.render('profile/edit');
});

router.put('/edit/:id', loggedIn, function(req, res){
  db.user.update({
    image: req.body.image,
    weight: req.body.weight,
    height: req.body.height,
    dob: req.body.dob
  }, {
    where: {
      id: req.params.id
      }
  }).then(function(user){
    res.send('/profile');
  })
});




module.exports = router;
