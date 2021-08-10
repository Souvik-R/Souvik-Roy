const mongossse = require('mongoose');
const schema = mongossse.Schema;

const AuthSchema = new schema({
    _username:{
        type: 'string',
        required: true
    },
    _email:{
        type: 'string',
        required: true
    },
    _password:{
        type: 'string',
        required: true
    }
})
module.exports=mongossse.model('userdata',AuthSchema);