const mongossse = require('mongoose');
const schema = mongossse.Schema;

const cartschema = new schema({
    productId:{
        type:String,
        required:true
    },
    quanity:{   
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    cartdata:[{
        type:Object,
        required:true
    }],
})
module.exports=mongossse.model('CartDetails',cartschema);