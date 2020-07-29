var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
var loginController = require("../controllers/loginController");

/* Login Attempt */
router.post(
  "/",
  [
    body("password").isLength({ min: 1 }),
    body("username").isLength({ min: 1 }),
  ],
  loginController.login_post
);

router.get("/clearCookie", loginController.clear_cookie);

router.get("/sessionCheck", loginController.session_check);

module.exports = router;
