const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypy = require("bcryptjs");

//Load User Model

const User = mongoose.model("users");

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      console.log(password);
    })
  );
};
