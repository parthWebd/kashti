//install k badd is module me use karne k liye require
const passport = require('passport');
// fir strategy use karne k liye require
const LocalStrategy=require('passport-local').Strategy;
//authentcation using passport

//User schema is required here , so...
const User = require('../models/user');

passport.use(new LocalStrategy({
    //yaha hm bta rahe h ki kaun si field use ho rahi h as username
    usernameField: 'email',
    passReqToCallback:true,
},
    function(req,email,password,done){
        //find the user and established the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                // console.log('error in finding the user');
                return done(err);
            }
            if(!user || user.password!=password){
                req.flash('error',"Invalid Username or Password");
                //console.log("Invalid Username or Password");
                return done(null,false);
            }

            return done(null,user);

        });
    }
));


//Serializing the user to decide which key is to be kept in the  cookies
passport.serializeUser(function(user,done){
    done(null,user.id);


});


//desirializing the user from the Key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding the user');
            return done(err);
        }
        return done(null,user);
    })
})

//check if the user is Authenticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;