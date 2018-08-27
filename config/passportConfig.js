// Use env variables
require('dotenv').config();

// require needed modules
var passport = require('passport');
var passportFacebookStrategy = require('passport-facebook').Strategy;
var passportLocalStrategy = require('passport-local').Strategy;

// declare variables
var db = require('../models');

// provide serialize/ deserialize function so we can use session
passport.serializeUser(function(user, callback){
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
  db.user.findById(id).then(function(user){
    callback(null, user);
  }).catch(function(err){
    callback(err, null);
  });
});

// Do the actual work logging in part
passport.use(new passportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, callback){
  db.user.findOne({
    where: {email: email}
  }).then(function(foundUser){
    if(!foundUser || !foundUser.isValidPassword(password)){
      callback(null, null);
    }
    else {
      callback(null, foundUser);
    }
  }).catch(function(err){
    callback(err, null);
  })
}));

passport.use(new passportFacebookStrategy({
  clientID: process.env.FB_APP_ID,
  clientSecret: process.env.FB_APP_SECRET,
  callbackURL: process.env.BASE_URL + '/auth/callback/facebook',
  profileFields: ['id', 'email', 'displayName'],
  enableProof: true
}, function(accessToken, refreshToken, profile, done){
  // See if we have email address we can use for identifying user
  var facebookEmail = profile.emails ? profile.emails[0].value : null;
  // See if the email exists in the users table
  db.user.findOne({
    where: {email: facebookEmail}
  }).then(function(existingUser){
    if(existingUser && facebookEmail){
      // This user is a returning user - update facebookId and token
      existingUser.updateAttributes({
        facebookId: profile.id,
        facebookToken: accessToken
      }).then(function(updatedUser){
        done(null, updatedUser);
      }).catch(done);
    }
    else {
      // The person is a new user, so create an entry for them in the users table
      // Parse the users Name
      var usernameArr = profile.displayName.split(' ');
      db.user.findOrCreate({
        where: {facebookId: profile.id},
        defaults: {
          facebookToken: accessToken,
          email: facebookEmail,
          firstname: usernameArr[0],
          lastname: usernameArr[usernameArr.length - 1],
          admin: false,
          image: 'https://graph.facebook.com/' + profile.id + '/picture?type=square',
          dob: profile.birthday
        }
      }).spread(function(user, wasCreated){
        if(wasCreated){
          // This was expected
          done(null, user);
        }
        else{
          // This user was not new after all. This could happen if the user changed their
          // email since they signedup
          user.facebookToken = accessToken;
          user.email = facebookEmail;
          user.save().then(function(updatedUser){
            done(null, updatedUser)
          }).catch(done);
        }
      })
    }
  })
}));

module.exports = passport;
