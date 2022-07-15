const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const jobSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  tabId: {
    type: ObjectId,
    ref: "Tab",
  },
});

module.exports = mongoose.model("Job", jobSchema);
