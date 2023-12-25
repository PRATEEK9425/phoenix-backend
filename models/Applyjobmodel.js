const mongoose = require("mongoose")

const applyjobsschema=mongoose.Schema({
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

const applyjobsmodel=mongoose.model("JobsApplyData",applyjobsschema)

module.exports={applyjobsmodel}