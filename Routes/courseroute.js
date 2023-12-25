const express = require("express")
const { coursesmodel } = require("../models/Coursesmodel")

const courseroute = express.Router()


courseroute.get("/allcourses" ,async(req,res)=>{
    try{
const courses_data = await coursesmodel.find()
res.send(courses_data)
    }catch(err){
        console.log(err);
        res.send({"msg":"Err while Getting courses data"})
    }
})


courseroute.post("/create",async(req,res)=>{
    const payload = req.body
    try{
const userdata = new coursesmodel(payload)
userdata.save()
res.send({"msg":"New user opting for course data Entered"})
    }catch(err){
console.log(err);
res.send({"msg":"Err while posting courses data"})
    }
})

// update Routes 
courseroute.patch("/update/:id",async(req,res)=>{
    const payload = req.body
    const Id = req.params.id
  try{
await coursesmodel.findByIdAndUpdate({_id:Id},payload)
res.send("Db Updated")
  }catch(err){
console.log(err);
res.send({"Msg":"Not ABLE TO Update"})
  }
  } )
    
    courseroute.delete("/remove/:id" ,async(req,res)=>{
       const ID = req.params.id
       try{
        await coursesmodel.findByIdAndDelete(({_id:ID})) 
        res.send({"msg":`User With Id ${ID} Removed`})
       }catch(err){
        console.log(err);
        res.send({"Msg":"Not ABLE TO Delete"})
          }
    })



module.exports={
    courseroute
}