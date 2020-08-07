const express=require('express');
const router=express.Router();
const postController=require('../controllers/posts_controller');
const passport=require('../config/passport-local-strategy');
// post can only be created once the user is logged in.
router.post('/post_form',passport.checkAuthentication,postController.postSome);
router.get('/destroy/:id', passport.checkAuthentication,postController.destroy);
module.exports = router;