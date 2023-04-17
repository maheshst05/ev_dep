const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
    title:{type:String},
    body:{type:String},
     userID:{type:String}
}) 



const blogModel = mongoose.model("blog",blogSchema)

module.exports={
    blogModel
}