const path = require('path');
const express = require('express');
const shoproute = express.Router();
const shopcontroller = require('../controller/shopcontroller');


shoproute.get('/datafetch',shopcontroller.fetching);

shoproute.post('/searchdetails',shopcontroller.searchDataPost);
//cart
shoproute.get('/cartejs/:prodId',shopcontroller.getcart);

//cartdetails
shoproute.get('/cartdetailsshow',shopcontroller.getcartdetails);
shoproute.post('/addtocart',shopcontroller.postaddToCart);


module.exports=shoproute;
 