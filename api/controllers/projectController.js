const { body, validationResult } = require("express-validator");
const Project = require("../models/Project");
const Column = require("../models/Column");
const ProjectColumns = require("../models/ProjectColumns");
const ColumnTask = require("../models/ColumnsTasks");
const TeamsUsers = require("../models/TeamsUsers");
const Task = require("../models/Task");
const { errorResponse, successResponse } = require("../utility/response");
const { Op } = require("sequelize");

exports.create_project = function (req, res, next) {
  console.log("exports.create_project -> req.body", req.body);

  body(req.body).trim().escape().not().isEmpty();
  const name = req.body.name.trim();
  const description = req.body.description.trim();
  const team_id = req.body.team_id;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!name || !team_id) {
    res.status(400).json(errorResponse("missing team id or project name"));
    return;
  }

  Project.create({
    name,
    description,
    team_id,
  })
    .then((team) => {
      console.log("exports.create_project -> team", team);
      res
        .status(200)
        .json(successResponse("Project created successfully", team));
    })
    .catch((err) => {
      res.status(409).json(errorResponse("Project exists already.", err));
    });
};

exports.view_project = function (req, res, next) {
  console.log("exports.view_project -> req.params", req.params);

  const name = req.params.name.trim();
  console.log("exports.view_project -> name", name);

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!name) {
    res.status(400).json(errorResponse("missing Project name"));
    return;
  }

  Project.findAll({
    where: {
      name,
    },
  })
    .then((project) => {
      console.log("exports.view_project -> project", project);
      if (project.length) {
        res
          .status(200)
          .json(successResponse("Sucessfully found Project", project));
      } else {
        res.status(404).json(errorResponse("Project not found.", err));
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json(
          errorResponse(
            "Project not found. error in request. Check query.",
            err
          )
        );
    });
};

exports.view_user_specific = function (req, res, next) {
  console.log("exports.view_user_specific -> req.session", req.session);
  const { userId } = req.session;
  console.log("exports.view_user_specific -> userId", userId);

  const findProjects = async () => {
    const teams = await TeamsUsers.findAll({
      where: {
        user_id: userId,
      },
    });
    console.log("findTeams -> teams", teams);
    const teamQuery = teams.map((team) => {
      const {
        dataValues: { team_id },
      } = team;
      return { team_id };
    });
    return Project.findAll({
      where: {
        [Op.or]: teamQuery,
      },
    });
  };
  try {
    findProjects()
      .then((projects) => {
        console.log("findProjects -> projects", projects);
        res
          .status(200)
          .json(successResponse("Sucessfully found projects", projects));
      })
      .catch((err) => {
        res.status(400).json(errorResponse("No projects found", err));
      });
  } catch (err) {
    res.status(400).json(errorResponse("No projects found", err));
  }
};

