const posts = require('../../../models/post');
const comment=require('../../../models/comment');


module.exports.index = async function (req, res) {

    let Posts = await posts.find({}).
        sort('-createdAt').
        populate('user').
        populate({
            path: 'comments',
            populate: {
                path: 'user',
            }
        });

    return res.json(200, {
        message: "List of Post",
        posts: Posts,
    })
}

module.exports.destroy = async function (req, res) {
    try {
        console.log("delete me h")
        let post = await posts.findById(req.params.id);

        if(post.user == req.user.id){
        post.remove();
        await comment.deleteMany({ post: req.params.id });



        // req.flash('success','Post and associated comments deleted');
        // }
        return res.json(200, 
            {
                message: "Post and associated comments deleted",
            })
        }
        else{
            return res.json(401,{
                message: "you can't delete this post"
            })
        }

    } catch (err) {
        // req.flash('error','Error in deleting post');
        // console.log('Error',err);
        console.log(" ****** Error ******",err);
        return res.json(500, {
            message: "Internal Server Error",
        });
    }
}