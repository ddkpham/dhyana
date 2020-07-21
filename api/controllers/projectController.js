const { body, validationResult } = require("express-validator");
const Project = require("../models/Project");
const { errorResponse, successResponse } = require("../utility/response");

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
