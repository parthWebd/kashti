const User=require('../../../models/user');
const jwt=require('jsonwebtoken');


//Whenever a username and password is recieved, 
//We need to find that user and generate the json web token corresponding to that
module.exports.createSession=async function(req,res){
    try {
        console.log(req.body.email);
        let user= await User.findOne({email:req.body.email});
        console.log("Aao",user);
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "Invalid Username or Password"
            })
        }
        return res.json(200,{
            message : "Sign in successful , please keep token safe",
            data :{
                token : jwt.sign(user.toJSON(),'Kashti',{expiresIn : '100000'})
            }
        })

    } catch (err) {
        console.log("****** Error ******",err);
        return res.json(500, {
            message: "Internal Server Error",
        });
    }

}