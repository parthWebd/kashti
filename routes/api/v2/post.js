const express=require('express');
const router = express.Router();

router.get('/',require('../../../controllers/api/v2/post_api').index);

module.exports = router;