const express = require("express")
const { jobsmodel } = require("../models/Jobsmodel")

const jobsrouter = express.Router()


jobsrouter .get("/:id",async(req,res)=>{
  const id = req.params.id
  try{
const Jobsdata = await  jobsmodel.findOne({"_id":id})
res.send(Jobsdata)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})

jobsrouter.get("/",async(req,res)=>{
    try{
const jobsdata = await jobsmodel.find()
res.send(jobsdata)
    }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
    }
})

jobsrouter.post("/create",async(req,res)=>{
    const payload = req.body
  try{
const jobsdata = new jobsmodel(payload)
await jobsdata.save()
res.send("Added  Job to Db")

  }catch(err){
console.log(err)
res.send({"msg":"Error while adding Job to Db"})
  }
})

jobsrouter.patch("/update/:id",async(req,res)=>{
    const ID = req.params.id
    const payload = req.body
    try{
  await jobsmodel.findByIdAndUpdate({_id:ID},payload)
  res.send("Jobs Updated successfully")
    }catch(err){
  console.log(err)
    }
  
  })
  
  jobsrouter.delete("/remove/:id",async(req,res)=>{
    const ID = req.params.id
    try{
  await jobsmodel.findByIdAndDelete({_id:ID})
  res.send(`DeLeted the Jobs `)
    }catch(err){
  console.log(err)
    }
  })
  
module.exports={
    jobsrouter
}