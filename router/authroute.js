const path = require('path');
const express = require('express');
const {check,body} = require('express-validator');
const authroute = express.Router();
const authcontroller = require('../controller/authcontroller');
const isAuth = require('../middlewire/isAuth');
//login
authroute.get('/log',authcontroller.logindataget);
authroute.post('/login',authcontroller.logindataPost);
//registration
authroute.get('/reg',authcontroller.regdataGet);
authroute.post('/regis',
[
    body('uname','Enter valid username').isLength({min:3}),
    check('email').isEmail().withMessage("Enter valid email"),
    body('password','Enter valid password').isLength({min:3,max:12})
],
   authcontroller.regDataPost);
//logout
authroute.get('/logout',authcontroller.logDataOut);

module.exports=authroute;