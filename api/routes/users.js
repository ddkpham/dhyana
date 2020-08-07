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

router.post(
  "/create",
  [
    body("password").trim().escape().isLength({ min: 1 }),
    body("first_name").trim().escape(),
    body("last_name").trim().escape(),
    body("username").trim().escape().isLength({ min: 1 }),
  ],
  userController.create_new_user
);

router.post(
  "/edit-user",
  authMiddleware,
  [
    body("password").escape(),
    body("first_name").escape(),
    body("last_name").escape(),
    body("biography").escape(),
    body("job_title").escape(),
  ],

  userController.edit_user
);

router.get("/my-profile", authMiddleware, userController.get_my_profile);

router.get(
  "/profile/:username",
  authMiddleware,
  [param("username").isLength({ min: 1 })],
  userController.get_user_info
);

router.get(
  "/info/:id",
  authMiddleware,
  [param("id").isLength({ min: 1 })],
  userController.get_user_from_id
);

router.post(
  "/search/result",
  authMiddleware,
  [body("input").escape()],
  userController.search_user
);

module.exports = router;
