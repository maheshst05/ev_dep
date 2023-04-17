const express = require("express");
const app = express();
app.use(express.json());
const { connection } = require("./db");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
const { userRoutes } = require("./Routes/userRoutes");
const { blogRputes } = require("./Routes/blogRoutes");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const{backModel} = require("./model/backlistModel")
const{authentication} = require("./middlewere/authentication")


app.use("/user", userRoutes);
app.use("/blog", blogRputes);
//home route
app.get("/", async (req, res) => {
  res.send("Home Page");
});

//logout
app.get("/logout",authentication, async (req, res) => {
  try {
const{AccessToken} = req.cookies
//console.log(AccessToken)
    const blocktoken = new backModel({token:AccessToken})
    await blocktoken.save()
    
res.send("logout Succesfully");
  } catch (error) {
    res.send(error.message);
  }
});

//refreshtoken
app.get("/refreshtoken", async (req, res) => {
  try {
const{RefreshToken} = req.cookies
console.log(RefreshToken)
const decoded = jwt.verify(RefreshToken,process.env.refreshtoken)
if(decoded){
    const  accessToken = jwt.sign({userID:decoded.userID}, process.env.accesstoken,{
        expiresIn:1000 * 60
    
    })
    res.cookie("AccessToken",accessToken,{maxAge:1000*60})
}    

res.send("refreshed");
  } catch (error) {
    res.send(error.message);
  }
});
//server
app.listen(9090, async () => {
  try {
    await connection;
    console.log("connnect to the Db");
    console.log("server is runing..");
  } catch (error) {
    console.log(error.message);
  }
});
