var express = require("express");
const User = require("../models/User");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname);
  },
});

var upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

router.get("/name/:username", async function (req, res, next) {
  var user = await User.findOne({ username: req.params.username })
    .populate("posts")
    .lean();
  if (!user.username) {
    res.status(404).send("User is not found");
  }
  if (user.avatar)
    user.avatar.dataBase64Encoded = user.avatar.data.toString("base64");
  if (user.posts) {
    for (var post of user.posts) {
      if (post.image) {
        post.image.dataBase64Encoded = post.image.data.toString("base64");
      }
    }
  }
  res.json(user);
});

router.get("/id/:userid", async function (req, res, next) {
  var user = await User.findById(req.params.userid).populate("posts").lean();
  if (!user.username) {
    res.status(404).send("User is not found");
  }

  if (user.avatar)
    user.avatar.dataBase64Encoded = user.avatar.data.toString("base64");
  if (user.posts) {
    for (var post of user.posts) {
      if (post.image) {
        post.image.dataBase64Encoded = post.image.data.toString("base64");
      }
    }
  }
  res.json(user);
});

router.put(
  "/id/:userid/avatar",
  upload.single("avatar"),
  async function (req, res, next) {
    if (req.user._id != req.params.userid) {
      res.status(403).send("Unauthorized to change user");
    }
    try {
      var user = await User.findById(req.params.userid);
      if (!user.username) {
        res.status(404).send("User is not found");
      }
      if (!user.avatar) {
        user.avatar = {};
      }
      user.avatar = req.file
        ? {
            data: fs.readFileSync(
              path.join(__dirname, "..", "uploads", req.file.filename)
            ),
            contentType: req.file.mimetype,
          }
        : null;
      await user.save();
      res.status(200).send("Successfully updated profile picture");
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
);

router.put("/id/:userid/username", async function (req, res, next) {
  if (req.user._id != req.params.userid) {
    return res.status(403).send("Unauthorized to change user");
  }
  try {
    var user = await User.findById(req.params.userid);
    if (!user.username) {
      return res.status(404).send("User is not found");
    }
    var userWithSameUsername = await User.findOne({
      username: req.body.username,
    });

    if (
      userWithSameUsername &&
      userWithSameUsername.username === req.body.username
    ) {
      return res.status(400).send("Username already taken");
    }
    user.username = req.body.username;
    await user.save();
    res.status(200).send("Successfully updated username");
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
