const jwt = require("jsonwebtoken")
const{backModel}= require("../model/backlistModel")
const{userModel}= require("../model/userModel")
require("dotenv").config()

const authentication =async(req,res,next)=>{
try {

    const{AccessToken}= req.cookies
    const baclistedtoken = await backModel.findOne({token:AccessToken})
if(baclistedtoken){
       return res.send("you are logged out please login again")
   }

   if(AccessToken){
        jwt.verify(AccessToken,process.env.accesstoken,async(err,decode)=>{
if(decode){
req.body.userID =decode.userID
const id = decode.userID
const user = await userModel.findOne({_id:id})
const role =user.role
req.role = role
//console.log(r)

next()
}else{
    res.send({"msg":"please login first"})
}
     })
    }else{
        res.send({"msg":"plz login"})
    }


     } catch (error) {
        res.send(error.message)
     }


}

module.exports={
    authentication
}