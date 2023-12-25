const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()
const { adminaccessmodel } = require("../models/AdminAccessmodel");

const adminaccessroutes = express.Router()

adminaccessroutes.post("/register", async (req, res) => {
    const {Admin_Accessemail,Admin_Accesspassword } = req.body;
    try {
      const Userpresent = await adminaccessmodel.find({Admin_Accessemail });
  
      if (Userpresent.length > 0) {
        res.send("Present");
      } else {
        const saltRounds = 8;
        bcrypt.hash(Admin_Accesspassword , saltRounds, function (err, Secure_password) {
          if (err) {
            console.log(err);
          } else {
            const user = new adminaccessmodel({
              Admin_Accessemail,
              Admin_Accesspassword: Secure_password,
             
            });
            user.save();
            res.send("User Registered");
          }
        });
      }
    } catch (err) {
      res.send("Present");
      console.log(err);
    }
  });


  adminaccessroutes.post("/login", async (req, res) => {
    const {Admin_Accessemail,Admin_Accesspassword } = req.body;
  
    try {
      const user = await adminaccessmodel.find({ Admin_Accessemail });
      const Hashed_password = user[0].Admin_Accesspassword ;
      if (user.length > 0) {
        bcrypt.compare(Admin_Accesspassword, Hashed_password, (err, result) => {
          if (result) {
            const token = jwt.sign({ phonix: process.env.Payload_for_user }, process.env.Passkey);
            res.send({ msg: "Admin Excess Granted", token: token });
          } else {
            res.send("Wrong credentials");
          }
        });
      } else {
        res.send("Wrong Credentials");
      }
    } catch (err) {
      res.send("Wrong Credentials");
      console.log(err);
    }
  });


  module.exports={
    adminaccessroutes
  }