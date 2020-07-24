const { body, validationResult } = require("express-validator");
const Team = require("../models/Team");
const { errorResponse, successResponse } = require("../utility/response");

exports.create_team = function (req, res, next) {
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();
  const name = req.body.name.trim();

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.json(errorResponse("errors in inputted data"));
    return;
  }

  if (!name) {
    res.json(errorResponse("missing team name"));
    return;
  }

  Team.create({
    name,
  })
    .then((team) => {
      console.log(team);
      res.json(successResponse("Team created successfully", team));
    })
    .catch((err) => {
      res.json(errorResponse("Team exists already.", err));
    });
};

exports.view_team = function (req, res, next) {
  const name = req.params.name.trim();
  console.log("exports.view_team -> name", name);

  const errors = validationResult(req.params);
  if (!errors.isEmpty()) {
    res.json(errorResponse("errors in inputted data"));
  }

  if (!name) {
    res.json(errorResponse("missing team name"));
    return;
  }

  Team.findAll({
    where: {
      name,
    },
  })
    .then((team) => {
      if (team.length) {
        res.json(successResponse("Sucessfully found team", team));
      } else {
        res.json(errorResponse("Team not found.", err));
      }
    })
    .catch((err) => {
      res.json(errorResponse("Team not found.", err));
    });
};

exports.view_all = function(req, res, next){
  Team.findAll().then((teams) => {
    res.json(successResponse("Sucessfully found team", teams));
  })
  .catch((err) => {
    res.json(errorResponse("Error fetching teams", err));
  });
}
