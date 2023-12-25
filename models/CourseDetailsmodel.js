const mongoose = require("mongoose")

const coursedetailsschema =mongoose.Schema({
    username:String,
    useremail:String,
    Age:Number,
    Gender:String,
    HighestEducation:String,
    Coursename:String,
    Mobile_Number:Number,
    Address:String

})

const coursedetailsmodel = mongoose.model("UserCourseDetails",coursedetailsschema)


module.exports={
    coursedetailsmodel
}