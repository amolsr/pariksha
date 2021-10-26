const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  one: {
    type: String,
    required: true,
  },
  two: {
    type: String,
    required: true,
  },
  three: {
    type: String,
    required: true,
  },
  four: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  QuestionPic: {
    type: String
  }
});

module.exports = Question = mongoose.model("Question", QuestionSchema);