exports.view_all = function (req, res, next) {
  console.log("exports.view_all -> req", req);
  Project.findAll()
    .then((projects) => {
      console.log("exports.view_all -> projects", projects);
      if (projects.length) {
        res
          .status(200)
          .json(successResponse("Sucessfully found projects", projects));
      } else {
        res.status(404).json(errorResponse("No projects found", err));
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json(
          errorResponse(
            "Projects not found. error in request. Check query.",
            err
          )
        );
    });
};

exports.create_project_column = function (req, res, next) {
  console.log("exports.create_project_column -> req.body", req.body);

  body(req.body).trim().escape().not().isEmpty();
  const projectId = req.body.projectId;
  const columnName = req.body.columnName.trim();
  const columnOrder = req.body.columnOrder;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!projectId || !columnName || !(columnOrder >= 0)) {
    res
      .status(400)
      .json(errorResponse("missing projectId, columnName or column order"));
    return;
  }

  Column.create({
    name: columnName,
    column_order: columnOrder,
  })
    .then((col) => {
      const {
        dataValues: { id: columnId },
      } = col;

      if (columnId) {
        ProjectColumns.create({
          project_id: projectId,
          column_id: columnId,
        })
          .then((result) => {
            res
              .status(200)
              .json(
                successResponse("Sucessfully created column in Project", result)
              );
          })
          .catch((err) => {
            res
              .status(404)
              .json(
                errorResponse(
                  "Error in creating project column. Please double check query.",
                  err
                )
              );
          });
      } else {
        res.json(
          errorResponse(
            "Error in generating column. Message API developers.",
            err
          )
        );
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json(
          errorResponse(
            "Error in creating column. Please double check query.",
            err
          )
        );
    });
};

exports.view_project_columns = function (req, res, next) {
  console.log("exports.view_project_columns -> req.params", req.params);

  const projectId = req.params.projectId;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!projectId) {
    res.status(400).json(errorResponse("missing projectId"));
    return;
  }

  ProjectColumns.findAll({
    where: {
      project_id: projectId,
    },
  })
    .then((result) => {
      const columnQuery = result.map((val) => {
        const {
          dataValues: { column_id },
        } = val;
        return { id: column_id };
      });

      Column.findAll({
        where: {
          [Op.or]: columnQuery,
        },
      }).then(async (columnResults) => {
        console.log(
          "exports.view_project_columns -> columnResults",
          columnResults
        );
        const taskQuery = columnResults.map((val) => {
          const {
            dataValues: { id },
          } = val;
          return { column_id: id };
        });

        try {
          // find tasks for each column
          const tasks = await ColumnTask.findAll({
            where: {
              [Op.or]: taskQuery,
            },
          });
          console.log("exports.view_project_columns -> tasks", tasks);

          const columnInfo = columnResults.map((col) => {
            const {
              dataValues: { id: col_id },
            } = col;
            col.dataValues.tasks = [];
            tasks.forEach((element) => {
              const {
                dataValues: { column_id: owner_id, task_id },
              } = element;

              if (owner_id === col_id) {
                col.dataValues.tasks.push(task_id);
              }
            });
            return col;
          });

          res
            .status(200)
            .json(successResponse("Found project columns", columnInfo));
        } catch (err) {
          (err) =>
            res
              .status(400)
              .json(errorResponse("error in fetching column tasks", err));
        }
      });
    })
    .catch((err) =>
      res.status(404).json(errorResponse("no matching project found", err))
    );
};

exports.create_new_task = function (req, res, next) {
  console.log("exports.create_new_task -> req.body", req.body);

  body(req.body).trim().escape().not().isEmpty();
  const name = req.body.name.trim();
  const column_id = req.body.column_id;
  const project_id = req.body.project_id;
  const description = req.body.description.trim();

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!name || !column_id || !(project_id >= 0)) {
    res
      .status(400)
      .json(errorResponse("missing projectId, columnName or column order"));
    return;
  }

  Task.create({
    name,
    description,
  })
    .then((task) => {
      const {
        dataValues: { id: task_id },
      } = task;
      ColumnTask.create({
        column_id,
        task_id,
      })
        .then((result) => {
          res
            .status(200)
            .json(successResponse("successfully created task", result));
        })
        .catch((err) =>
          res
            .status(400)
            .json(errorResponse("Error in attaching task to column", err))
        );
    })
    .catch((err) =>
      res.status(400).json(errorResponse("Error in creating task", err))
    );
};

exports.get_all_tasks = function (req, res, next) {
  console.log("exports.get_all_tasks -> req.body", req.body);

  body(req.body).trim().escape().not().isEmpty();
  const task_ids = req.body.task_ids;
  console.log("exports.get_all_tasks -> task_ids", task_ids);

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!task_ids.length) {
    res.status(400).json(errorResponse("missing taskIds"));
    return;
  }

  Task.findAll({
    where: {
      [Op.or]: task_ids.map((t) => ({ id: t })),
    },
  })
    .then((result) => {
      res
        .status(200)
        .json(successResponse("Successfully found task data", result));
    })
    .catch((err) =>
      res.status(400).json(errorResponse("Error in finding tasks", err))
    );
};

exports.delete_task = function (req, res, next) {
  console.log("exports.delete_task -> req.params", req.params);
  const task_id = req.params.task_id.trim();

  if (!task_id) {
    res.status(400).json(errorResponse("missing task_id"));
    return;
  }

  ColumnTask.destroy({
    where: {
      task_id,
    },
  })
    .then(() => {
      Task.destroy({
        where: {
          id: task_id,
        },
      })
        .then(() =>
          res.status(200).json(successResponse("successfully deleted task"))
        )
        .catch((err) =>
          res
            .status(400)
            .json(errorResponse("task destroy error: " + err.message))
        );
    })
    .catch((err) =>
      res
        .status(400)
        .json(errorResponse("columntask destroy error: " + err.message))
    );
};
