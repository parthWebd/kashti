const posts=require('../models/post');
const comment=require('../models/comment')
module.exports.postSome=function(req,res){
    console.log(req.body);
    posts.create({
        content: req.body.content,
        user: req.user._id
    },function(err,newPost){
        if(err){
            req.flash('error','Error in creating post');
            // console.log("e");
            return;
        }
        req.flash('success','Post published');
        return res.redirect('back');
    })
 
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
            await comment.deleteMany({poat:req.params.id});
            req.flash('success','Post and associated comments deleted');
        }
        return res.redirect('back');

    }catch(err){
        req.flash('error','Error in deleting post');
        // console.log('Error',err);
        return res.redirect('back');
    }
}