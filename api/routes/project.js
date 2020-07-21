var express = require("express");
var router = express.Router();
var projectController = require("../controllers/projectController");

router.post("/create", projectController.create_project);

router.post("/view", projectController.view_project);

//TEMP for debuggin
router.post("/column", projectController.create_project_column);

module.exports = router;
