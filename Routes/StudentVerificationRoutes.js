
const express = require("express")
const { studentverification_modal } = require("../models/Studentverification")
require('dotenv').config()
const student_Verification_Routes = express.Router()


student_Verification_Routes.get("/",async(req,res)=>{
    try{
const studentList = await studentverification_modal.find()
res.send(studentList)
    }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
    }
})

student_Verification_Routes.get( "/:id",async(req,res)=>{
  const id = req.params.id
  try{
const studentList = await  studentverification_modal.findOne({"_id":id})
res.send(studentList)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})


// searching with register number

student_Verification_Routes.post("/student",async(req,res)=>{
  const {Registration_Number} =req.body
  try{
const studentList = await studentverification_modal.find({ "Registration_Number":Registration_Number})
res.send(studentList)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})
// -----

student_Verification_Routes.post("/createlist",async(req,res)=>{
  const {Registration_Number,Age,HighestEducation,Name,Cast,Gender,Father_Name,Course_Name,Duration,FinalResult,Address,Date_of_Birth,Mobile_No,Mail_Id,Total_Fess,Fess_Deposit } = req.body
  try{
    const User = await studentverification_modal.find({Registration_Number})

if(User.length>0){
  res.send("Already Registration Number in use")
}else{
const studentList = new studentverification_modal({Registration_Number,Age,HighestEducation,Name,Cast,Gender,Father_Name,Course_Name,Duration,FinalResult,Address,Date_of_Birth,Mobile_No,Mail_Id,Total_Fess,Fess_Deposit })
await studentList.save()
res.send("Added student to Db")
}
  }catch(err){
console.log(err)
res.send({"msg":"Error while adding student to Db"})
  }
})

student_Verification_Routes.patch("/update/:id",async(req,res)=>{
  const ID = req.params.id
  const payload = req.body
  try{
await studentverification_modal.findByIdAndUpdate({_id:ID},payload)
res.send("Data Updated successfully")
  }catch(err){
console.log(err)
  }

})

student_Verification_Routes.delete("/remove/:id",async(req,res)=>{
  const ID = req.params.id
  try{
await studentverification_modal.findByIdAndDelete({_id:ID})
res.send(`DeLeted Student Data `)
  }catch(err){
console.log(err)
  }
})

module.exports={
    student_Verification_Routes
}