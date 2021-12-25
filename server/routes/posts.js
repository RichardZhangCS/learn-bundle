var express = require("express");
const PostController = require("../controllers/PostController");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
var router = express.Router();
var { DateTime } = require("luxon");

router.post("/", PostController.post_add);

router.get("/", async (req, res, next) => {
  var results = await Post.find({}).populate("user").lean();
  for (var post of results) {
    if (post.image) {
      post.image.dataBase64Encoded = post.image.data.toString("base64");
    }
    post.submission_date_formatted = DateTime.fromJSDate(
      post.submission_date
    ).toLocaleString(DateTime.DATE_MED);
  }
  res.send(results);
});

router.get("/:id", async (req, res, next) => {
  var post = await Post.findById(req.params.id)
    .populate("user")
    .populate({
      path: "comments",
      populate: { path: "user" },
    })
    .lean();
  if (post.image) {
    post.image.dataBase64Encoded = post.image.data.toString("base64");
  }
  post.submission_date_formatted = DateTime.fromJSDate(
    post.submission_date
  ).toLocaleString(DateTime.DATETIME_MED);
  for (var comment of post.comments) {
    comment.submission_date_formatted = DateTime.fromJSDate(
      comment.submission_date
    ).toLocaleString(DateTime.DATETIME_MED);
    let commentAvatar = comment.user.avatar;
    if (commentAvatar) {
      commentAvatar.dataBase64Encoded = commentAvatar.data.toString("base64");
    }
  }
  res.send(post);
});

router.put("/:id", PostController.post_update);

router.post("/:id/comments", async (req, res, next) => {
  try {
    var newComment = new Comment({
      user: req.user,
      text: req.body.text,
      submission_date: Date.now(),
    });
    await newComment.save();
    await Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: newComment },
    });
    res.send("Comment created successfully");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
