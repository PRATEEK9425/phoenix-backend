
const express = require("express")
const { smallcaruselmodel } = require("../models/smallcaruselmodel")




const smallcaruselRoutes = express.Router()

smallcaruselRoutes.get("/",async(req,res)=>{
    try{
const carausel = await smallcaruselmodel.find()
res.send(carausel)
    }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
    }
})

smallcaruselRoutes.get("/:id",async(req,res)=>{
  const id = req.params.id
  try{
const data = await  smallcaruselmodel.findOne({"_id":id})
res.send(data)
  }catch(err){
console.log(err)
res.send({"msg":"Err while gettting data"})
  }
})


smallcaruselRoutes.post("/create",async(req,res)=>{
    const payload = req.body
  try{
const caruseldata = new smallcaruselmodel(payload)
await caruseldata.save()
res.send("Added  Image to Db")

  }catch(err){
console.log(err)
res.send({"msg":"Error while adding Image to Db"})
  }
})

smallcaruselRoutes.patch("/update/:id",async(req,res)=>{
  const ID = req.params.id
  const payload = req.body
  try{
await smallcaruselmodel.findByIdAndUpdate({_id:ID},payload)
res.send("Data Updated successfully")
  }catch(err){
console.log(err)
  }

})

smallcaruselRoutes.delete("/:id" ,async(req,res)=>{
  const ID = req.params.id
  try{
await smallcaruselmodel.findByIdAndDelete({_id:ID})
res.send(`DeLeted the Data `)
  }catch(err){
console.log(err)
  }
})

module.exports={
    smallcaruselRoutes
}