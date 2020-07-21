const Sequelize = require("sequelize");

const db = require("../config/database");

const ProjectColumn = db.define("projectcolumn", {
  project_id: {
    type: Sequelize.INTEGER,
  },
  column_id: {
    type: Sequelize.INTEGER,
  },
});

module.exports = ProjectColumn;
