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

router.get('/profile/:id', loggedIn, function(req, res){
  res.render('profile/edit');
});


router.put('/profile/:id', loggedIn, function(req, res){
  console.log('BODY', req.body);
  console.log('PARAMS.ID', req.params.id);
  db.user.update({
    body: req.body
  }, {
    where: {
      id: req.params.id
    }
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

// db.user.update({
//   lastName: 'Taco'
// }, {
//   where: {
//     firstName: 'Brian'
//   }
// }).then(function(user) {
//   // do something when done updating
// });


// router.put]('/edit', loggedIn, function(req, res){
//   res.send(req.body);
// });

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



// router.delete()
// router.post('/workouts', function(req, res){
//   db.workout.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function() {
//     res.render('/workouts');
//   })
//
// });

router.get('workouts/:id', function(req, res){
  db.workout.findById(req.params.id).then(function(foundWorkout){
    res.send(foundWorkout);
  }).catch(function(err){
    console.log('err', err);
    res.render('404');
  });
});

router.delete('/workouts/:id', function(req, res){
  db.workout.destroy({
    where: { id: req.params.id }
  }).then(function(recentlyDestroyed){
    console.log('deleted:', recentlyDestroyed);
    res.send('succesfully deleted');
  }).catch(function(err){
    console.log('err', err);
    res.send('sad fail');
  });
});


module.exports = router;
