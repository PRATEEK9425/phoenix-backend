const express = require("express");
const nodemailer = require("nodemailer");
const { course_detailsmodel } = require("../models/CourseDetailsmodel");
require('dotenv').config()
const maildetailsroutes = express.Router();

// SENDING MAIL ROUTES
maildetailsroutes.post("/senddetails", async (req, res) => {
  const {useremail,username,Age,Gender,Coursename,Mobile_Number,Address,HighestEducation} = req.body;
  try {
    const emailcheck = await course_detailsmodel.find({ useremail,Coursename });

    if (emailcheck.length > 0) {
      res.send("Already Applied course");
    } else {
      const userVerfication = new course_detailsmodel({
        useremail,
        username,
        Age,
        Coursename,
        Gender,
        Mobile_Number,
        Address,
        HighestEducation
      });
      userVerfication.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.Mail_send_email,
          pass:  process.env.Mailsend_Pass,
        },
      });

      const message = {
        from: '"Phoenix Institute 👻" <phoneixinstitute542@gmail.com>',
        to: `${useremail}`,
        subject: "Phoneix Course Enrollment 📧 ",
        text: "Hey There You are at right place PHONEIX INSTITUE",
        html: `<b> Hey ${username} 
                <br/>
                Your are registered with ${Coursename} in Phoneix Institute
                our Team will get back to you shortly on your Registered Mobile 
                Number ${Mobile_Number} 
                <br/>
                Thanks For Enrollment in Phoenix Institute .
                In case you have any Query or doubt Regarding course You
                can reach out us on our Registered Email Id or Number Provided 
                in Mail Itself .
                <br/>
                Happy Learning and Best Wishes from Phoneix Institute 
                (🚀 A initiative to skill India and People's Of India 🚀)
                Regards 
                 Phoneix Institue 
                  Registered Email Id:phoneixinstitute542@gmail.com
                  Mobile : 9829237799
                </b>`,
      };

      transporter.sendMail(message).then((info) => {
        res.send("Applied successfully");
      });
    }
  } catch (error) {
    res.send("Already Applied course");
    console.log(error);
  }
});

module.exports = {
  maildetailsroutes,
};
