const posts=require('../models/post');
const comment=require('../models/comment');
const Post = require('../models/post');
module.exports.postSome=async function(req,res){
    try{
        let post=await Post.create({
            content: req.body.content,
            user: req.user._id,
        });

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post,
                },
                message: "Post created!",
            })
        }


        req.flash('success','Post published');
        return res.redirect('back');
    }catch(err){
        req.flash('error','Error in creating post');
        return res.redirect('back');
    }
  
    // console.log(req.body);
    // posts.create({
    //     content: req.body.content,
    //     user: req.user._id
    // },function(err,newPost){
    //     if(err){
    //         req.flash('error','Error in creating post');
    //         // console.log("e");
    //         return;
    //     }
    //     req.flash('success','Post published');
    //     return res.redirect('back');
    // })
 
    // return res.redirect('back');
}

// module.exports.destroy=function(req,res){
//     posts.findById(req.params.id,function(err,post){
//         // .id means converting the object id into string
//         if(post.user == req.user.id){
//             post.remove();
//             comment.deleteMany({post: req.params.id},function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }

//     })
// }

module.exports.destroy=async function(req,res){
    try{
        
        let post=await posts.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();
            await comment.deleteMany({post:req.params.id});

            if(req.xhr){
                // console.log('fuck Post');
                return res.status(200).json({
                    data: {
                        post_id:req.params.id
                    },
                    message: "Post Deleted"
                })
            }

            req.flash('success','Post and associated comments deleted');
        }
        return res.redirect('back');

    }catch(err){
        req.flash('error','Error in deleting post');
        // console.log('Error',err);
        return res.redirect('back');
    }
}