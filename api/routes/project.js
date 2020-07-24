var express = require("express");
var router = express.Router();
var projectController = require("../controllers/projectController");
const { body, param } = require("express-validator");

router.post(
  "/create",
  [
    body("name").isLength({ min: 1 }),
    body("description").isLength({ min: 1 }).escape(),
    body("team_id").isLength({ min: 1 }),
  ],
  projectController.create_project
);

router.get(
  "/:name",
  [param("name").isLength({ min: 2 })],
  projectController.view_project
);

router.get("/all", projectController.view_all);

//TEMP for debuggin
router.post("/column", projectController.create_project_column);

router.get("/:projectId/columns", projectController.view_project_columns);

router.post(
  "/task",
  [
    body("name").isLength({ min: 1 }),
    body("description").isLength({ min: 1 }).escape(),
    body("column_id").isLength({ min: 1 }),
    body("project_id").isLength({ min: 1 }),
  ],
  projectController.create_new_task
);

router.post(
  "/tasks",
  [body("task_ids").isLength({ min: 1 })],
  projectController.get_all_tasks
);

module.exports = router;
