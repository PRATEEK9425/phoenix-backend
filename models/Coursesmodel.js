const mongoose = require("mongoose")

const courses_schema = mongoose.Schema({
    userimg:String,
    name:String,
    course :String,
    Address:String,
    Highest_Education:String
})

const courses_model = mongoose.model("Courses",courses_schema)

module.exports={
    courses_model
}