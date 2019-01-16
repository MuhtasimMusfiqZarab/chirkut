const express = require("express");
const mongoose = require("mongoose");
const bcrypy = require("bcryptjs");
//const passport = require("passport");
const router = express.Router();

//Load User Model
require("../models/User");
const User = mongoose.model("users");

//User Login Route
router.get("/login", (req, res) => {
  res.render("./users/login");
});
//User Register Route
router.get("/register", (req, res) => {
  res.render("./users/register");
});

//Register Form  Post
router.post("/register", (req, res) => {
  let errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push({ text: `Passwords Don't Match` });
  }
  if (req.body.password.length < 4) {
    errors.push({ text: `Password Must be at least 4 Characters` });
  }
  if (errors.length > 0) {
    res.render("./users/register", {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        req.flash("error_msg", "Email Already Registered");
        res.redirect("/users/register");
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypy.genSalt(10, (err, salt) => {
          bcrypy.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash("success_msg", "You are now registered & can log in");
                res.redirect("/users/login");
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

module.exports = router;
