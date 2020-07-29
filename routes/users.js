const express=require('express');
const router=express.Router();
const passport=require('passport');


const usersController=require('../controllers/users_controller');
router.get('/profile',passport.checkAuthentication,usersController.profile);
router.post('/createNew',usersController.create);
router.get('/sign-out', usersController.destroySession)
router.get('/sign-up', usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/validate',passport.authenticate('local',{failureRedirect: '/users/sign-in'}),usersController.validate);
// router.get('/friends', usersController.friends);
module.exports = router;
