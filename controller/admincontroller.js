const path = require('path');
const Product_model = require('../model/adminModel');
exports.getData=(req,res)=>{
    res.render('admin/addproduct',{
        path:'/product'
    })
};
exports.postData=(req,res)=>{
    const name = req.body.pname;
    // const title = req.body.ptitle;
    const pimage = req.file;
    const pimg_url = pimage.path; 
    const description = req.body.pdes;
    const price = req.body.pprice;
    // console.log(name,title,description,price);

    const products = new Product_model({_name: name,_image: pimg_url,_description: description,_price: price})
    products.save().then(addproduct=>{
        console.log(addproduct,"add");
        res.redirect('/displaydata');
    }).catch(err=>{
        console.log(err,"err1");
    })
}
exports.displayDatafetch=(req,res)=>{
    Product_model.find().then(allproducts=>{
    res.render('admin/productlist',{
        data:allproducts,
        path:'/displaydata'
    });
  })
}

//edit
exports.adminEditData=(req,res)=>{
    const product_id = req.body.product_id;
    const name = req.body.pname;
    const img = req.body.pimage;
    const description = req.body.pdes;
    const price = req.body.pprice;
    Product_model.findById({_id:product_id}).then(editproduct=>{
    editproduct._name=name;
    editproduct._image=img;
    editproduct._description=description;
    editproduct._price=price;
    editproduct.save().then(saveProduct=>{
        console.log(saveProduct,"save");
        res.redirect('/displaydata');
    })
  }) 
};
exports.editDataShow=(req,res)=>{
    const product_id = req.params.prodId;
    console.log(product_id);
    Product_model.findById({_id:product_id}).then(editproduct=>{
        res.render('admin/dataedit',{
            data:editproduct,
            path:'/editValue'
        });
    })
}
//delete
exports.deleteDataGet=(req,res)=>{
 const product_id = req.params.prodId;
 console.log("controller",product_id);
 Product_model.deleteOne({_id:product_id}).then(results=>{
     console.log(results,"results of controller");
     res.redirect('/displaydata')
 }).catch(err=>{
     console.log(err,"err2");
 })
}
