const mongoose = require("mongoose")

const smallcarausel = mongoose.Schema({
   carauselimg:String,
   Title:String,
   Description:String
})

const smallcarusel_model = mongoose.model("smallcarusel",smallcarausel)

module.exports={
    smallcarusel_model
}