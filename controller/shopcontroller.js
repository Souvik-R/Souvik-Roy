const path = require('path');
const shopmodel = require('../model/adminModel');
const cartmodel = require('../model/cartmodel');
//fetching
exports.fetching=(req,res)=>{
    shopmodel.find().then(results=>{
        res.render('shop/shopproductdetails',{
            data:results,
            path:'/datafetch'
        })
    })
}

// search
exports.searchDataPost=(req,res)=>{   
    const searchid=req.body.searchtext;
    shopmodel.find({_name:searchid})
    .then(result=>{
        console.log(result,"printing result");
        res.render('shop/shopproductdetails',{
            data:result,
            path:'/searchdetails'
        })
        
    }).catch(err=>{
        console.log(err,"err6")
    })   
}
//cart
exports.getcart=(req,res)=>{
    const prod_id = req.params.prodId;
    console.log(prod_id);
    const CartData = []
    shopmodel.findById({_id:prod_id}).then(cartdataaaa=>{
        console.log(cartdataaaa,"added to cart");
        CartData.push(cartdataaaa);
        const cartt = new cartmodel({cartdata:cartdataaaa}) //cartdata from cart model
        cartt.save().then(results=>{
            console.log(results,"cart created");
        }).catch(err=>{
            console.log(err);
        })
        res.redirect('/cartdetailsshow')
    })
}
//cartdetails
exports.getcartdetails=(req,res)=>{
    cartmodel.find().then(results=>{
        console.log(results,"value from cart"); 
        res.render('shop/cart',{
            data:results,
            path:'/cartdetailsshow'
        });
      })
}
exports.postaddToCart=(req,res)=>{
    const pid = req.body.productId;
    const quantity = req.body.quantity;
    const userid = req.user._id;
    const cartval = [];
    console.log("After add to cart: pid: ",pid," Q: ",quantity,"Id: ",userid);
    cartmodel.findById({userId:userid,productId:pid})
    .then(cartData=>{
        if(cartData=='')
        {
            shopmodel.findById(pid)
            .then(productForCart=>{
                console.log("Prodt for cart",productForCart);
                cartval.push(productForCart);
                const cartProduct = new cartmodel({productId:pid,quanity:quantity,userId:userid,cartdata:cartval});
                cartProduct.save()
                .then(result=>{
                    console.log("Product Added into art Successfully");
                    res.redirect('/');
                }).catch(err=>{
                    console.log(err);
                })
            }) .catch(err=>{
                console.log(err);
            })
        }
        else if(cartData[0].productId==pid)
        {
            console.log("Product Already added in cart");
            res.redirect('/');
        }
        else
        {
            shopmodel.findById(pid)
            .then(productForCart=>{
                cartval.push(productForCart);
                const cartProduct = new cartmodel({productId:pid,quanity:quantity,userId:userid,cartdata:cartval});
                cartProduct.save()
                .then(result=>{
                    console.log("Product Added into art Successfully");
                    res.redirect('/');
                }).catch(err=>{
                    console.log(err);
                })
            }).catch(err=>{
                console.log(err);
            })
        }
    }).catch(err=>{
        console.log(err);
    })
}

