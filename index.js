const express =require('express');
const app=express();
const port=8000;
const expressLayout=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
// const User=require('./models/user');

//Used for Session Cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy')

const MongoStore=require('connect-mongo')(session);

// for using the middleware
const saasMiddleware=require('node-sass-middleware');
app.use(saasMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputSyle: 'extended',
    prefix: '/css'

}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//put layout use before routes
app.use(expressLayout);

//extract syles and scripts from sub pages in layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//mongo-store is used to store the session cookie in the db.
app.use(session({
    name:'kashti',
    secret: "anycookie",
    //When the user is not logged in then we dont want to save the extra info in the session cookie thats why saveUnintialised is false
    saveUninitialized: false,
    
    resave: false,
    cookie:{
        maxAge: 1000*60*100, //in ms
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes/index'));



app.listen(port,function(err){
    if(err){
        console.log('Error',err);
        return;
    }
    console.log('Server running on port',port);
});