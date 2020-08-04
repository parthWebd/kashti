const express=require('express');
const router=express.Router();
const commentController=require('../controllers/commentsController');
const passport=require('../config/passport-local-strategy');
// post can only be created once the user is logged in.
router.post('/create',passport.checkAuthentication,commentController.create);
module.exports = router;