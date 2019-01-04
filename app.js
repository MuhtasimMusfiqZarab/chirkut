const express = require("express");
const exphbs = require("express-handlebars");

const app = express(); //initialize application

//Handlebars middleware(got it from the git express-handlebars documentations)
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//How middleware  works
// app.use((req, res, next) => {
//   console.log(Date.now());
//   next();
// });

// Index route
app.get("/", (req, res) => {
  const title = "WELCOME";
  res.render("index", { title: title }); // here 'index' is the name of the handlebar
}); // Here dynamic Data is passed by the second argument

// About route
app.get("/about", (req, res) => {
  res.render("about"); // here 'about' is the name of the handlebar
});

// port initialization
const port = 5000;

app.listen(port, () => {
  console.log(`Server Stated on port ${port}`);
});
