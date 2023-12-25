const mongoose = require("mongoose")

const bigcarausel = mongoose.Schema({
   carauselimg:String,
   Title:String
})

const bigcaruselmodel = mongoose.model("bigcarusel",bigcarausel)

module.exports={
    bigcaruselmodel
}