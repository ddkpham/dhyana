const Sequelize = require("sequelize");

const db = require("../config/database");

const Project = db.define("project", {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  team_id: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Project;
