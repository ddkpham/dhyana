var User = require("../models/User");
const { body, validationResult } = require("express-validator");

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
  }).then((user) => {
    console.log(user);
    if (user.length) {
      res.json({
        confirmation: "success",
        data: user,
      });
    } else {
      res.json({
        confirmation: "login failed. wrong username or password",
        data: user,
      });
    }
  });
};
