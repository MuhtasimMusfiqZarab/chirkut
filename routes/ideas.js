const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//Load Helper
const { ensureAuthenticated } = require("../helpers/auth");
//Load Idea Models
require("../models/Idea");
const Idea = mongoose.model("ideas");

//Idea Index Page
router.get("/", ensureAuthenticated, (req, res) => {
  Idea.find({})
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", {
        ideas: ideas
      });
    });
});

//Add Idea Form
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("ideas/add"); // here 'about' is the name of the handlebar
});

//Edit Idea Form
router.get("/edit/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render("ideas/edit", {
      idea: idea
    });
  });
});

//Process Form
router.post("/", ensureAuthenticated, (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
  }
  if (!req.body.details) {
    errors.push({ text: "Please add some details" });
  }
  if (errors.length > 0) {
    res.render("/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newIdea = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newIdea).save().then(idea => {
      req.flash("success_msg", "Idea Added");
      res.redirect("/ideas");
    });
  }
});

//Edit Form Process
router.put("/:id", ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    //new values
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save().then(idea => {
      req.flash("success_msg", "Idea Updated");
      res.redirect("/ideas");
    });
  });
});

//Delete Idea
router.delete("/:id", ensureAuthenticated, (req, res) => {
  Idea.remove({
    _id: req.params.id
  }).then(() => {
    req.flash("success_msg", "Idea Removed");
    res.redirect("/ideas");
  });
});

module.exports = router;
