const express = require("express")
const { connection } = require("./utils/db")
const { registerroutes } = require("./Routes/userRegister")
const { courseroute } = require("./Routes/courseroute")
const { AuthMiddlewear } = require("./Authorization/Authmiddlewear")
const cors = require("cors")
const { mailroutes } = require("./Routes/mailroutes")
const { bigcaruselRoutes } = require("./Routes/bigcaruselroute")
const { smallcaruselRoutes } = require("./Routes/smallcaruselroutes")
const { mailDetailsroutes } = require("./Routes/coursedetailroute")
const { jobsrouter } = require("./Routes/jobsroutes")
const { applyjobsrouter } = require("./Routes/applyjobsroutes")
const { announceroutes } = require("./Routes/announcementroutes")
const { Student_Verification_Routes } = require("./Routes/StudentVerificationRoutes")
const { admin_routes} =require("./Routes/adminroutes")
const { adminroutes_otpcheck } = require("./Routes/Adminotpmailcheck")
const { adminaccess_routes } = require("./Routes/Adminaccessroutes")
require('dotenv').config()

const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("App is WORKING")
})
app.use("/bigcarl",bigcaruselRoutes)
app.use("/smallcaral",smallcaruselRoutes)
app.use("/user",registerroutes)
app.use("/mailverify",mailroutes)
app.use("/coursedetails",mailDetailsroutes)
app.use("/jobsupdate",jobsrouter)
app.use("/applyjobs",applyjobsrouter)
app.use("/announce",announceroutes)
// admin req
app.use("/adminaccess",adminaccess_routes)
app.use("/studentlist",Student_Verification_Routes)
app.use("/mainadmin", admin_routes)
app.use("/courses",courseroute)
app.use("/adminotp",adminroutes_otpcheck)
app.use(AuthMiddlewear)


app.listen(process.env.Port_no,async(req,res)=>{
    try{
await connection
console.log("Connected To db");
    }catch(err){
console.log(err);
    }
    console.log("Connected at port 3500");
})