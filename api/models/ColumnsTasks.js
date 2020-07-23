const Sequelize = require("sequelize");

const db = require("../config/database");

const ColumnsTask = db.define("columnstask", {
  task_id: {
    type: Sequelize.INTEGER,
  },
  column_id: {
    type: Sequelize.INTEGER,
  },
});

module.exports = ColumnsTask;
