const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "blog title is required"],
  },
  category: {
    type: String,
    required: [true, "blog category is required"],
    emum: ["cinema", "news", "education", "review"],
  },
  image_url: {
    type: String,
  },
  content: {
    type: String,
    required: [true, "blog content required"],
  },
  createdAt: {
    type: Date,
    required: [true, "blog created time reruired"],
  },
});

module.exports = mongoose.model("blogs", blogSchema);
