const express=require('express');
const router=express.Router();

const usersController=require('../controllers/users_controller');
router.get('/createUser',usersController.create);
router.post('/createNew',usersController.create);
router.get('/sign-up', usersController.profile);
router.get('/sign-in',usersController.signIn);
router.post('/validate',usersController.validate);
router.get('/friends', usersController.friends);
module.exports = router;
