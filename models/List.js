const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;
const listSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  techId: {
    type: ObjectId,
    ref: "Tech",
  },
});

module.exports = mongoose.model("List", listSchema);
