const { body, validationResult } = require("express-validator");
const Project = require("../models/Project");
const Column = require("../models/Column");
const ProjectColumns = require("../models/ProjectColumns");
const ColumnTask = require("../models/ColumnsTasks");
const Task = require("../models/Task");
const { errorResponse, successResponse } = require("../utility/response");
const { Op } = require("sequelize");

exports.create_project = function (req, res, next) {
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();
  const name = req.body.name.trim();
  const description = req.body.description.trim();
  const team_id = req.body.team_id;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.json(errorResponse("errors in inputted data"));
  }

  if (!name || !team_id) {
    res.json(errorResponse("missing team id or project name"));
    return;
  }

  Project.create({
    name,
    description,
    team_id,
  })
    .then((team) => {
      console.log(team);
      res.json(successResponse("Project created successfully", team));
    })
    .catch((err) => {
      res.json(errorResponse("Project exists already.", err));
    });
};

exports.view_project = function (req, res, next) {
  console.log(req.params);

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
      if (project.length) {
        res
          .status(200)
          .json(successResponse("Sucessfully found Project", project));
      } else {
        res.status(200).json(errorResponse("Project not found.", err));
      }
    })
    .catch((err) => {
      res
        .status(200)
        .json(
          errorResponse(
            "Project not found. error in request. Check query.",
            err
          )
        );
    });
};

exports.create_project_column = function (req, res, next) {
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();
  const projectId = req.body.projectId;
  const columnName = req.body.columnName.trim();
  const columnOrder = req.body.columnOrder;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.json(errorResponse("errors in inputted data"));
  }

  if (!projectId || !columnName || !(columnOrder >= 0)) {
    res.json(errorResponse("missing projectId, columnName or column order"));
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
            res.json(
              successResponse("Sucessfully created column in Project", result)
            );
          })
          .catch((err) => {
            res.json(
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
      res.json(
        errorResponse(
          "Error in creating column. Please double check query.",
          err
        )
      );
    });
};

exports.view_project_columns = function (req, res, next) {
  console.log(req.params);

  const projectId = req.params.projectId;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.json(errorResponse("errors in inputted data"));
  }

  if (!projectId) {
    res.json(errorResponse("missing projectId"));
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

          res.json(successResponse("Found project columns", columnInfo));
        } catch (err) {
          (err) =>
            res.json(errorResponse("error in fetching column tasks", err));
        }
      });
    })
    .catch((err) => res.json(errorResponse("no matching project found", err)));
};

exports.create_new_task = function (req, res, next) {
  console.log(req.body);

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
  console.log(req.body);

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
