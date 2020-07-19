var User = require("../models/User");

exports.login_post = function (req, res, next) {
  console.log(req.body);
  const { username, password } = req.body;
  User.findAll({
    where: {
      username: username,
      password: password,
    },
  }).then((user) => {
    console.log(user);
    if (user.length) {
      res.json({
        confirmation: "Success",
        data: user,
      });
    } else {
      res.json({
        confirmation: "Wrong username or password. Login failed.",
        data: user,
      });
    }
  });
};
