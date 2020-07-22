const Sequelize = require("sequelize");

const db = require("../config/database");

const Team = db.define("team", {
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Team;
