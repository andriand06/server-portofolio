const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;
const techSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  listId: [
    {
      type: ObjectId,
      ref: "List",
    },
  ],
});

module.exports = mongoose.model("Tech", techSchema);
