var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.post("/", userController.create_new_user);

router.get("/", function (req, res, next) {
  res.json({
    confirmation: "success",
    message: "get create user",
  });
});

module.exports = router;
