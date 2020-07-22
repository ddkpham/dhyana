const Sequelize = require("sequelize");

const db = require("../config/database");

const Column = db.define("pcolumn", {
  name: {
    type: Sequelize.STRING,
  },
  column_order: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Column;
