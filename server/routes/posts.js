var express = require("express");
const PostController = require("../controllers/PostController");
const Post = require("../models/Post");
var router = express.Router();

router.post("/add", PostController.post_add);

router.get("/all", async (req, res, next) => {
  var results = await Post.find({}).populate("user").lean();

  for (var post of results) {
    post.image.dataBase64Encoded = post.image.data.toString("base64");
  }
  res.send(results);
});

router.get("/one/:id", async (req, res, next) => {
  var post = await Post.findById(req.params.id).populate("user").lean();
  post.image.dataBase64Encoded = post.image.data.toString("base64");
  res.send(post);
});

router.post("/update", PostController.post_update);

module.exports = router;
