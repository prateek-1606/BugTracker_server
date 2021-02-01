const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    email:String,
    username:String,
    password:String,
    firstname:String,
    lastname:String
},{timestamps:true})

module.exports = model('user',UserSchema);