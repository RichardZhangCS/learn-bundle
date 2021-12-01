var express = require("express");
const PostController = require("../controllers/PostController");
const Post = require("../models/Post");
var router = express.Router();

router.post("/add", PostController.post_add);

router.get("/all", async (req, res, next) => {
  console.log(req.isAuthenticated());
  var results = await Post.find({}).lean();
  for (var post of results) {
    post.image.dataBase64Encoded = post.image.data.toString("base64");
  }
  res.send(results);
});

router.post("/update", PostController.post_update);

module.exports = router;
