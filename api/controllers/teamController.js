const { body, validationResult } = require("express-validator");
const Team = require("../models/Team");
const { errorResponse, successResponse } = require("../utility/response");

exports.create_team = function (req, res, next) {
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();
  const name = req.body.name.trim();

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
    return;
  }

  if (!name) {
    res.status(400).json(errorResponse("missing team name"));
    return;
  }

  Team.create({
    name,
  })
    .then((team) => {
      console.log(team);
      res.status(200).json(successResponse("Team created successfully", team));
    })
    .catch((err) => {
      res.status(409).json(errorResponse("Team exists already.", err));
    });
};

exports.view_team = function (req, res, next) {
  const name = req.params.name.trim();
  console.log("exports.view_team -> name", name);

  const errors = validationResult(req.params);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!name) {
    res.status(400).json(errorResponse("missing team name"));
    return;
  }

  Team.findAll({
    where: {
      name,
    },
  })
    .then((team) => {
      if (team.length) {
        res.status(200).json(successResponse("Sucessfully found team", team));
      } else {
        res.status(404).json(errorResponse("Team not found.", err));
      }
    })
    .catch((err) => {
      res.status(404).json(errorResponse("Team not found.", err));
    });
};

exports.view_all = function (req, res, next) {
  Team.findAll()
    .then((teams) => {
      res.status(200).json(successResponse("Sucessfully found team", teams));
    })
    .catch((err) => {
      // status code is 404 assuming "Error fetching teams" means no team found
      res.status(404).json(errorResponse("Error fetching teams", err));
    });
};
