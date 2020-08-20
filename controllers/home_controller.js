constUser = require('../models/user');
const posts = require('../models/post');
const User = require('../models/user');
// const { model } = require('../models/user');


// module.exports.actionName = function(req,res){.....}
// module.exports.home = function (req, res) {
//     //let id=req.user._id;
//     // posts.find({},function(err,post_in_user){
//     //     if(err){
//     //         console.log(err);
//     //         return;
//     //     }
//     //     //console.log(id);
//     //     return res.render('home',{
//     //         title:'Kashti',
//     //         post:post_in_user,
//     //     });
//     // })
//     //to populate user of each post
//     posts.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         })
//         .exec(function (err, post_in_user) {

//             User.find({}, function (err, users) {
//                 return res.render('home', {
//                     title: 'Kashti',
//                     post: post_in_user,
//                     all_users: users,
//                 });
//             })

//             // if(err){
//             //     console.log(err);
//             //     return;
//             // }
//             //console.log(id);

//         })


// }

//first tell the server that a function is async
//then serially it will wait for the calls that has await
//before moving to the next call
module.exports.home = async function (req, res) {

    try {
        let Posts = await posts.find({}).
            sort('-createdAt').
            populate('user').
            populate({
                path: 'comments',
                populate: {
                    path: 'user',
                }
            });

        let users = await User.find({});

        return res.render('home', {
            title: 'Kashti',
            post: Posts,
            all_users: users,
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }
}