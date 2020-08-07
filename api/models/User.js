const Sequelize = require("sequelize");

const db = require("../config/database");

const User = db.define("user", {
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  job_title: {
    type: Sequelize.STRING,
  },
  biography: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
