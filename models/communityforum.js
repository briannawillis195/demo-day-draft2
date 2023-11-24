const mongoose = require("mongoose");

const CommunityForumSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model("CommunityForum", CommunityForumSchema);
