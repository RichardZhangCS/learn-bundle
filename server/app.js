var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
var passport = require("passport");
var crypto = require("crypto");
var LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo")(session);

var indexRouter = require("./routes/index");
var postRouter = require("./routes/posts");
var authRouter = require("./routes/auth");

require("dotenv").config();
var app = express();

var cors = require("cors");
const User = require("./models/User");

app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var dev_db_url =
  "mongodb+srv://rz-development:mZbXh170JciThTI5@sandbox.czp9v.mongodb.net/tutorial-bundler?retryWrites=true&w=majority";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const sessionStore = new MongoStore({
  mongooseConnection: db,
  collection: "sessions",
});

app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/post", postRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
