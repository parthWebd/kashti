const express=require('express');
const router=express.Router();
const passport=require('passport');


const usersController=require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
// router.get('/profile',passport.checkAuthentication, usersController.profile1)
router.post('/createNew',usersController.create);
router.get('/sign-out', usersController.destroySession)
router.get('/sign-up', usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/validate',passport.authenticate('local',{failureRedirect: '/users/sign-in'}),usersController.validate);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/users/sign-in' }),usersController.validate);

// router.post('/post_form', usersController.postSome);

// router.get('/friends', usersController.friends);
module.exports = router;
