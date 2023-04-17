const mongoose = require("mongoose");

const backSchema = mongoose.Schema({
    token:{type:String}
})

const backModel = mongoose.model("backlist",backSchema)

module.exports={
    backModel
}