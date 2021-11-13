var Post = require("../models/Post");

exports.post_add = function (req, res, next) {
  var newPost = new Post({
    title: req.body.title,
    user: req.body.user,
    description: req.body.description,
    prereqs: req.body.prereqs,
    tags: req.body.tags,
    submission_date: Date.now(),
  });
  newPost.save((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send("Successfully added new post to database");
  });
};
