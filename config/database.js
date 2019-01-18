if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb://Zarab:Itsmylifeitsmychoice24@ds161134.mlab.com:61134/chirkut"
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost/chirkut"
  };
}
