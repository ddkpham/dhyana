var User = require("../models/User");

exports.create_new_user = function (req, res, next) {
  console.log(req.body);
  const { username, password, first_name, last_name } = req.body;

  User.create({
    first_name,
    last_name,
    username,
    password,
  })
    .then((user) => res.json(user))
    .catch((err) => console.log("Error : ", err));
};
