var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    fname : String,
    email : String,
    password : String,
    role : {type:String,enum:["admin","user"],default:"user"}
})

var UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;