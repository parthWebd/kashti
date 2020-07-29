const express=require('express');
const router=express.Router();
const postController=require('../controllers/posts_controller');
router.post('/post_form',postController.postSome);
module.exports = router;