var express = require("express");
var router = express.Router();
var Contact = require("../models/Contact");
var loginController = require("../controllers/loginController");

/* Login Attempt */
router.post("/", loginController.login_post);

router.get("/", function (req, res, next) {
  res.json({
    confirmation: "success",
    message: "get login",
  });
});

module.exports = router;
