const express=require('express');
const router=express.Router();
const homeController = require('../controllers/home_controller');
router.get('/' , homeController.home);
//whenever there is request for - users router it will send rquest to users router
//for any further routes access from here
//router.use('/routerName' , require('./users'))
router.use('/users',require('./users'));
router.use('/likes',require('./likes'));

console.log('router is running');
module.exports = router;