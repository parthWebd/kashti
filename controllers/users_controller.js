module.exports.profile=function(req,res){
    res.render('user',{
        title  :  "kashti-Users"
    });
};
module.exports.friends=function(req,res){
    res.end('<h1>Friends</h1>');
};