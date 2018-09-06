// Require express
var express = require('express');

// Declare a new router
var router = express.Router();

var db = require('../models');

// Get the authorization helper function
var loggedIn = require('../middleware/loggedIn')

router.get('/workouts', loggedIn, function(req, res){
  db.workout.findAll().then(function(allWorkouts){
  res.render('workout/workouts', {workouts: allWorkouts});
}).catch(function(err){
  res.render('error')
})
});

router.get('/add', loggedIn, function(req, res){
  res.render('workout/add');
});

router.post('/workouts', loggedIn, function(req, res){
  console.log("!!!!!!!!!!!>>>>>>>", req.body)
  db.workout.create(req.body).then(function(createdWorkout){
    db.workout.findAll().then(function(allWorkouts){
    res.render('workout/workouts', {workouts: allWorkouts});
  }).catch(function(err){
    res.render('error')
  });
});
});





router.get('/edit/:id', loggedIn, function(req, res){
  db.workout.findById(req.params.id).then(function(foundWorkout){
    res.render('workout/edit', {workout: foundWorkout});
  })

});

router.put('/edit/:id', loggedIn, function(req, res){
  db.workout.update({
    name: req.body.name,
    weight: req.body.liftedweight,
    sets: req.body.sets,
    reps: req.body.reps
  }, {
    where: {
      id: req.params.id
      }
  }).then(function(user){
    res.send('/workout/workouts');
  })
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

// router.get('/workouts/:id', function(req, res){
//   db.workout.findById(req.params.id).then(function(foundWorkout){
//     res.send(foundWorkout);
//   }).catch(function(err){
//     console.log('err', err);
//     res.render('404');
//   });
// });

// router.delete('/workouts/:id', function(req, res){
//   console.log('delete data', req.params.id)
//   db.workout.destroy({
//     where: { id: req.params.id }
//   }).then(function(recentlyDestroyed){
//     console.log('deleted:', recentlyDestroyed);
//     res.send('succesfully deleted');
//   }).catch(function(err){
//     console.log('err', err);
//     res.send('sad fail');
//   });
// });
router.delete('/workouts/:id', loggedIn, function(req, res){
  db.workout.destroy({
  where: { id: req.params.id }
}).then(function() {
  res.send('/workout/workouts');
  })
});

module.exports = router;
