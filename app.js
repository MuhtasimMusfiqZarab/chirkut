const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express(); //initialize application

//Map global promise - get rid of warning (Did not work here)
mongoose.Promise = global.Promise;

//Connect To Mongoose
mongoose
  .connect("mongodb://localhost/chirkut")
  .then(() => console.log("Mongodb connected ..."))
  .catch(err => console.log(err)); // this can be mLab DAtabase or mlab database

//Load Idea Models
require("./models/Idea");
const Idea = mongoose.model("ideas");

//Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//How middleware  works
// app.use((req, res, next) => {
//   console.log(Date.now());
//   next();
// });

// Index route
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", { title: title }); // here 'index' is the name of the handlebar
}); // Here dynamic Data is passed by the second argument

// About route
app.get("/about", (req, res) => {
  res.render("about"); // here 'about' is the name of the handlebar
});

//Idea Index Page
app.get("/ideas", (req, res) => {
  Idea.find({})
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", {
        ideas: ideas
      });
    });
});

//About Idea Form
app.get("/ideas/add", (req, res) => {
  res.render("ideas/add"); // here 'about' is the name of the handlebar
});

//Process Form
app.post("/ideas", (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
  }
  if (!req.body.details) {
    errors.push({ text: "Please add some details" });
  }
  if (errors.length > 0) {
    res.render("ideas/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };
    new Idea(newUser).save().then(idea => {
      res.redirect("/ideas");
    });
  }
});

// port initialization
const port = 5000;

app.listen(port, () => {
  console.log(`Server Stated on port ${port}`);
});
