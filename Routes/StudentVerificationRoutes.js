
const express = require("express")
const { studentverificationmodal } = require("../models/Studentverification")
require('dotenv').config()
const studentVerificationRoutes = express.Router()


studentVerificationRoutes.get("/",async(req,res)=>{
    try{
const studentList = await studentverificationmodal.find()
res.send(studentList)
    }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
    }
})

studentVerificationRoutes.get( "/:id",async(req,res)=>{
  const id = req.params.id
  try{
const studentList = await  studentverificationmodal.findOne({"_id":id})
res.send(studentList)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})


// searching with register number

studentVerificationRoutes.post("/student",async(req,res)=>{
  const {Registration_Number} =req.body
  try{
const studentList = await studentverificationmodal.find({ "Registration_Number":Registration_Number})
res.send(studentList)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})
// -----

studentVerificationRoutes.post("/createlist",async(req,res)=>{
  const {Registration_Number,Age,HighestEducation,Name,Cast,Gender,Father_Name,Course_Name,Duration,FinalResult,Address,Date_of_Birth,Mobile_No,Mail_Id,Total_Fess,Fess_Deposit } = req.body
  try{
    const User = await studentverificationmodal.find({Registration_Number})

if(User.length>0){
  res.send("Already Registration Number in use")
}else{
const studentList = new studentverificationmodal({Registration_Number,Age,HighestEducation,Name,Cast,Gender,Father_Name,Course_Name,Duration,FinalResult,Address,Date_of_Birth,Mobile_No,Mail_Id,Total_Fess,Fess_Deposit })
await studentList.save()
res.send("Added student to Db")
}
  }catch(err){
console.log(err)
res.send({"msg":"Error while adding student to Db"})
  }
})

studentVerificationRoutes.patch("/update/:id",async(req,res)=>{
  const ID = req.params.id
  const payload = req.body
  try{
await studentverificationmodal.findByIdAndUpdate({_id:ID},payload)
res.send("Data Updated successfully")
  }catch(err){
console.log(err)
  }

})

studentVerificationRoutes.delete("/remove/:id",async(req,res)=>{
  const ID = req.params.id
  try{
await studentverificationmodal.findByIdAndDelete({_id:ID})
res.send(`DeLeted Student Data `)
  }catch(err){
console.log(err)
  }
})

module.exports={
    studentVerificationRoutes
}