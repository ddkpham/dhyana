const Sequelize = require("sequelize");

const db = require("../config/database");

const Task = db.define("task", {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  date_created: {
    type: Sequelize.DATE,
  },
  user_id_created: {
    type: Sequelize.INTEGER,
  },
  user_id_assigned: {
    type: Sequelize.INTEGER,
  },
  priority: {
    type: Sequelize.INTEGER,
  },
  time_estimated: {
    type: Sequelize.DOUBLE,
  },
  flag: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Task;
