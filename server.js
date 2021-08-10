const express = require('express')
const app = express();
const session = require('express-session');//
//session package is used to store info in memory but it has no infinite resource
const connect_session = require('connect-mongodb-session')(session); 
//used to store data in mongodb in a session package//
const path = require('path');
const mongosse = require('mongoose');
const cookie = require('cookie-parser');
const multerimage = require('multer') //step 1 multer
const flash = require('connect-flash');


const Csurf = require('csurf');

const dbDriver = "mongodb+srv://souvik123:souvik123@cluster0.m72uz.mongodb.net/mongoNew?retryWrites=true&w=majority";
const session_model = require('./model/authmodel');
const route = require('./router/adminroute');
const shoroute = require('./router/shoproute');
const authroute = require('./router/authroute');
// const body_parser = require('body-parser');
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(cookie());
///
const csurfProtection = Csurf();
///step 2 session
const storevalue = new connect_session({
    uri:'mongodb+srv://souvik123:souvik123@cluster0.m72uz.mongodb.net/mongoNew',
    collection: 'my-session'
})
///step 3 session
app.use(session({secret:'secret-key', resave:false, saveUninitialized:false, store:storevalue}))
/*session is function here..to stop resaving....resave:false. to stop storing uninitialized value..
saveUninitialized:false. secret key helps to generate id kind thing in session*/
app.use(express.static(path.join(__dirname,'public')));
///
app.use('/uploadingimage',express.static(path.join(__dirname,'uploadingimage'))); //2nd step for multer
    const filestorage = multerimage.diskStorage({
        destination:(req,file,callback)=>{
            callback(null,'uploadingimage')
        },
        filename:(req,file,callback)=>{
            callback(null,file.originalname)
        }
    });



    const fileFilter = (req,file,callback)=>
    {
        if(file.mimetype.includes("png") || file.mimetype.includes("jpg") || file.mimetype.includes("jpeg"))
        {
              callback(null,true)
        }
   else
        {
              callback(null,false)
        }
    }
    app.use(multerimage({storage:filestorage,fileFilter:fileFilter,limits:{fieldsize:1024*1024*5}}).single('pimage'));
///
app.set('view engine','ejs');
app.set('views','view');
///step 4 session
app.use((req,res,next)=>{
    if(!req.session.user){   //line 3 er variable session
        return next();
    }
    session_model.findById(req.session.user._id)
    .then(uservalue=>{
        req.user = uservalue;
        console.log('appsss'+ req.user)
        next();
    }).catch(err=>{
        console.log(err);
    })
})
///
app.use(csurfProtection);
///Authentication
app.use((req,res,next)=>{
    res.locals.isAuthenticated=req.session.isLoggedin;
    res.locals.csrfToken=req.csrfToken();
    next();
})
///
app.use(route)
app.use(shoroute)
app.use(authroute)

mongosse.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(result=>{
        console.log(result);
        app.listen(3000,(req,res)=>{
            console.log("server is running");
        })
    }).catch(err=>{
        console.log(err);
    });

