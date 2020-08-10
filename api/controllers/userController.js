const { Op } = require("sequelize");
const { body, validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../utility/response");
const sequelize = require("../config/database");

const User = require("../models/User");
const TeamsUsers = require("../models/TeamsUsers");
const Team = require("../models/Team");
const Projects = require("../models/Project");
const Comment = require("../models/Comment");
const Task = require("../models/Task");
const ColumnsTasks = require("../models/ColumnsTasks");

exports.get_user_info = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log(
    "exports.get_user_info -> req.params.username",
    req.params.username
  );
  username = req.params.username;
  console.log("exports.get_user_info -> req.params", req.params);
  const errors = validationResult(username);

  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
    return;
  } else {
    if (username == "") {
      res
        .status(400)
        .json(errorResponse("username or password cannot be null"));
      return;
    }

    User.findAll({
      where: {
        username,
      },
    })
      .then((user) => {
        console.log("exports.get_user_info -> user", user);
        if (user.length) {
          res.status(200).json(successResponse("user exists", user));
          return;
        }

        return Promise.reject();
      })
      .catch((err) => {
        res.status(404).json(errorResponse("user doesn't exist", err));
      });
  }
};

exports.get_my_profile = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.get_my_profile -> req.session", req.session);
  const { userId: id } = req.session;
  console.log("exports.get_my_profile -> req.session", req.session);
  const errors = validationResult(id);

  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
    return;
  } else {
    User.findAll({
      where: {
        id,
      },
    })
      .then((user) => {
        console.log("exports.get_my_profile -> user", user);
        if (user.length) {
          res.status(200).json(successResponse("user exists", user));
          return;
        }

        return Promise.reject();
      })
      .catch((err) => {
        res.status(404).json(errorResponse("user doesn't exist", err));
      });
  }
};

exports.get_user_from_id = function (req, res) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.get_user_info -> req.params", req.params);
  const id = req.params.id;
  var userInfo = {};

  const getUserInfo = async () => {
    try {
      const user = await User.findAll({
        where: {
          id: id,
        },
        attributes: [`id`, `username`, `first_name`, `last_name`],
      });

      if (user.length > 0) {
        userInfo = user[0].dataValues;

        // get team info
        const teams = await TeamsUsers.findAll({
          where: {
            user_id: id,
          },
          attributes: [`team_id`],
        });
        const teamQuery = teams.map((t) => ({ id: t.dataValues.team_id }));
        const teamInfo = await Team.findAll({
          where: {
            [Op.or]: teamQuery,
          },
        });
        userInfo.teams = teamInfo;

        // get project info
        const projects = await Projects.findAll({
          where: {
            [Op.or]: teams.map((t) => ({ team_id: t.dataValues.team_id })),
          },
        });
        userInfo.projects = projects;

        res
          .status(200)
          .json(
            successResponse("successfully found user and user info", userInfo)
          );
      } else {
        res.status(404).json(errorResponse("no such user exists"));
      }
    } catch (err) {
      res.status(400).json(errorResponse("error in fetching user info", err));
    }
  };
  getUserInfo();
};

