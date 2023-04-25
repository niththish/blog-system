const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    minLength: [4, "username must be atleast 4 characters"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [4, "password must be atleast 4 characters"],
  },
});

module.exports = mongoose.model("admin", adminSchema);
