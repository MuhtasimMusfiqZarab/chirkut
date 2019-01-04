const express = require("express");

const app = express(); //initialize application
const port = 5000;

app.listen(port, () => {
  console.log(`Server Stated on port ${port}`);
});
