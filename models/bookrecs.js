const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const BookrecSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  user:{
    type: ObjectId,
    required: true,
  }

});

module.exports = mongoose.model("Bookrec", BookrecSchema);