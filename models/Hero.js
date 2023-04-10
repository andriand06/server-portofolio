const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyLink: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Hero", heroSchema);
