const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("About", aboutSchema);
