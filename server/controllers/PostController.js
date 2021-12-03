var Post = require("../models/Post");
var multer = require("multer");
var path = require("path");
var fs = require("fs");

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

exports.post_add = [
  upload.single("image"),
  function (req, res, next) {
    var newPost = new Post({
      title: req.body.title,
      user: req.body.user,
      description: req.body.description,
      prereqs: req.body.prereqs,
      tags: req.body.tags,
      submission_date: Date.now(),
      image: {
        data: fs.readFileSync(
          path.join(__dirname, "..", "uploads", req.file.filename)
        ),
        contentType: req.file.mimetype,
      },
      user: req.user,
    });
    newPost.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.send("Successfully added new post to database");
    });
  },
];

exports.post_update = [
  upload.single("image"),
  async (req, res, next) => {
    var newPost = new Post({
      _id: req.body.id,
      title: req.body.title,
      user: req.body.user,
      description: req.body.description,
      prereqs: req.body.prereqs,
      tags: req.body.tags,
      submission_date: Date.now(),
      image: {
        data: fs.readFileSync(
          path.join(__dirname, "..", "uploads", req.file.filename)
        ),
        contentType: req.file.mimetype,
      },
    });

    var result = await Post.findByIdAndUpdate(req.body.id, newPost, {});
    if (result) {
      res.send("Post found and updated");
    } else {
      res.status(404).send("Post not found");
    }
  },
];
