const Sequelize = require("sequelize");

const db = require("../config/database");

const Task = db.define("task", {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Task;
