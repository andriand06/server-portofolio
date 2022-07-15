const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const tabSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  jobId: [
    {
      type: ObjectId,
      ref: "Job",
    },
  ],
});

module.exports = mongoose.model("Tab", tabSchema);
