const mongoose = require("mongoose");

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
  option1Count: {
    type: Number,
    default: 0,
  },
  option2Count: {
    type: Number,
    default: 0,
  },
  votedIp: {
    type: [String],
  },
});

module.exports = mongoose.model("polls", pollSchema);
