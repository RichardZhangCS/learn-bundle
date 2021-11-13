var express = require("express");
var router = express.Router();

router.post("/", (req, res, next) => {
  res.send("Successfully called the post router");
});
router.get("/", (req, res, next) => {
  res.send("Successfully called the post router");
});

module.exports = router;
