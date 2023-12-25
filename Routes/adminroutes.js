const express = require("express")

const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { adminmodel } = require("../models/Adminmodel");
require('dotenv').config()

const adminroutes = express.Router()

// admin register
adminroutes.post("/admin/phoneix/adminregister",async(req,res)=>{
    const { Admin_name,Admin_email,Admin_password} = req.body
    try{
const Userpresent = await adminmodel.find({Admin_email})
console.log(Userpresent);
if(Userpresent.length>0){
res.send("Admin Present")
}else{
    const saltRounds = 6
    bcrypt.hash(Admin_password, saltRounds, function(err, Secure_password) {
        if(err){
            console.log(err);
        }else{
            const AdminData = new adminmodel({ Admin_name,Admin_email,Admin_password:Secure_password})
            AdminData.save()
            res.send("Admin Registered Successfully")
        }
    })
}
    }
    catch(err){
res.send("Admin Present")
console.log(err);
    }
})


// admin login
adminroutes.post( "/admin/phoneix/mainlogin/mainheadadmin",async(req,res)=>{
    const { Admin_email,Admin_password} = req.body
   
    try{
        const user = await  adminmodel.find({Admin_email})
const Hashed_password = user[0].Admin_password
if(user.length>0){
    bcrypt.compare(Admin_password,Hashed_password , (err, result)=> {
       if(result){
        const token = jwt.sign({ phonix: process.env.Payload_for_user }, process.env.Passkey);
        res.send({"msg":" Admin Login Successful","token":token})
    }else{
        res.send("Wrong credentials")
    }
    });
    
}else{
    res.send("Wrong Credentials")
}

    }catch(err){
        res.send("Wrong Credentials")
console.log(err);
    }
    
})


module.exports={
    adminroutes
}