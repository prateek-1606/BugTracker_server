const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    email:String,
    password:String,
    firstname:String,
    lastname:String,
    employes:[{
        email:String,
        name:String,    
    }]
},{timestamps:true})

module.exports = model('user',UserSchema);