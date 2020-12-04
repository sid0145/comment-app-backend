const mongoose = require("mongoose");

const multiCommentSchema = mongoose.Schema({
  comment: { type: String, required: true },
  postId: { type: String, required: true },
  commentId: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("MultiComment", multiCommentSchema);
