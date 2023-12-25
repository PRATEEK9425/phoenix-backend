const mongoose = require("mongoose")

const bigcarausel = mongoose.Schema({
   carauselimg:String,
   Title:String
})

const bigcarusel_model = mongoose.model("bigcarusel",bigcarausel)

module.exports={
    bigcarusel_model
}