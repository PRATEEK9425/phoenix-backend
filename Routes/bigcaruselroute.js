
const express = require("express")
const { bigcarusel_model } = require("../models/Bigcarauselmodel")



const bigcaruselRoutes = express.Router()

bigcaruselRoutes.get("/:id",async(req,res)=>{
  const id = req.params.id
  try{
const carausel = await  bigcarusel_model.findOne({"_id":id})
res.send(carausel)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})



 bigcaruselRoutes.get("/",async(req,res)=>{
    try{
const carausel = await bigcarusel_model.find()
res.send(carausel)
    }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
    }
})


 bigcaruselRoutes.post("/create",async(req,res)=>{
    const payload = req.body
  try{
const caruseldata = new bigcarusel_model(payload)
await caruseldata.save()
res.send("Added  Image to Db")

  }catch(err){
console.log(err)
res.send({"msg":"Error while adding Image to Db"})
  }
})

 bigcaruselRoutes.patch("/update/:id",async(req,res)=>{
  const ID = req.params.id
  const payload = req.body
  try{
await bigcarusel_model.findByIdAndUpdate({_id:ID},payload)
res.send("Image Updated successfully")
  }catch(err){
console.log(err)
  }

})

bigcaruselRoutes.delete("/:id",async(req,res)=>{
  const ID = req.params.id
  try{
await bigcarusel_model.findByIdAndDelete({_id:ID})
res.send(`DeLeted the Image `)
  }catch(err){
console.log(err)
  }
})

module.exports={
     bigcaruselRoutes
}