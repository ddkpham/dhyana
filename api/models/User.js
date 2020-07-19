const Sequelize = require("sequelize");

const db = require("../config/database");

const User = db.define("user", {
<<<<<<< HEAD
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
=======
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
>>>>>>> login
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
