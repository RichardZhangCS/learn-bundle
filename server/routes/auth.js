const express = require("express");
const router = express.Router();
const genPassword = require("../lib/passwordUtils").genPassword;
const passport = require("passport");

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
  function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.sendStatus(200);
      });
    })(req, res, next);
  }
);

router.post("/signin", passport.authenticate("local"), function (req, res) {
  res.sendStatus(200);
});

router.get("/isAuthenticated", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("Is Authenticated");
  } else {
    res.send("Is Not Authenticated");
  }
});

module.exports = router;
