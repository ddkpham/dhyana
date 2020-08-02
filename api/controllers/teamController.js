const { body, validationResult } = require("express-validator");
const Team = require("../models/Team");
const TeamsUsers = require("../models/TeamsUsers");
const { Op } = require("sequelize");

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

exports.add_user = function(req, res, next) {
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();
  const team_id = req.body.team_id;
  const user_id = req.body.user_id;


  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
    return;
  }

  if (!team_id || !user_id) {
    res.status(400).json(errorResponse("missing team_id or user_id"));
    return;
  }

  TeamsUsers.create({
    team_id,
    user_id,
  })
    .then((teamUser) => {
      console.log(teamUser);
      res.status(200).json(successResponse("User added to team successfully", team));
    })
    .catch((err) => {
      res.status(409).json(errorResponse("Could not add user to team.", err));
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
  const { userId } = req.session;
  console.log("exports.view_all -> userId", userId);
  TeamsUsers.findAll({
    where: {
      user_id: userId,
    },
  })
    .then((teams) => {
      console.log("exports.view_all -> teams", teams);
      const teamQuery = teams.map((team) => {
        const {
          dataValues: { team_id },
        } = team;
        return { id: team_id };
      });
      console.log("exports.view_all -> teamQuery", teamQuery);
      Team.findAll({
        where: {
          [Op.or]: teamQuery,
        },
      })
        .then((teams) => {
          res
            .status(200)
            .json(successResponse("Sucessfully found teams", teams));
        })
        .catch((err) => {
          res.status(400).json(errorResponse("Error fetching teams", err));
        });
    })
    .catch((err) => {
      res.status(400).json(errorResponse("Error fetching teams", err));
    });
};
