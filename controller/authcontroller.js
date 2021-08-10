const nodemailer = require('nodemailer');
const sendGridHelper = require('nodemailer-sendgrid-transport');
const createTransport  = nodemailer.createTransport(sendGridHelper({
    auth:{
        api_key:'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'
    }
}))
const path = require('path');
const authmodel = require('../model/authmodel');
const {validationResult} = require('express-validator');
const bycrypt = require('bcryptjs');

//registration
exports.regdataGet=(req,res)=>{
    let message = req.flash('error');
    console.log(message,"message");
    if(message.length>0)
    {
        message=message[0];
    }
    else{
        message=null;
    }
    res.render('auth/registration',{
        path:'/reg',
        errorMsg:message,
        error:[]
    })
}
exports.regDataPost=(req,res)=>{
    const username = req.body.uname;
    const email = req.body.email;
    const password = req.body.password;
//     authmodel.findOne({_email:email}).then(uservalue=>{  
        
//         if(uservalue){
//             req.flash('error','Error :: email already exists');
//             // console.log(uservalue,"email already exits");
//            return res.redirect('/reg');
//         }
//     return bycrypt.hash(password,12)
//     .then(hashPwd=>{
//         const userdetails = new authmodel({_username:username,_email:email,_password:hashPwd})
//         return userdetails.save()  
//     }).then(results=>{
//         console.log(results,"Registration Done");
//         res.redirect('/log');
//     }).catch(err=>{
//         console.log(err,"err4")
//     })
// }).catch(err=>{
//     console.log(err,"err5");
// })
// }
let error = validationResult(req);
if(!error.isEmpty())
{
    errorResponse = validationResult(req).array();
    console.log(errorResponse);
    res.render('auth/registration',{
        path:'/reg',
        errorMsg:'',
        error:errorResponse
    })
}
else
{
        authmodel.findOne({_email:email}).then(uservalue=>{  
        
        if(uservalue){
            req.flash('error','Error :: email already exists');
            // console.log(uservalue,"email already exits");
           return res.redirect('/reg');
        }
    return bycrypt.hash(password,12)
    .then(hashPwd=>{
        const userdetails = new authmodel({_username:username,_email:email,_password:hashPwd})
        return userdetails.save()  
    }).then(results=>{
        console.log(results,"Registration Done");
        createTransport.sendMail({
            to:email,
            from:"roysouvikr112@gmail.com",
            subject:"Registration Process",
            html:"<h1>You Have Successfully Registered</h1>"
        })
        res.redirect('/log');
    }).catch(err=>{
        console.log(err,"err4")
    })
}).catch(err=>{
    console.log(err,"err5");
})
}
}

//login
exports.logindataget=(req,res)=>{
    let message = req.flash('error');
    console.log(message,"message");
    if(message.length>0)
    {
        message=message[0];
    }
    else{
        message=null;
    }
    res.render('auth/login',{
        path:'/log', 
        errorMsg:message,
        cookie_data:req.cookies   
    });
}
exports.logindataPost=(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const checked = req.body.checked;
    console.log(email,password,"login");
    authmodel.findOne({_email:email})
    .then(uservalue=>{
        console.log(uservalue,"uservalue");
        if(!uservalue)
        {
          req.flash('error','Error :: Invalid email');
          
          return res.redirect('/log');
        }
        bycrypt.compare(password,uservalue._password)
        .then(results=>{
            console.log(results);
        if(!results)
        {
            req.flash('error','Error :: Invalid password');
        }else{

        
            console.log("logged In",results);
            req.session.isLoggedin = true;
            req.session.user=uservalue;///
            return req.session.save(err=>{
           if(err)
           {
               console.log(err);
           }
           else{
               if(checked)
               {
               const cookieData = {emailCookie:uservalue.email,password:password};
               // last email & password is the variable from 65 & 66
               res.cookie("cookieData",cookieData),{
                   expires: new Date(Date.now() + 120000),
                   httpOnly: true
               }
               }
           }
                console.log("logged In",err);
                return res.redirect('/product')
            })
        } 
        
            res.redirect('/log')
        }).catch(err=>{
            console.log("error in findOne: ",err);
            res.redirect('/log')
        })
       
    }).catch(err=>{
        console.log(err);
    })
}

//log out
exports.logDataOut=(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/log')
        }
    });
}

