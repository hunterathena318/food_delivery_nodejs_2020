const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  price: String
});

module.exports = mongoose.model("Food", schema);
