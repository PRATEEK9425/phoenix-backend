const mongoose = require("mongoose")

const adminschema = mongoose.Schema({
    Admin_name:String,
    Admin_email:String,
    Admin_password:String

})

const adminmodel = mongoose.model("Admin_Registeration",adminschema )

module.exports={
    adminmodel
}