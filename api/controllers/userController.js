const { body, validationResult } = require("express-validator");
var User = require("../models/User");

exports.create_new_user = function (req, res, next) {
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();

  user = req.body.username.trim();
  pass = req.body.password.trim();
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    res.send("Error(s) in the inputted data or data format.");
    res.next();
  } else {
    if (user == "" || pass == "") {
      res.send("Username/Password can't be null.");
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
          confirmation: "User created successfully.",
          data: user,
        });
      })
      .catch((err) => {
        res.json({
          confirmation: "User already exists.",
          err: err,
        });
      });
  }
};
