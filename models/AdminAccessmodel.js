const mongoose = require("mongoose")

const adminacessschema = mongoose.Schema({
    Admin_Accessemail:String,
    Admin_Accesspassword:String

})

const adminaccessmodel = mongoose.model("Admin_Access_data",adminacessschema )

module.exports={
    adminaccessmodel
}