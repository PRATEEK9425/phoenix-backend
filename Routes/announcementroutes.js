
const express = require("express")
const { announcemodel } = require("../models/announcement")

const announceroutes = express.Router()

announceroutes.get("/:id",async(req,res)=>{
  const id = req.params.id
  try{
const data = await  announcemodel.findOne({"_id":id})
res.send(data)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})

 announceroutes.get("/",async(req,res)=>{
    try{
const Announcement = await announcemodel.find()
res.send(Announcement)
    }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
    }
})


 announceroutes.post("/create",async(req,res)=>{
    const payload = req.body
  try{
const data = new announcemodel(payload)
await data.save()
res.send("Added  Data to Db")

  }catch(err){
console.log(err)
res.send({"msg":"Error while adding Image to Db"})
  }
})

 announceroutes.patch("/update/:id",async(req,res)=>{
  const ID = req.params.id
  const payload = req.body
  try{
await announcemodel.findByIdAndUpdate({_id:ID},payload)
res.send("Data Updated successfully")
  }catch(err){
console.log(err)
  }

})

announceroutes.delete("/remove/:id",async(req,res)=>{
  const ID = req.params.id
  try{
await announcemodel.findByIdAndDelete({_id:ID})
res.send(`DeLeted the Data `)
  }catch(err){
console.log(err)
  }
})

module.exports={
     announceroutes
}