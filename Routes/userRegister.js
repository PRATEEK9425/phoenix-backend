const express = require("express");
const { usermodel } = require("../models/usermodels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()
const registerroutes = express.Router();

// one user by id
registerroutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await usermodel.findOne({ _id: id });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Err while gettting data" });
  }
});

// all user get
registerroutes.get("/", async (req, res) => {
  try {
    const Announcement = await usermodel.find();
    res.send(Announcement);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Err while gettting data" });
  }
});

registerroutes.post("/checkmail", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await usermodel.find({ email });

    if (user.length > 0) {
      res.send("Present");
    } else {
      res.send("NoT Present");
    }
  } catch (err) {
    res.send("NoT Present");
    res.send(err);
  }
});

registerroutes.post("/register", async (req, res) => {
  const { name, email, password, Mob_number } = req.body;
  try {
    const Userpresent = await usermodel.find({ email });

    if (Userpresent.length > 0) {
      res.send("Present");
    } else {
      const saltRounds = process.env.saltRounds
      bcrypt.hash(password, saltRounds, function (err, Secure_password) {
        if (err) {
          console.log(err);
        } else {
          const user = new usermodel({
            name,
            email,
            password: Secure_password,
            Mob_number,
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

registerroutes.delete("/removeuser/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await usermodel.findByIdAndDelete({ _id: ID });
    res.send(`DeLeted the Jobs `);
  } catch (err) {
    console.log(err);
  }
});

registerroutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usermodel.find({ email });
    const Hashed_password = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, Hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ phonix: process.env.Payload_for_user}, process.env.Passkey);
          res.send({ msg: "Login Successful", token: token });
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

// ADMIN PASS CHANGE
registerroutes.patch( "/updateuser/:id" , async (req, res) => {
  const ID = req.params.id;
  const { name, email, password, Mob_number } = req.body;
  try {
    const saltRounds = 8;
    bcrypt.hash(password, saltRounds, async (err, Secure_password) => {
      if (err) {
        console.log(err);
      } else {
        await usermodel.findByIdAndUpdate(
          { _id: ID },
          { name, email, password: Secure_password, Mob_number }
        );

        res.send("User Password Updated successfully");
      }
    });

    // ----
  } catch (err) {
    console.log(err);
  }
});

// RESET PASSWORD FOR USER
registerroutes.patch("/updatepass", async (req, res) => {
  const { email, password } = req.body;
  const payload = req.body;

  try {
    const user = await usermodel.find({ email });
    let ID = user[0]._id;
    if (user.length > 0) {
      const saltRounds = 8;
      bcrypt.hash(password, saltRounds, async (err, Secure_password) => {
        if (err) {
          console.log(err);
        } else {
          await usermodel.findByIdAndUpdate(
            { _id: ID },
            { password: Secure_password }
          );
          res.send("Updated successfully");
        }
      });
    } else {
      res.send("Not updated");
    }
  } catch (err) {
    console.log(err);
    res.send("Not updated");
  }
});

module.exports = {
  registerroutes,
};
