var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
const { body, param } = require("express-validator");

router.get("/create", function (req, res, next) {
  res.json({
    confirmation: "success",
    message: "get create user",
  });
});

router.post("/create", userController.create_new_user);

router.get(
  "/:username",
  [param("username").isLength({ min: 1 })],
  userController.get_user_info
);

router.post(
  "/search/result",
  [body("input").escape()],
  userController.search_user
);

router.get("/update/result", function (req, res, next) {
  res.json({
    confirmation: "success",
    message: "get update user",
  });
});

router.post(
  "/update/result",
  [
    body("username").escape(),
    body("password").escape(),
    body("first_name").escape(),
    body("last_name").escape(),
  ],
  userController.update_user
);

module.exports = router;
