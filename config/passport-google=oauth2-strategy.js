const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User=require('../models/user');

//Telling passport to use google Auth service.
passport.use(new googleStrategy({
        clientID:"113265403388-4je0t0prjb9p73uhkjg44ddaf66sms0f.apps.googleusercontent.com",
        clientSecret : "v031nH2PyN3uPQuoicZwjc9I",
        callbackURL : "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error, in google startegy passport',err);return;}

            console.log(profile);

            if(user){
                // if found set this user as req.user
                return done(null,user);
            }else{
                // if not found create the user and set it as req.user(sign-in)
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex'),
                },
                function(err,user){
                    if(err){console.log('error in creting user',err); return;}
                    return done (null,user);
                }
                )
            }

        })
    }

))
module.exports = passport;