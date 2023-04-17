const express = require("express")
const{blogModel} =require("../model/blogModel")
const blogRputes = express.Router()
const{authentication} = require("../middlewere/authentication")

const{authrised} = require("../middlewere/authrise")
//An authenticated user should be able to create a blog
blogRputes.post("/add",authentication,authrised(['User']),async(req,res)=>{
    const{name,body,userID} = req.body
    try {

        const newblog = new blogModel({name,body,userID})
        await newblog.save()
        res.send("new blog added succesfully")

        
    } catch (error) {
        res.send(error.message)
    }
})

//All authenticated users should be able to read all blogs
blogRputes.get("/get",authentication,authrised(['User']),async(req,res)=>{
    try {
        const blogs = await blogModel.find()
        res.send(blogs)

    } catch (error) {
        res.send(error.message)
    }
})

//Establish relationship so that an authenticated user should be able to update or delete only their blog.
blogRputes.patch("/update/:id",authrised(['User']),async(req,res)=>{
        const id = req.params.id
    const{name,body,userID}= req.body
    try {
const blog = await blogModel.find({userID})
if(blog){

const update = await blogModel.findByIdAndUpdate({_id:id})
res.send("update")

}else{
    res.send("no any blog of this user")
}
        
    } catch (error) {
        res.send(error.message)
    }
})


//Establish relationship so that an authenticated user should be able to update or delete only their blog.
blogRputes.delete("/delete/:id",authentication,authrised(['User']),async(req,res)=>{
    try {
        
        const id = req.params.id
        
    
    const blog = await blogModel.find({userID})
    if(blog){
    
    const update = await blogModel.findByIdAndDelete({_id:id})
    res.send("delete")
    
    }else{
        res.send("no any blog of this user")
    }

 } catch (error) {
        res.send(error.message)
    }
})


//An authenticated moderator should be able to remove/delete any blog.

blogRputes.delete("/del",authentication,authrised(['Moderator']),async(req,res)=>{
        const id = req.params.id
    
    const update = await blogModel.findByIdAndDelete({_id:id})
    res.send("delete")
    
})




module.exports={
    blogRputes
}