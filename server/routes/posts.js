var express = require("express");
const PostController = require("../controllers/PostController");
const Post = require("../models/Post");
var router = express.Router();
var { DateTime } = require("luxon");

router.post("/add", PostController.post_add);

router.get("/all", async (req, res, next) => {
  var results = await Post.find({}).populate("user").lean();

  for (var post of results) {
    post.image.dataBase64Encoded = post.image.data.toString("base64");
    post.submission_date_formatted = DateTime.fromJSDate(
      post.submission_date
    ).toLocaleString(DateTime.DATE_MED);
  }
  res.send(results);
});

router.get("/one/:id", async (req, res, next) => {
  var post = await Post.findById(req.params.id).populate("user").lean();
  post.image.dataBase64Encoded = post.image.data.toString("base64");
  post.submission_date_formatted = DateTime.fromJSDate(
    post.submission_date
  ).toLocaleString(DateTime.DATETIME_MED);
  res.send(post);
});

router.post("/update", PostController.post_update);

module.exports = router;
