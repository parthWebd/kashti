const posts=require('../models/post');

module.exports.postSome=function(req,res){
    console.log(req.body);
    posts.create({
        content: req.body.content,
        user: req.user._id
    },function(err,newPost){
        if(err){
            console.log("error in creating post"); return;
        }
        return res.redirect('back');
    })
 
    // return res.redirect('back');
}