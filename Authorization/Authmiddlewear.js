const jwt = require("jsonwebtoken")

const AuthMiddlewear=(req,res,next)=>{
    const token =req.headers.auth
    if(token){
const Decodedtoken = jwt.verify(token,"prateek")
if(Decodedtoken){
    next()
}else{
    res.send("Login First")
}
    }else{
        res.send("Login First")
    }
}

module.exports={
    AuthMiddlewear
}