exports.search_user = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.search_user -> req.body", req.body);

  input = req.body.input.trim();
  console.log("exports.search_user -> input", input);

  if (!input.length) {
    res.status(400).json(errorResponse("no search criteria specified"));
    return;
  }

  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    res
      .status(400)
      .json(errorResponse("error in input", { errors: errors.array() }));
    return;
  } else {
    User.findAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${input}%`,
            },
          },
          {
            first_name: {
              [Op.like]: `%${input}%`,
            },
          },
          {
            last_name: {
              [Op.like]: `%${input}%`,
            },
          },
        ],
      },
      attributes: [`id`, `username`, `first_name`, `last_name`],
    })
      .then((user) => {
        console.log("exports.search_user -> user", user);
        if (user.length > 0) {
          res.status(200).json(successResponse("user(s) found", user));
          return;
        }

        return Promise.reject();
      })
      .catch((err) => {
        res.status(404).json(errorResponse("no such user exists", err));
      });
  }
};

exports.create_new_user = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.create_new_user -> req.body", req.body);

  user = req.body.username.trim();
  pass = req.body.password.trim();
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
    return;
  } else {
    if (user == "" || pass == "") {
      res
        .status(400)
        .json(errorResponse("username or password cannot be null"));
      return;
    }

    const { username, password, first_name, last_name } = req.body;

    User.create({
      first_name,
      last_name,
      username,
      password,
    })
      .then((user) => {
        console.log("exports.create_new_user -> user", user);
        res
          .status(200)
          .json(successResponse("user created successfully", user));
      })
      .catch((err) => {
        res.status(409).json(errorResponse("user already exists", err));
      });
  }
};

exports.delete_user = async function (req, res, next) {
  console.log("exports.delete_user -> req.body", req.body);

  const id = req.body.id;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!id) {
    res.status(400).json(errorResponse("missing user id"));
    return;
  }

  // managed transaction - sequelize will automatically handle commits and rollbacks

  try {
    console.log("starting transaction....");
    const result = await sequelize.transaction(async (transaction) => {
      // delete all comments that the user has made
      const deletedComments = await Comment.destroy({
        where: {
          user_id: id,
        },
        transaction,
      });

      console.log(`Deleted ${deletedComments} Comments by user ${id}`);

      // delete all tasks created by the user. Table constraint.

      // first delete it from columnsTasks
      const taskData = await Task.findAll({
        where: {
          user_id_created: id,
        },
        transaction,
      });
      console.log("taskData", taskData);
      const taskQuery = taskData.map((t) => {
        const {
          dataValues: { id },
        } = t;
        return { task_id: id };
      });

      const deletedColumnTasks = await ColumnsTasks.destroy({
        where: {
          [Op.or]: taskQuery,
        },
        transaction,
      });

      console.log(`Deleted ${deletedColumnTasks} rows from ColumnTasks`);

      const deletedTasks = await Task.destroy({
        where: {
          user_id_created: id,
        },
        transaction,
      });

      console.log(`Deleted ${deletedTasks} Tasks by user ${id}`);

      // set all tasks that were assigned to user to null for assigned id column
      const updatedTasks = await Task.update(
        { user_id_assigned: null },
        {
          where: {
            user_id_assigned: id,
          },
          transaction,
        }
      );
      console.log(`Updated ${updatedTasks} Tasks by user ${id}`);

      // delete user from all teams it is a part of now

      const teamsUserRemovedFrom = await TeamsUsers.destroy({
        where: {
          user_id: id,
        },
        transaction,
      });

      console.log(`Removed user from  ${teamsUserRemovedFrom} teams`);

      // finally delete user!
      const deletedUser = await User.destroy({
        where: {
          id,
        },
        transaction,
      });

      console.log(`Deleted user!`);

      return deletedUser;
    });
    console.log("finished transaction....");
    console.log("exports.delete user -> Number of deleted users: ", result);
    res.status(200).json(successResponse("successfully deleted user!"));
  } catch (err) {
    console.log("err", err);
    res.status(200).json(errorResponse("Error occured in deleting user", err));
  }
};

exports.edit_user = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  const { userId: id } = req.session;
  console.log("exports.edit_user -> req.body, id", req.body, id);

  pass = req.body.password.trim();
  const errorsBody = validationResult(req.body);
  const errors = validationResult(id);

  if (!errors.isEmpty() || !errorsBody.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
    return;
  } else {
    const { password, first_name, last_name, biography, job_title } = req.body;
    User.update(
      {
        first_name,
        last_name,
        password,
        biography,
        job_title,
      },
      {
        where: { id },
      }
    )
      .then((user) => {
        console.log("exports.edit_user -> user", user);
        if (user.length) {
          res
            .status(200)
            .json(successResponse("User modified successfully.", user));
          return;
        }

        return Promise.reject();
      })
      .catch((err) => {
        res.status(400).json(errorResponse("User couldn’t be modified.", err));
      });
  }
};
