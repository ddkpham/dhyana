var express = require("express");
var router = express.Router();
var teamController = require("../controllers/teamController");

router.post("/create", teamController.create_team);

router.post("/view", teamController.view_team);

module.exports = router;
