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
  res.status(200).json(successResponse("testing login", []));
});

module.exports = router;
