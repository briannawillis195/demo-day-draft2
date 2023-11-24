const mongoose = require("mongoose");

const CFReplySchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  message: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  thumbUp: {
    type: Number,
    required: true,
    default: 0
  },
  reply:{
    type: Boolean,
    reqired: true
  }
});

module.exports = mongoose.model("CFReply", CFReplySchema);