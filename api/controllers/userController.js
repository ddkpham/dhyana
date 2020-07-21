const { body, validationResult } = require("express-validator");
var User = require("../models/User");

exports.create_new_user = function (req, res, next) {
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();

  user = req.body.username.trim();
  pass = req.body.password.trim();
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    res.json({
      confirmation: "failed",
      data: [],
      message: "errors in inputted data",
    });
    res.next();
  } else {
    if (user == "" || pass == "") {
      res.json({
        confirmation: "failed",
        data: [],
        message: "username or password can't be null",
      });
      return next();
    }

    const { username, password, first_name, last_name } = req.body;

    User.create({
      first_name,
      last_name,
      username,
      password,
    })
      .then((user) => {
        res.json({
          confirmation: "success",
          data: user,
          message: "User created successfully.",
        });
      })
      .catch((err) => {
        res.json({
          confirmation: "failed",
          data: [],
          err: err,
          message: "User already exists.",
        });
      });
  }
};
