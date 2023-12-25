const mongoose = require("mongoose")

const course_detailsschema =mongoose.Schema({
    username:String,
    useremail:String,
    Age:Number,
    Gender:String,
    HighestEducation:String,
    Coursename:String,
    Mobile_Number:Number,
    Address:String

})

const course_detailsmodel = mongoose.model("UserCourseDetails",course_detailsschema)


module.exports={
    course_detailsmodel
}