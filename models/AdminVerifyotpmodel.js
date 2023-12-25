const mongoose = require("mongoose")

const adminschema_verify = mongoose.Schema({
    Admin_email_verify:String,
    Username:String,
    email_OTP :Number,
    isAuth :Boolean
})

const adminverifymail_model = mongoose.model("Admin_OTP",adminschema_verify )

module.exports={
    adminverifymail_model
}