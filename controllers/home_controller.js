
const posts=require('../models/post');
// module.exports.actionName = function(req,res){.....}
module.exports.home = function(req,res){
    //let id=req.user._id;
    // posts.find({},function(err,post_in_user){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     //console.log(id);
    //     return res.render('home',{
    //         title:'Kashti',
    //         post:post_in_user,
    //     });
    // })
    //to populate user of each post
    posts.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,post_in_user){
        if(err){
            console.log(err);
            return;
        }
        //console.log(id);
        return res.render('home',{
            title:'Kashti',
            post:post_in_user,
        });
    })
    
    
}