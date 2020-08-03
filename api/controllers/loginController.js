var User = require("../models/User");
const { body, validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../utility/response");
const sessionConfig = require("../config/session");

exports.login_post = function (req, res, next) {
  console.log("exports.login_post -> req.body", req.body);
  const { username, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.findAll({
    where: {
      username: username,
      password: password,
    },
  })
    .then((users) => {
      console.log("exports.login_post -> users", users);

      if (users.length) {
        const user = users[0];
        const {
          dataValues: { id: userId },
        } = user;
        req.session.userId = userId;
        req.session.save((err) => {
          if (!err) {
            console.log("exports.login_post -> req.session", req.session);
            res.json({
              confirmation: "success",
              data: user,
            });
          }
        });
      } else {
        res.status(401).json(errorResponse("wrong username or password"));
      }
    })
    .catch((err) => {
      res.status(401).json(errorResponse("wrong username or password", err));
    });
};

exports.clear_cookie = function (req, res, next) {
  console.log("exports.clear_cookie -> req.session", req.session);
  req.session.destroy((err) => {
    if (err) {
      res.json(
        errorResponse("error: session was not closed. Try again. ", err)
      );
    }
    res.clearCookie(sessionConfig.name);
    res.status(200).json(successResponse("successfully logged out"));
  });
};

exports.session_check = function (req, res, next) {
  const { userId } = req.session;
  if (!userId) {
    res.status(440).json(errorResponse("active session not found"));
  } else {
    res.status(200).json(successResponse("user has an active session"));
  }
};
