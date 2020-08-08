const Sequelize = require("sequelize");

const db = require("../config/database");

const Comment = db.define("comment", {
  task_id: {
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  date_created: {
    type: Sequelize.DATE,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Comment;
