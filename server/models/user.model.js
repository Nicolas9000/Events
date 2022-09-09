const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    unique: true,
    lowercase: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: "../../client/src/assets/DefaultProfile.png",
  },

  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  token: {
    type: String,
    required: true,
    trim: true,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
