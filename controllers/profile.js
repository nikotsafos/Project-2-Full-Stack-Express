// Require express
var express = require('express');

// Declare a new router
var router = express.Router();

var db = require('../models');

// Get the authorization helper function
var loggedIn = require('../middleware/loggedIn')

// Define routes

router.get('/', loggedIn, function(req, res){
  console.log('rendering profile');
  res.render('profile/index');
});

// router.get('/edit', loggedIn, function(req, res){
//   console.log("yowhat!!__------", req.body)
//   db.user.findById(req.params.id).then(function(foundUser){
//     res.render('profile/edit', {user: foundUser});
//   }).catch(function(err){
//     res.render('error');
//   })
// });

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

// router.put('/profile/:id', loggedIn, function(req, res){
//   console.log('BODY', req.body);
//   console.log('PARAMS.ID', req.params.id);
//   db.user.update({
//     body: req.body
//   }, {
//     where: {
//       id: req.params.id
//     }
//   }).then(function(user){
//     res.render('profile');
// })
//
// });


// router.put]('/edit', loggedIn, function(req, res){
//   res.send(req.body);
// });




module.exports = router;
