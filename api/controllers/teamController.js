const { body, validationResult } = require("express-validator");
const Team = require("../models/Team");
const TeamsUsers = require("../models/TeamsUsers");
var User = require("../models/User");
var Project = require("../models/Project");
var ProjectColumns = require("../models/ProjectColumns");
var ColumnsTasks = require("../models/ColumnsTasks");
var Column = require("../models/Column");
const { Op } = require("sequelize");

const { errorResponse, successResponse } = require("../utility/response");

exports.create_team = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.create_team -> req.body", req.body);
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
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.get_user -> req.params", req.params);
  const team_id = req.params.id.trim();

  TeamsUsers.findAll({
    where: {
      team_id: team_id,
    },
    attributes: [`user_id`],
  })
    .then((data) => {
      var usersArray = [];
      for (var i = 0; i < data.length; i++) {
        const {
          dataValues: { user_id: userId },
        } = data[i];
        console.log("userId is:", i, userId);
        usersArray.push(userId);
      }

      if (!usersArray.length) {
        res.status(404).json(errorResponse("Didn't find any users in Team"));
        return;
      }

      User.findAll({
        where: {
          id: {
            [Op.in]: usersArray,
          },
        },
        attributes: [`id`, `username`, `first_name`, `last_name`],
      }).then((users) => {
        if (users.length > 0) {
          res.status(200).json(successResponse("user(s) found", users));
          return;
        }

        return Promise.reject();
      });
    })
    .catch((err) => {
      res.status(404).json(errorResponse("Didn't find any users in Team", err));
    });
};

exports.add_user = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.add_user -> req.body", req.body);

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
  body(req.body).trim().escape().not().isEmpty();
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

  var teamInfo = {};

  const getTeamInfo = async () => {
    try {
      const team = await Team.findAll({
        where: {
          name,
        },
      });

      // get basic team info
      if (team.length) {
        teamInfo = team[0].dataValues;
        console.log("getTeamInfo -> teamInfo", teamInfo);

        // get all projects that team owns, building query for project stats preview
        const projects = await Project.findAll({
          where: {
            team_id: teamInfo.id,
          },
        });

        // get columns for each project
        const projectColumns = await ProjectColumns.findAll({
          where: {
            [Op.or]: projects.map((p) => ({ project_id: p.dataValues.id })),
          },
        });

        // for each column, grab tasks in column
        const columnTasks = await ColumnsTasks.findAll({
          where: {
            [Op.or]: projectColumns.map((p) => ({
              column_id: p.dataValues.column_id,
            })),
          },
        });

        // create column stats by summing up num of tasks
        const columnCountMap = {};
        columnTasks.forEach((c) => {
          const {
            dataValues: { column_id },
          } = c;
          if (!columnCountMap[`${column_id}`]) {
            columnCountMap[`${column_id}`] = 1;
          } else {
            columnCountMap[`${column_id}`] = columnCountMap[`${column_id}`] + 1;
          }
        });

        // append column stats to each column
        const columns = await Column.findAll({
          where: {
            [Op.or]: columnTasks.map((c) => ({ id: c.dataValues.column_id })),
          },
        });

        const columnInfo = columns.map((c) => {
          const info = c.dataValues;
          info.numTasks = columnCountMap[`${c.dataValues.id}`];
          return info;
        });

        // attach column info to respective projects
        const projectInfo = projects.map((p) => {
          const info = p.dataValues;
          info.columns = [];
          // if project id matches pcolumn id, add column info to columninfo array
          projectColumns.forEach((pcolumns) => {
            if (pcolumns.dataValues.project_id == p.dataValues.id) {
              // grab column id and column info
              const cInfo = columnInfo.filter(
                (c) => c.id == pcolumns.dataValues.column_id
              )[0];
              if (cInfo) {
                info.columns.push(cInfo);
              }
            }
          });
          return info;
        });

        // finally attach to team info object
        teamInfo.projects = projectInfo;

        res
          .status(200)
          .json(successResponse("Sucessfully found team", teamInfo));
      } else {
        res.status(404).json(errorResponse("Team not found."));
      }
    } catch (err) {
      res.status(400).json(errorResponse("Error in fetching team info.", err));
    }
  };
  getTeamInfo();
};

exports.view_all = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
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
