const express = require("express");
const router = express.Router();
const genPassword = require("../lib/passwordUtils").genPassword;
const passport = require("passport");
const User = require("../models/User");

router.post(
  "/register",
  (req, res, next) => {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      hash: hash,
      salt: salt,
    });
    var user = newUser
      .save()
      .then((user) => {
        next();
      })
      .catch((err) => {
        res.status(400).send(err);
        return;
      });
  },
  passport.authenticate("local"),
  function (req, res) {
    res.sendStatus(200);
  }
);

router.post("/signin", passport.authenticate("local"), function (req, res) {
  res.sendStatus(200);
});

router.get("/currentUser", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.json({});
  }
});

router.get("/signout", (req, res) => {
  req.logout();
  res.sendStatus("200");
});

module.exports = router;
