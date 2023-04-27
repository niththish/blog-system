const mongoose = require("mongoose");

const comments = mongoose.Schema({
  name: {
    type: String,
  },
  comment: {
    type: String,
  },
});

const pollSchema = mongoose.Schema({
  question: {
    type: String,
    required: [true, "poll question must be specified"],
  },
  image_url: {
    type: String,
  },
  option1: {
    type: String,
    required: [true, "poll option1 is required"],
  },
  option2: {
    type: String,
    required: [true, "poll option2 is required"],
  },
  option3: {
    type: String,
    default: "",
  },
  option4: {
    type: String,
    default: "",
  },
  option1Count: {
    type: Number,
    default: 0,
  },
  option2Count: {
    type: Number,
    default: 0,
  },
  option3Count: {
    type: Number,
    default: 0,
  },
  option4Count: {
    type: Number,
    default: 0,
  },
  votedIp: {
    type: [String],
  },
  createdAt: {
    type: Date,
    required: [true, "poll created time required"],
  },
  comments: [comments],
});

module.exports = mongoose.model("polls", pollSchema);
