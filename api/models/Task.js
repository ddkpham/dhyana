const Sequelize = require("sequelize");

const db = require("../config/database");

const Task = db.define("task", {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  // activity_log: {
  //   type: Sequelize.ARRAY[String],
  // },
  user_id_create: {
    type: Sequelize.INTEGER,
  },
  date_created: {
    type: Sequelize.DATE,
  },
  priority: {
    type: Sequelize.INTEGER,
  },
  time_estimated: {
    type: Sequelize.DOUBLE,
  },
  time_elapsed: {
    type: Sequelize.DOUBLE,
  },
  user_id_assigned: {
    type: Sequelize.INTEGER,
  },
  flag: {
    type: Sequelize.BOOLEAN,
  },
  title: {
    type: Sequelize.STRING,
  },
  date_modified: {
    type: Sequelize.DATE,
  },
  num_changes: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Task;
