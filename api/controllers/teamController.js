const { body, validationResult } = require("express-validator");
const Team = require("../models/Team");
const TeamsUsers = require("../models/TeamsUsers");
var User = require("../models/User");
const { Op } = require("sequelize");

const { errorResponse, successResponse } = require("../utility/response");

exports.create_team = function (req, res, next) {
  console.log("exports.create_team -> req.body", req.body);

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
      console.log("exports.create_team -> team", team);
      res.status(200).json(successResponse("Team created successfully", team));
    })
    .catch((err) => {
      res.status(409).json(errorResponse("Team exists already.", err));
    });
};

exports.get_users = function (req, res, next) {
  console.log("exports.get_user -> req.params", req.params);
  const team_id = req.params.id.trim();

  TeamsUsers.findAll ({
    where: {
      team_id: team_id,
    },
    attributes: [`user_id`],
    },
  )
    .then((data) => {
      var usersArray = []
      for (var i = 0; i < data.length; i++) {
        const { dataValues: { user_id : userId } } = data[i]
        console.log("userId is:", i, userId)
        usersArray.push(userId)
      }

      if (!usersArray.length) {
        res.status(400).json(errorResponse("Didn't find any users in Team"));
        return;
      } 

      User.findAll({
        where: {
          id: {
            [Op.in]: usersArray
          }
        },
        attributes: [`id`, `username`, `first_name`, `last_name`],
        },
      )
      .then((users) => {
        if (users.length > 0) {
          res.status(200).json(successResponse("user(s) found", users));
          return;
        }
  
        return Promise.reject();
      })
    })
    .catch((err) => {
      res.status(404).json(errorResponse("Didn't find any users in Team", err));
    });
}

exports.add_user = function (req, res, next) {
  console.log("exports.add_user -> req.body", req.body);

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

  // check if user is already in team

  TeamsUsers.findAll({
    where: {
      team_id,
      user_id,
    },
  })
    .then((data) => {
      if (data.length) {
        res.status(200).json(errorResponse("user is already in team"));
        return;
      }

      TeamsUsers.create({
        team_id,
        user_id,
      })
        .then((team) => {
          console.log("exports.add_user -> team", team);
          res
            .status(200)
            .json(successResponse("User added to team successfully", team));
        })
        .catch((err) => {
          res
            .status(409)
            .json(errorResponse("Could not add user to team.", err));
        });
    })
    .catch((err) => {
      res.status(400).json(errorResponse("error in adding user to team", err));
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
      console.log("exports.view_team -> team", team);
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
