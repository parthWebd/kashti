const express =require('express');
const app=express();
const port=8000;
const expressLayout=require('express-ejs-layouts');

const db=require('./config/mongoose');
const User=require('./models/user');
app.use(express.urlencoded());
app.use(express.static('./assets'));

//put layout use before routes
app.use(expressLayout);

//extract syles and scripts from sub pages in layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes/index'))

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port,function(err){
    if(err){
        console.log('Error',err);
        return;
    }
    console.log('Server running on port',port);
});