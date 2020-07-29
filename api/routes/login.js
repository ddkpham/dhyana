var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
var loginController = require("../controllers/loginController");
const { errorResponse, successResponse } = require("../utility/response");

/* Login Attempt */
router.post(
  "/",
  [
    body("password").isLength({ min: 1 }),
    body("username").isLength({ min: 1 }),
  ],
  loginController.login_post
);

router.get("/", function (req, res, next) {
  console.log("req.session", req.session);
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
  // req.session.userId = 2;
  // res.status(200).send(req.session);
});

module.exports = router;
