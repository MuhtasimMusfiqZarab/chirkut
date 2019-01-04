const express = require("express");

const app = express(); //initialize application

//How middleware  works
app.use((req, res, next) => {
  console.log(Date.now());
  next();
});

// Index route
app.get("/", (req, res) => {
  res.send("INDEX!");
});

// About route
app.get("/about", (req, res) => {
  res.send("ABOUT");
});

// port initialization
const port = 5000;

app.listen(port, () => {
  console.log(`Server Stated on port ${port}`);
});
