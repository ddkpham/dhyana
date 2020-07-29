var User = require("../models/User");
const { body, validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../utility/response");
const sessionConfig = require("../config/session");

exports.login_post = function (req, res, next) {
  console.log(req.body);
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
      console.log(users);

      if (users.length) {
        const user = users[0];
        const {
          dataValues: { id: userId },
        } = user;
        req.session.userId = userId;
        req.session.save((err) => {
          if (!err) {
            console.log(req.session);
            res.json({
              confirmation: "success",
              data: user,
            });
          }
        });
      } else {
        res.json(errorResponse("wrong username or password"));
      }
    })
    .catch((err) => {
      res.json(errorResponse("wrong username or password", err));
    });
};

exports.clear_cookie = function (req, res, next) {
  console.log("req.session", req.session);
  req.session.destroy((err) => {
    if (err) {
      res.json(
        errorResponse("error: session was not closed. Try again. ", err)
      );
    }
    res.clearCookie(sessionConfig.name);
    res.json(successResponse("successfully logged out"));
  });
};

exports.session_check = function (req, res, next) {
  const { userId } = req.session;
  if (!userId) {
    res.json(errorResponse("Active session not found"));
  } else {
    res.json(successResponse("user has an active session"));
  }
};
