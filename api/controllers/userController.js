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
      res.json(errorResponse("username or password cannot be null"));
      return;
    }

    User.findAll({
      where: {
        username,
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
        res.status(200).json(errorResponse("user already exists", err));
      });
  }
};
