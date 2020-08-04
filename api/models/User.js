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
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
});

module.exports = User;
