const Sequelize = require("sequelize");

const db = require("../config/database");

const TeamsUsers = db.define("teamsuser", {
  team_id: {
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
});

module.exports = TeamsUsers;
