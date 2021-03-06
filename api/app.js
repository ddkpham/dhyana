var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var session = require("express-session");
var sessionConfig = require("./config/session");
var helmet = require("helmet");
var directives = require("./config/csp");

var authRouter = require("./routes/auth");
var loginRouter = require("./routes/login");
var userRouter = require("./routes/users");
var indexRouter = require("./routes/index");
var teamRouter = require("./routes/team");
var projectRouter = require("./routes/project");

var app = express();

// prevents attackers from knowing that express is used on the backend
// app.disable("x-powered-by");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors({ credentials: true, origin: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// add session middleware.
app.use(session(sessionConfig));
// enables Content Security Policy
// app.use(helmet.contentSecurityPolicy({ directives: directives }));

// authentication/session middleware
const authMiddleware = (req, res, next) => {
  const { userId } = req.session;
  console.log("authMiddleware -> req.session", req.session);
  if (!userId) {
    res.redirect("/unauthorized");
  } else {
    next();
  }
};

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/team", authMiddleware, teamRouter);
app.use("/project", authMiddleware, projectRouter);
app.use("/unauthorized", authRouter);

var db = require("./config/database");

// test db
db.authenticate()
  .then(() => console.log("Database is connected..."))
  .catch((err) => console.log("Error: " + err));

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
  res.render("error");
});

module.exports = app;
