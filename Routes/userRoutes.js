const express = require("express")
const userRoutes = express.Router()
const{userModel}= require("../model/userModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config()



//registration
userRoutes.post("/signup",async(req,res)=>{
const {name,email,password,role} = req.body;
try {
//check user is already present or not
    const user = await userModel.find({email})

    if(user.length>0){
            
        res.send("user is already exist plz login..")
   }
   else{
   bcrypt.hash(password, 5,async function(err, hash) {
        // Store hash in your password DB.
        const newuser = new userModel({name,email,password:hash,role}) 
        await newuser.save()
       res.send("reg sucessfully done.")
    }); 
   }
} catch (error) {
    res.send(error.message)
}
})



//login

userRoutes.get("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
const user = await userModel.find({email})

if(user.length>0){
    //console.log(user[0]._id)
    bcrypt.compare(password, user[0].password, function(err, result) {
        if(result){
        //normal token
        const accessToken = jwt.sign({ userID: user[0]._id}, process.env.accesstoken,{
            expiresIn:10000 * 60
        
        });

        //refresh token
        const refreshToken = jwt.sign({ userID: user[0]._id}, process.env.refreshtoken,{
            expiresIn:3000 * 60 
        });

    // store these tokens
    // cookies set a cookie
    res.cookie("AccessToken", accessToken, { maxAge: 1000 * 60 });
    res.cookie("RefreshToken", refreshToken, { maxAge: 3000 * 60 });
    res.send("login suceesfully");
        
        } 
        else {res.send({"msg":"Wrong creadiancial"})}
        });
}
else{
    res.send({"msg":"user not found"})
}
        
    } catch (error) {
        res.send(error.message)
    }

})


userRoutes.get("/",async(req,res)=>{

try {
  const users = await userModel.find()
  res.send(users)

} catch (error) {
  res.send(error.message)
}

})

module.exports={
    userRoutes
}