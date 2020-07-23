
const User=require('../models/user');



module.exports.profile=function(req,res){
    res.render('user',{
        title  :  "kashti-Users"
    });
};
module.exports.friends=function(req,res){
    res.end('<h1>Friends</h1>');
};
// module.exports.create=function(req,res){
//     res.render('user',{
//         title  :  "kashti-Users"
//     });
// };

module.exports.create=function(req,res){
    console.log('hello',req.body);
    
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
};
module.exports.signIn=function(req,res){
    res.render('signIn',{
        title:"Sign-In",
    });
};
module.exports.validate=function(req,res){
    //console.log(req.body);
    var email=req.body.email;
    User.find({email:email},function(err,docs){
        if(err){
            res.end("<h1>please signup first</h1>");
        }
        else{
            if(docs[0]==undefined){
                console.log('NOT SIGNED IN');
                res.end("<h1>please signup first</h1>");
            }
            else{
                if(docs[0].password!=req.body.password){
                    console.log('Not - SIGNED - IN');
                    res.end("<h1>Invalid password</h1>");
                }
                else{
                    console.log('SIGNED IN');
                    res.end("<h1>Ola! User</h1>");
                }
                
            }
            // console.log(docs[0]);
        }
    });
    // console.log(email);
    // res.end("<h1>signIn</h1>")
}