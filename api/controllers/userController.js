const { Op } = require("sequelize");
const { body, validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../utility/response");

var User = require("../models/User");

exports.get_user_info = function (req, res, next) {
  username = req.params.username;
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
      attributes: [`username`, `first_name`, `last_name`],
    })
      .then((user) => {
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
  const { userId: id } = req.session;
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
        if (user.length) {
          res.status(200).json(successResponse("user exists", user));
          return;
        }

        return Promise.reject();
      })
      .catch((err) => {
        res.status(200).json(errorResponse("user doesn't exist", err));
      });
  }
};

exports.search_user = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();

  input = req.body.input.trim();

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
      attributes: [`username`, `first_name`, `last_name`],
    })
      .then((user) => {
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
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();

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
        res
          .status(200)
          .json(successResponse("user created successfully", user));
      })
      .catch((err) => {
        res.status(409).json(errorResponse("user already exists", err));
      });
  }
};

exports.edit_user = function (req, res, next) {
  const { userId: id } = req.session;
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
        if (user.length) {
          res.status(200).json(successResponse("user exists", user));
          return;
        }

        return Promise.reject();
      })
      .catch((err) => {
        res.status(200).json(errorResponse("user doesn't exist", err));
      });
  }
};
