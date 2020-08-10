var express = require("express");
var router = express.Router();
var teamController = require("../controllers/teamController");
const { body, param } = require("express-validator");

router.post("/create", teamController.create_team);

router.post("/delete", [body("id")], teamController.delete_team);

router.post(
  "/delete/user",
  [body("user_id"), body("team_id")],
  teamController.delete_user_from_team
);

router.get("/all", teamController.view_all);

router.get(
  "/:name",
  [param("name").isLength({ min: 2 })],
  teamController.view_team
);

router.post("/add-user", teamController.add_user);

router.get(
  "/:id/users",
  [param("id").isLength({ min: 1 })],
  teamController.get_users
);

module.exports = router;
