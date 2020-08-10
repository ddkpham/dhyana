const { body, validationResult } = require("express-validator");
const Project = require("../models/Project");
const Column = require("../models/Column");
const ProjectColumns = require("../models/ProjectColumns");
const ColumnTask = require("../models/ColumnsTasks");
const TeamsUsers = require("../models/TeamsUsers");
const Comment = require("../models/Comment");
const Task = require("../models/Task");
const { errorResponse, successResponse } = require("../utility/response");
const { Op } = require("sequelize");
const sequelize = require("../config/database");

const projectDelete = (id) => {
  return async (transaction) => {
    // step 1. Delete all comments related to project. Need to find project columns to find
    // task ids. Then we can delete comments from there.
    const colData = await ProjectColumns.findAll({
      where: {
        project_id: id,
      },
    });

    const columnIds = colData.map((col) => col.dataValues.column_id);
    const columnQuery = columnIds.map((id) => ({ column_id: id }));

    const taskData = await ColumnTask.findAll({
      where: {
        [Op.or]: columnQuery,
      },
    });

    const taskIds = taskData.map((t) => t.dataValues.task_id);
    const taskQuery = taskIds.map((tid) => ({ task_id: tid }));

    const commentsDeleted = await Comment.destroy({
      where: {
        [Op.or]: taskQuery,
      },
      transaction,
    });
    console.log(`Deleted ${commentsDeleted} Comments `);

    // step 2. Delete all tasks in project columns.
    const colTasksDelete = await ColumnTask.destroy({
      where: {
        [Op.or]: taskQuery,
      },
      transaction,
    });

    const taskDeleteQuery = taskIds.map((tid) => ({
      id: tid,
    }));

    const tasksDeleted = await Task.destroy({
      where: {
        [Op.or]: taskDeleteQuery,
      },
      transaction,
    });
    console.log(`Deleted ${tasksDeleted} Tasks `);

    // step 3. Delete all columns
    const projectColDeleted = await ProjectColumns.destroy({
      where: {
        project_id: id,
      },
      transaction,
    });

    const colsDeleted = await Column.destroy({
      where: {
        [Op.or]: columnIds.map((cid) => ({ id: cid })),
      },
      transaction,
    });

    console.log(`Deleted ${colsDeleted} Columns `);

    // step 4. Finally! Delete Project
    const projectsDeleted = await Project.destroy({
      where: {
        id: id,
      },
      transaction,
    });
    console.log(`Deleted ${projectsDeleted} Projects `);

    return projectsDeleted;
  };
};

module.exports = {
  projectDelete,
};
