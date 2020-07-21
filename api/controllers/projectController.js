const { body, validationResult } = require("express-validator");
const Project = require("../models/Project");
const Column = require("../models/Column");
const ProjectColumn = require("../models/ProjectColumn");
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
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();
  const name = req.body.name.trim();

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.json(errorResponse("errors in inputted data"));
  }

  if (!name) {
    res.json(errorResponse("missing Project name"));
    return;
  }

  Project.findAll({
    where: {
      name,
    },
  })
    .then((project) => {
      if (project.length) {
        res.json(successResponse("Sucessfully found Project", project));
      } else {
        res.json(errorResponse("Team not found.", err));
      }
    })
    .catch((err) => {
      res.json(
        errorResponse("Team not found. error in request. Check query.", err)
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
        ProjectColumn.create({
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
  console.log(req.body);

  const projectId = req.body.projectId;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.json(errorResponse("errors in inputted data"));
  }

  if (!projectId) {
    res.json(errorResponse("missing projectId"));
    return;
  }

  ProjectColumn.findAll({
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
      }).then((columnResults) => {
        res.json(successResponse("Found project columns", columnResults));
      });
    })
    .catch((err) => res.json(errorResponse("no matching project found", err)));
};
