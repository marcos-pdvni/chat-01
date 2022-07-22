const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  secretQuestion: {
    type: String,
    required: true,
  },
  secretAnswer: {
    type: String,
    required: true,
    select: false,
  },
  profileImage: {
    type: String,
  },
  friends: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
