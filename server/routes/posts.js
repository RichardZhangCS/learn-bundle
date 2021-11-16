var express = require("express");
const PostController = require("../controllers/PostController");
var router = express.Router();

router.post("/add", PostController.post_add);

router.get("/", (req, res, next) => {
  res.send("Successfully called the post router");
});

module.exports = router;
