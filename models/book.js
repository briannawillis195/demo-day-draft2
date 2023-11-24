const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  status:{
    type: String,
    required: false
  },
  user:{
    type: ObjectId,
    required: true,
  }

});

module.exports = mongoose.model("Book", BookSchema);