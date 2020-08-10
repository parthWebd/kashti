const Comment=require('../models/comment');
const Post=require('../models/post')



module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                posts:req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){
                    req.flash('error','Error in deleting comment');
                    console.log(err);
                    return;
                }

                post.comments.push(comment);
                post.save();
                req.flash('success','Comment added successfully');
                res.redirect('/');

            });
        }
    });
}

module.exports.destroy=function(req,res){
    // console.log(req.user);
    Comment.findById(req.params.id,function(err,comment){
        console.log(comment._id);
        if(comment.user == req.user.id || true){
            console.log("i M in");
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
            req.flash('success','Comment deleted successfully');
        }
        // else{
        //     return res.redirect('back');
        // }
    });
}