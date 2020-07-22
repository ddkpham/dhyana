const { body, validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../utility/response");

var User = require("../models/User");

exports.create_new_user = function (req, res, next) {
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();

  user = req.body.username.trim();
  pass = req.body.password.trim();
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    res.json(errorResponse("errors in inputted data"));
    return;
  } else {
    if (user == "" || pass == "") {
      res.json(errorResponse("username or password cannot be null"));
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
        res.json(successResponse("User created successfully", user));
      })
      .catch((err) => {
        res.json(errorResponse("User already exists.", err));
      });
  }
};
