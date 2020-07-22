var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.get("/create", function (req, res, next) {
  res.json({
    confirmation: "success",
    message: "get create user",
  });
});

router.post("/create", userController.create_new_user);

router.get("/getuser", userController.get_user_info);

module.exports = router;
