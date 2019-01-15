const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

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
    res.send("passed");
  }
});

module.exports = router;
