var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
const { body, param } = require("express-validator");

const redirectLogin = (req, res, next) => {
  const { userId } = req.session;
  console.log("redirectLogin -> req.session", req.session);
  if (!userId) {
    res.redirect("/unauthorized");
  } else {
    next();
  }
};

router.get("/create", function (req, res, next) {
  res.json({
    confirmation: "success",
    message: "get create user",
  });
});

router.post("/create", userController.create_new_user);

router.get(
  "/:username",
  redirectLogin,
  [param("username").isLength({ min: 1 })],
  userController.get_user_info
);

router.post(
  "/search/result",
  redirectLogin,
  [body("input").escape()],
  userController.search_user
);

module.exports = router;
