const authrised = (permittedrole)=>{
    return (req,res,next)=>{
        const user_role = req.role

        if(permittedrole.includes(user_role)){
            next()
        }else{
            return res.send("unauthrisied")
        }
    }

}

module.exports={
    authrised
}