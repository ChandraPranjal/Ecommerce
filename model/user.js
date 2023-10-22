const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    "UserName" : {type : String , required:true,unique:true},
    "Password" : {type : String , required:true},
    "UserType" : {type : String , required:true , enum:['buyer','seller']}
})

exports.User = mongoose.model('User',UserSchema);