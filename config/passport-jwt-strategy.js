const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const User = require('../models/user');
let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'Kashti'
}

passport.use(new JWTstrategy(opts,function(jwtpayload,done){
    User.findById(jwtpayload._id,function(err,user){
        if(err){console.log("Error in Finding the user from jwt"); return;}
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }

    });
}))

module.exports = passport;