const mongoose = require("mongoose")

const coursesschema = mongoose.Schema({
    userimg:String,
    name:String,
    course :String,
    Address:String,
    Highest_Education:String
})

const coursesmodel = mongoose.model("Courses",coursesschema)

module.exports={
    coursesmodel
}