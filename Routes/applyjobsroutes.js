const express = require("express")
const { applyjobs_model } = require("../models/Applyjobmodel")
const nodemailer = require("nodemailer");
require('dotenv').config()
const applyjobsrouter = express.Router()


applyjobsrouter.get("/",async(req,res)=>{
    try{
const jobsdata = await applyjobs_model.find()
res.send(jobsdata)
    }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
    }
})

applyjobsrouter.get("/:id",async(req,res)=>{
  const id = req.params.id
  try{
const Jobsdata = await  applyjobs_model.findOne({"_id":id})
res.send(Jobsdata)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})



applyjobsrouter.post("/create",async(req,res)=>{
  const {Name,Applyforcourse,Experience,Mobile_no,Email,Location,Age,Current_ctc,Expected_ctc } = req.body
    
  try {
  const User = await applyjobs_model.find({Email,Applyforcourse})     


if(User.length>0){
  res.send("Already Applied")
}else{
  const userVerfication  = new applyjobs_model({Name,Applyforcourse,Experience,Mobile_no,Email ,Location,Age,Current_ctc,Expected_ctc })
  userVerfication.save()
  
          const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.Mail_send_email,
                pass:  process.env.Mailsend_Pass,
              },
            });
  
            const message = {
              from: '"Phoenix Institute 👻" <phoneixinstitute542@gmail.com>',
              to: `${Email}`, 
              subject: "Phoneix Jobs Alert 📧 ", 
              text: "Hey There You are at right place Phoenix Institute", 
              html: `<div> 
              
              Hey ${Name} 
              You have Applied for ${Applyforcourse} in Phoenix Institute
              Your Registered Mobile Number is ${Mobile_no } and mail is ${Email} .
             we will back to you soon ,Expect a call back in case you Got 
             selected .

              In case of any query You can contact us on 
              Registered Email Id - phoneixinstitute542@gmail.com
              Mobile - +91-9829237799

               Phoneix Institute 
              (🚀 A initiative to skill India and People's Of India 🚀)
            
               Phoneix Institue 
               
              </div>`, 
            };
          
  transporter.sendMail(message).then((info)=>{
  return res.status(201).json("Jobs Details send Successfully")
  info:info.messageId
  }).catch((err)=>{
      return res.status(500).json("Problem in sending mail")
  })
  res.send("Applied successfully")
}
    } catch (error) {
        res.send("Already Applied")
        console.log(error)
    }



})

applyjobsrouter.patch("/update/:id",async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
    try{
  await applyjobs_model.findByIdAndUpdate({_id:ID},payload)
  res.send("Jobs Updated successfully")
    }catch(err){
  console.log(err)
    }
  
  })
  
  applyjobsrouter.delete("/remove/:id" ,async(req,res)=>{
    const ID = req.params.id
    try{
  await applyjobs_model.findByIdAndDelete({_id:ID})
  res.send(`DeLeted the Jobs `)
    }catch(err){
  console.log(err)
    }
  })
  
module.exports={
    applyjobsrouter
}