const Comment=require('../models/comment');
const Post=require('../models/post')



module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            let cmnt=Comment.create({
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

                if(req.xhr){
                    console.log(comment);
                    return res.status(200).json({
                        
                        data: { 
                            comnt:comment,
                         },
                        message: "comment created"
                    });
                }
                
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
            
            let post = Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id}},function(err,post){
                console.log('i m maddar');
                if(req.xhr){
                    console.log("maa ki chut");
                    return res.status(200).json({
                        data: {
                            comment_id:req.params.id,
                        },
                        message: "Comment Deleted"
                    })
                }
                // return res.redirect('back');
            });

            // send the comment id which was deleted back to the views
           

            req.flash('success','Comment deleted successfully');
        }
        // else{
        //     return res.redirect('back');
        // }
    });
}