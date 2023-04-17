const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{
        type:String,
       default:"User",    
       enum:["User","Moderator"]
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports={
    userModel
}