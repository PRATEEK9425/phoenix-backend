const mongoose = require("mongoose")


const announceschema= mongoose.Schema({
    imgurl:String,
    Title:String,
   Description:String,
   LastDate :String

})

const announcemodel = mongoose.model("AnnouncementData",announceschema)

module.exports={
    announcemodel
}

