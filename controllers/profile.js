// Require express
var express = require('express');

// Declare a new router
var router = express.Router();

var db = require('../models');

// Get the authorization helper function
var loggedIn = require('../middleware/loggedIn')

// Define routes

console.log("yes, I did in fact make it to the right controller");

router.get('/', loggedIn, function(req, res){
  res.render('profile/index');
});

router.get('/addworkout', loggedIn, function(req, res){
  res.render('profile/addworkout');
});

// router.get('/edit', loggedIn, function(req, res){
//   console.log("yowhat!!__------", req.body)
//   db.user.findById(req.params.id).then(function(foundUser){
//     res.render('profile/edit', {user: foundUser});
//   }).catch(function(err){
//     res.render('error');
//   })
// });

router.get('/edit', loggedIn, function(req, res){
  db.user.update({
    image: req.image,
    weight: req.weight,
    height: req.height,
    dob: req.dob
  }).then(function(user){
    res.render('profile');
})

});

// db.user.update({
//   lastName: 'Taco'
// }, {
//   where: {
//     firstName: 'Brian'
//   }
// }).then(function(user) {
//   // do something when done updating
// });


router.put('/edit', loggedIn, function(req, res){
  res.send(req.body);
});

router.post('/workouts', loggedIn, function(req, res){
  console.log("!!!!!!!!!!!>>>>>>>", req.body)
  db.workout.create(req.body).then(function(createdWorkout){
    db.workout.findAll().then(function(allWorkouts){
    res.render('profile/workouts', {workouts: allWorkouts});
  }).catch(function(err){
    res.render('error')
  });
});
});


router.get('/workouts', loggedIn, function(req, res){
  db.workout.findAll().then(function(allWorkouts){
  res.render('profile/workouts', {workouts: allWorkouts});
}).catch(function(err){
  res.render('error')
})
});

router.get('/editworkouts', loggedIn, function(req, res){
  res.render('profile/editworkouts');
});


// router.get('/', function(req, res) {
//   var exerciseUrl = 'https://wger.de/api/v2/exercise/?limit=199&language=2&status=2';
//   // Use request to call the API
//   request(exerciseUrl, function(error, response, body) {
//
//     var exercise = JSON.parse(body).name;
//     res.render('home', { exercise: body });
//   });
// });





// router.delete()


module.exports = router;
