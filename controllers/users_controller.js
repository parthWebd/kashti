
const User=require('../models/user');
// for delting the avatar we need the fs mdule and also the path
const fs = require('fs');
const path=require('path');





module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        // console.log(user);
        res.render('user_profile.ejs',{
            title  :  "kashti-Users",
            profile_user:user, 
        });
    })
    
};
// module.exports.profile1=function(req,res){
//     res.render('user_profile.ejs',{
//         title  :  "kashti-Users",
//         profile_user:user, 
//     });
    
// };

module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user =await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("Multer Error",err); return;
                }
                //we could not have read req.body without multer
                // as form is esync type 
                user.name=req.body.name,
                user.email=req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath + '/' +req.file.filename ;
                }
                user.save();
                return res.redirect('back');
                // console.log(req.file);
            });
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }




    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('/');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
}

module.exports.signUp=function(req,res){
if(req.isAuthenticated()){
   return res.redirect('/users/profile');
}

    res.render('user',{
        title  :  "kashti-Users"
    });
};

module.exports.destroySession = function(req,res){
    req.flash('success','you have logged out');
    req.logout();
    return res.redirect('/');
}

module.exports.friends=function(req,res){
    res.end('<h1>Friends</h1>');
};
// module.exports.create=function(req,res){
//     res.render('user',{
//         title  :  "kashti-Users"
//     });
// };

module.exports.postSome=function(req,res){
    console.log(req.body);
    return res.redirect('back');
}


module.exports.create=function(req,res){
    console.log('hello',req.body);

    User.find({email:req.body.email},function(err,possUser){
        console.log(possUser[0],"whatup");
        if(possUser[0]!=undefined  && possUser[0].email==req.body.email){
            console.log('user already exist');
            return res.redirect('/users/sign-in');
        }
        else{
            User.create({
                email:req.body.email,
                password: req.body.password,
                name:req.body.name,
            },function(err,newUser){
                if(err){
                    console.log("error",err);
                    return ;
                }
                console.log("*********",newUser);
                return res.redirect('/');
            })
        }
    });
    
    
};
module.exports.signIn=function(req,res){
    
    if(req.isAuthenticated()){
       return res.redirect('/');
    }
    res.render('signIn',{
        title:"Sign-In",
    });
    // return res.redirect('/');
};



module.exports.validate=function(req,res){
    req.flash('success','Logged In Successfully')
    return res.redirect('/');
    //console.log(req.body);
    // var email=req.body.email;
    // User.find({email:email},function(err,docs){
    //     if(err){
    //         res.end("<h1>please signup first</h1>");
    //     }
    //     else{
    //         if(docs[0]==undefined){
    //             console.log('NOT SIGNED IN');
    //             res.end("<h1>please signup first</h1>");
    //         }
    //         else{
    //             if(docs[0].password!=req.body.password){
    //                 console.log('Not - SIGNED - IN');
    //                 res.end("<h1>Invalid password</h1>");
    //             }
    //             else{
    //                 console.log('SIGNED IN');
    //                 res.end("<h1>Ola! User</h1>");
    //             }
                
    //         }
    //         // console.log(docs[0]);
    //     }
    // });
    // // console.log(email);
    // // res.end("<h1>signIn</h1>")
}