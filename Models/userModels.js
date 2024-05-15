const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    "username":{
        type:String,
        required:true,
    },
    "email":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        required:true,
        unique:true
    },
    "mobile":{
        type:String,
        required:false,
        unique:true
    },
    "gender":{
        type:String,
        required:false,
        enum:["male","female","others"]
    },
    "role":{
        type:String,
        required:true,
        enum:['user','admin']
    }
})
module.exports = mongoose.model('User',userSchema);