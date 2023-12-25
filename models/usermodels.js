const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    Mob_number:Number
    
})

const usermodel = mongoose.model("User_registered",userschema)

module.exports={
    usermodel
}