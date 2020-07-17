const express=require('express');
const router=express.Router();
const likeController=require('../controllers/likes_controller');
router.get('/like',likeController.likes);
module.exports = router;