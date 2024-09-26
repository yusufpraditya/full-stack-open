const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  favoriteGenre: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
