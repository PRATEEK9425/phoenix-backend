const express = require("express")
const nodemailer = require("nodemailer");
const { mailmodel } = require("../models/mailmodals");
require('dotenv').config()
const mailroutes = express.Router()


// SENDING MAIL ROUTES
mailroutes.post( "/verify" ,async(req,res)=>{
    const {useremail,email_OTP,isAuth,username} = req.body
    try {
  const emailcheck = await mailmodel.findOne({useremail})     


    const userVerfication  = new mailmodel({useremail,email_OTP,isAuth})
    userVerfication.save()
    
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.Mail_send_email,
                  pass:  process.env.Mailsend_Pass,
                },
              });
    
              const message = {
                from: '"Phoneix Institute 👻" <phoneixinstitute542@gmail.com>',
                to: `${useremail}`, 
                subject: "Phoneix Institute Authentification ", 
                text: "Hey There You are at right place PHONEIX INSTITUE", 
                html: `<b> Hey ${username} 😀 Your OTP IS ${email_OTP} Please Don't Share With Anyone 😎</b>`, 
              };
            
    transporter.sendMail(message).then((info)=>{
    return res.status(201).json("Otp send Successfully")
    info:info.messageId
    }).catch((err)=>{
        return res.status(500).json("Otp Not send ")
    })
   

    } catch (error) {
        res.status(500).json("Otp Not send ")
    }
})

// verfying otp from user entry and Db check
mailroutes.post("/verifyotp",async(req,res)=>{
  const {useremail,email_OTP} = req.body 
  try {
    const OTPCHECKING_fROMDB = await mailmodel.findOne({useremail,email_OTP})
  //  user entering
    const User_ENTERED_OTP = email_OTP
    const User_ENTERED_Email = useremail
// user detail in db
    const Otp_IN_DB = OTPCHECKING_fROMDB.email_OTP
    const Email_IN_DB = OTPCHECKING_fROMDB.useremail

    if(Otp_IN_DB===User_ENTERED_OTP && User_ENTERED_Email===Email_IN_DB  ){
   
      res.send({"msg":"Email verified","uSERiD":`${OTPCHECKING_fROMDB._id}`})
     
    }else{
      return res.status(500).json("Incorrect OTP")
    }

  } catch (error) {
    res.send("Incorrect OTP")
    console.log(error);
  }
})

// Deleting Entry of user in Db 

mailroutes.delete("/remove_otp/:id",async(req,res)=>{
  const ID = req.params.id
  try{
   await mailmodel.findByIdAndDelete(({_id:ID})) 
   res.send({"msg":`Entry Removed`})
  }catch(err){
   console.log(err);
   res.send({"Msg":"Not ABLE TO Delete"})
     }
})


module.exports={mailroutes}