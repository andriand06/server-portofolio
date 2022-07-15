const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const toolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  projectId: [
    {
      type: ObjectId,
      ref: "Project",
    },
  ],
});

module.exports = mongoose.model("Tool", toolSchema);
