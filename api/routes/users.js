var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.get("/signup", function (req, res, next) {
  res.json({
    confirmation: "success",
    message: "get create user",
  });
});

router.post("/signup", userController.create_new_user);

module.exports = router;
