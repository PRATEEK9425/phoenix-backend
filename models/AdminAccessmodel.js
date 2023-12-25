const mongoose = require("mongoose")

const adminacess_schema = mongoose.Schema({
    Admin_Accessemail:String,
    Admin_Accesspassword:String

})

const adminaccess_model = mongoose.model("Admin_Access_data",adminacess_schema )

module.exports={
    adminaccess_model
}