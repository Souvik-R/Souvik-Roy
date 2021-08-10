const mongossse = require('mongoose');
const schema = mongossse.Schema;

const ProductSchema = new schema({
    _name:{
        type: 'string',
        required: true
    },
    _image:{
        type: 'string',
        required: true
    },
    _description:{
        type: 'string',
        required: true
    },
    _price:{
        type: 'number',
        required: true
    }
})
module.exports=mongossse.model('product',ProductSchema);