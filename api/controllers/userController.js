const { body, validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../utility/response");
const { Op } = require("sequelize");

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

exports.search_user = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();

  username = req.body.username.trim();
  // first_name = req.body.first_name.trim();
  // last_name = req.body.last_name.trim();

  // if (!username.length && !first_name.length && !last_name.length) {
  //   res.status(400).json(errorResponse("no search criteria specified"));
  //   return;
  // }

  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
    return;
  } else {
    // User.findAll({
    //   where: {
    //     [Op.or]: [{ first_name }, { last_name }, { username }],
    //   },
    // })
    // User.findAll({
    //   // [Op.or]: [
    //   where: {
    //     username: {
    //       // $like: "%username%",
    //       [Op.like]: "$(username)%",
    //     },
    //   },
    //   // ],
    // })
    // User.findAll({
    //   where: {
    //     [Op.or]: [
    //       {
    //         username: {
    //           $like: "%$(username)%",
    //         },
    //       },
    //       {
    //         first_name: {
    //           $like: "%$(first_name)%",
    //         },
    //       },
    //       {
    //         last_name: {
    //           $like: "%$(last_name)%",
    //         },
    //       },
    //     ],
    //   },
    // })
    User.findAll({
      where: {
        username: {
          $like: `%${username}%`,
        },
      },
    })
      .then((user) => {
        if (user.length > 0) {
          res.status(200).json(successResponse("user(s) found", user));
          return;
        }

        return Promise.reject();
      })
      .catch((err) => {
        res.status(200).json(errorResponse("no such user exists", err));
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
