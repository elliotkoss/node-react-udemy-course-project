const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//1 input means we're pulling from mongo
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done( null, user.id);
});

passport.deserializeUser((id, done) => { 
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy( {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        //console.log('access token', accessToken);
        //console.log('refresh token', refreshToken);
        //console.log('profile', profile);

        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    //already have record with given profileId 
                    console.log('user %s already has profile', profile.id);   
                    //function (err, record)  
                    done(null, existingUser);      
                } else {
                    //don't have profileId record, make new one
                    new User({ googleId: profile.id})
                        .save()
                        .then((user) => done(null, user));

                }                
            });        
    })
);