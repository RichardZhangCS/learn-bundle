const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
});

module.exports = mongoose.model("User", UserSchema);
