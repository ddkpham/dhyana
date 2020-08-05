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

router.get("/all", projectController.view_all);

router.get("/user-specific/all", projectController.view_user_specific);

router.get(
  "/:name",
  [param("name").isLength({ min: 2 })],
  projectController.view_project
);

//TEMP for debuggin
router.post("/create/column", projectController.create_project_column);

router.get("/:projectId/columns", projectController.view_project_columns);

router.post(
  "/create/task",
  [
    body("name").isLength({ min: 1 }).escape(),
    body("description").isLength({ min: 1 }).escape(),
    body("user_id_created").isLength({ min: 1 }),
    body("user_id_assigned").isLength({ min: 1 }),
    body("priority").isLength({ min: 1 }),
    body("time_estimated").isLength({ min: 1 }),
    body("flag").isLength({ min: 1 }).escape(),
    body("column_id").isLength({ min: 1 }),
    body("project_id").isLength({ min: 1 }),
  ],
  projectController.create_new_task
);

router.post(
  "/task/:task_id/move",
  [body("task_ids").isLength({ min: 1 })],
  projectController.move_task
);

router.post(
  "/tasks",
  [body("task_ids").isLength({ min: 1 })],
  projectController.get_all_tasks
);

router.delete("/task/:task_id/delete", projectController.delete_task);

router.post(
  "/task/:task_id/edit",
  [
    body("id").isLength({ min: 1 }).escape(),
    body("name").isLength({ min: 1 }).escape(),
    body("description").isLength({ min: 1 }).escape(),
    body("user_id_assigned").isLength({ min: 1 }),
    body("priority").isLength({ min: 1 }),
    body("time_estimated").isLength({ min: 1 }),
    body("time_elapsed").isLength({ min: 1 }),
    body("flag").isLength({ min: 1 }).escape(),
  ],
  projectController.edit_task
);

module.exports = router;
