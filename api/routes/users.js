var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
const { body, param } = require("express-validator");

const authMiddleware = (req, res, next) => {
  const { userId } = req.session;
  console.log("authMiddleware -> req.session", req.session);
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

router.post("/edit",
  authMiddleware,
  userController.edit_user
);

router.get("/myProfile", userController.get_my_profile);

router.get(
  "/profile/:username",
  authMiddleware,
  [param("username").isLength({ min: 1 })],
  userController.get_user_info
);

router.post(
  "/search/result",
  authMiddleware,
  [body("input").escape()],
  userController.search_user
);

module.exports = router;
