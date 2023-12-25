const mongoose = require("mongoose")

const mailschema = mongoose.Schema({
    useremail:String,
    username:String,
    email_OTP :Number,
    isAuth :Boolean
})

const mailmodel = mongoose.model("EmailVerifictaion",mailschema)

module.exports={
    mailmodel
}