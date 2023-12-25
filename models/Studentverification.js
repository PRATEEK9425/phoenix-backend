const mongoose = require("mongoose")

const studentlistschema = mongoose.Schema({
  Registration_Number:Number,
  Name:String,
  Cast:String,
  Age:Number,
  HighestEducation:String,
  Gender:String,
  Father_Name:String,
  Course_Name:String,
  Duration:Number,
  FinalResult:String,
  Address:String,
  Date_of_Birth:String,
  Mobile_No:Number,
  Mail_Id:String,
  Total_Fess:Number,
  Fess_Deposit:Number
})

const studentverificationmodal = mongoose.model("StudentverificationList",studentlistschema)

module.exports={
    studentverificationmodal
}