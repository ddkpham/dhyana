var express = require("express");
var router = express.Router();
var projectController = require("../controllers/projectController");

router.post("/create", projectController.create_project);

router.post("/view", projectController.view_project);

module.exports = router;
