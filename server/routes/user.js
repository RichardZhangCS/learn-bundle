var express = require("express");
const User = require("../models/User");
var router = express.Router();

router.get("/name/:username", async function (req, res, next) {
  var user = await User.findOne({ username: req.params.username }).lean();
  if (!user.username) {
    res.status(404).send("User is not found");
  }
  if (user.avatar)
    user.avatar.dataBase64Encoded = user.avatar.data.toString("base64");
  res.json(user);
});

router.get("/id/:userid", async function (req, res, next) {
  var user = await User.findById(req.params.userid).lean();
  if (!user.username) {
    res.status(404).send("User is not found");
  }
  if (user.avatar)
    user.avatar.dataBase64Encoded = user.avatar.data.toString("base64");
  res.json(user);
});

module.exports = router;
