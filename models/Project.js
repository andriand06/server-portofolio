const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  external: {
    type: String,
    required: true,
  },
  toolId: [
    {
      type: ObjectId,
      ref: "Tool",
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
