const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  UserId: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  quality: String,
  feedback: String,
});

module.exports = Feedback = mongoose.model("Feedback", feedbackSchema);
