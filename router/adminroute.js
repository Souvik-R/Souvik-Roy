const path = require('path');
const express = require('express');
const adminroute = express.Router();
const controller = require('../controller/admincontroller');
const isAuth = require('../middlewire/isAuth');
adminroute.get('/product',isAuth,controller.getData);
adminroute.post('/postValue',controller.postData);

adminroute.get('/displaydata',isAuth,controller.displayDatafetch);

//edit
adminroute.get('/editValue/:prodId',isAuth,controller.editDataShow);
adminroute.post('/editValue',controller.adminEditData);
//delete
adminroute.get('/deleteData/:prodId',isAuth,controller.deleteDataGet);


module.exports=adminroute;