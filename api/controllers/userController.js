var async = require("async");

// route: /:first_name/:last_name
exports.get_user_info = function (req, res, next) {
  const { first_name, last_name } = req.params;
};

exports.get_all_users = function (req, res, next) {};

exports.create_new_user = function (req, res, next) {
  const { first_name, last_name, phone_number, email, notes } = req.body;
};

exports.update_new_user = function (req, res, next) {
  const { first_name, last_name, phone_number, email, notes } = req.body;
};
