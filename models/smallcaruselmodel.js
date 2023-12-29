const mongoose = require("mongoose")

const smallcarausel = mongoose.Schema({
   carauselimg:String,
   Title:String,
   Description:String
})

const smallcaruselmodel = mongoose.model("smallcarusel",smallcarausel)

module.exports={
    smallcaruselmodel
}