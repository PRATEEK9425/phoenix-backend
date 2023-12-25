const mongoose = require("mongoose")

const applyjobs_schema=mongoose.Schema({
    Name: String,
Experience : Number,
Mobile_no : Number,
Email : String,
HighestEducation:String,
Applyforcourse:String,
Location: String,
Age : Number,
Current_ctc : Number,
Expected_ctc : Number

})

const applyjobs_model=mongoose.model("JobsApplyData",applyjobs_schema)

module.exports={applyjobs_model}