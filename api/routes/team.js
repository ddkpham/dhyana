var express = require("express");
var router = express.Router();
var teamController = require("../controllers/teamController");
const { body, param } = require("express-validator");

router.post("/create", teamController.create_team);

router.get("/all", teamController.view_all);

router.get(
  "/:name",
  [param("name").isLength({ min: 2 })],
  teamController.view_team
);

router.post("/addUser", teamController.add_user);

module.exports = router;
