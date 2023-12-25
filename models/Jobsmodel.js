const mongoose = require("mongoose")

const jobschema=mongoose.Schema({
    JobImage :String,
Job_title:String,
Job_type:String,
Location:String ,
Education:String,
Salary:Number,
Experience :Number,
job_description :String

})


const jobs_model =mongoose.model("Jobsdata",jobschema)

module.exports={
    jobs_model
}