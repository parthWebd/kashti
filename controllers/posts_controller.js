const posts=require('../models/post');
const comment=require('../models/comment')
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

module.exports.destroy=function(req,res){
    posts.findById(req.params.id,function(err,post){
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }

    })
}