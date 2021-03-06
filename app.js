const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const app = express(); //initialize application
const path = require("path");

//Load Routes
const ideas = require("./routes/ideas");
const users = require("./routes/users");

//Passport Config
require("./config/passport")(passport);

//DB config
const db = require("./config/database");
//Map global promise - get rid of warning (Did not work here)
mongoose.Promise = global.Promise;

//Connect To Mongoose
mongoose
  .connect(db.mongoURI)
  .then(() => console.log("Mongodb connected ..."))
  .catch(err => console.log(err)); // this can be mLab DAtabase or mlab database

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

//Static folder
app.use(express.static(path.join(__dirname, "public")));

//Method Override middleware
app.use(methodOverride("_method"));

//Express sesson middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//coonnect-flash middleware

app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Index route
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", { title: title }); // here 'index' is the name of the handlebar
}); // Here dynamic Data is passed by the second argument

// About route
app.get("/about", (req, res) => {
  res.render("about"); // here 'about' is the name of the handlebar
});

//Use Routes
app.use("/ideas", ideas);
app.use("/users", users);

// port initialization
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Stated on port ${port}`);
});
