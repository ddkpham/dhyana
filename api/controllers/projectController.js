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
const projectTransactions = require("../transactions/projects");

exports.check_authorization = async function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.create_project -> req.body", req.body);
  const project_name = req.body.project_name.trim();
  const { userId } = req.session;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!project_name) {
    res.status(400).json(errorResponse("missing  project name"));
    return;
  }

  try {
    const projectData = await Project.findAll({
      where: {
        name: project_name,
      },
    });
    if (projectData.length) {
      const {
        dataValues: { team_id },
      } = projectData[0];

      const teamCheck = await TeamsUsers.findAll({
        where: {
          team_id,
          user_id: userId,
        },
      });

      if (teamCheck.length) {
        res.status(200).json(successResponse("user is authorized"));
      } else {
        res.status(401).json(errorResponse("user is unauthorized"));
      }
    } else {
      res
        .status(404)
        .json(errorResponse(`project: ${project_name} does not exist`));
    }
  } catch (err) {
    res
      .status(200)
      .json(errorResponse("Error occured in checking authorization", err));
  }
};

exports.create_project = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.create_project -> req.body", req.body);

  const name = req.body.name.trim();
  const description = req.body.description.trim();
  const team_id = req.body.team_id;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!name || !team_id) {
    res.status(400).json(errorResponse("missing team id or project name"));
    return;
  }

  Project.create({
    name,
    description,
    team_id,
  })
    .then((team) => {
      console.log("exports.create_project -> team", team);
      res
        .status(200)
        .json(successResponse("Project created successfully", team));
    })
    .catch((err) => {
      res.status(409).json(errorResponse("Project exists already.", err));
    });
};

exports.delete_project = async function (req, res, next) {
  console.log("exports.delete_project -> req.body", req.body);
  body(req.body).trim().escape().not().isEmpty();
  const id = req.body.id;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!id) {
    res.status(400).json(errorResponse("missing project id"));
    return;
  }

  // managed transaction - sequelize will automatically handle commits and rollbacks

  try {
    console.log("starting transaction....");
    const result = await sequelize.transaction(
      projectTransactions.projectDelete(id)
    );
    console.log("finished transaction....");
    console.log(
      "exports.delete_project -> Number of deleted Projects: ",
      result
    );
    res.status(200).json(successResponse("successfully deleted project!"));
  } catch (err) {
    console.log("err", err);
    res
      .status(200)
      .json(errorResponse("Error occured in deleting project", err));
  }
};

exports.create_task_comment = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.create_task_comment -> req.body", req.body);
  console.log("get_task_comments params: ", req.params);
  const task_id = req.params.task_id.trim();
  const { description } = req.body;
  console.log("exports.create_task_comment -> body", description);
  const { userId } = req.session;
  const date_created = new Date().toISOString();

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!body || !userId) {
    res.status(400).json(errorResponse("missing team id or project name"));
    return;
  }

  Comment.create({
    task_id: task_id,
    user_id: userId,
    date_created: date_created,
    description: description,
  })
    .then(() => {
      res.status(200).json(successResponse("comment created successfully."));
      return;
    })
    .catch((err) => {
      console.log("error in update", err);
      res.status(400).json(errorResponse("comment couldn’t be created.", err));
    });
};

exports.get_task_comments = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("get_task_comments params: ", req.params);
  const task_id = req.params.task_id.trim();

  if (!task_id) {
    res.status(400).json(errorResponse("missing task_id"));
    return;
  }

  Comment.findAll({
    where: {
      task_id: task_id,
    },
  })
    .then((comments) => {
      console.log("exports.get_task_comments -> comments", comments);
      if (comments.length) {
        res
          .status(200)
          .json(successResponse("Sucessfully found comments", comments));
      } else {
        res.status(404).json(errorResponse("Comments not found.", err));
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json(
          errorResponse(
            "Comments not found. error in request. Check query.",
            err
          )
        );
    });
};

exports.view_project = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.view_project -> req.params", req.params);

  const name = req.params.name.trim();
  console.log("exports.view_project -> name", name);

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!name) {
    res.status(400).json(errorResponse("missing Project name"));
    return;
  }

  Project.findAll({
    where: {
      name,
    },
  })
    .then((project) => {
      console.log("exports.view_project -> project", project);
      if (project.length) {
        res
          .status(200)
          .json(successResponse("Sucessfully found Project", project));
      } else {
        res.status(404).json(errorResponse("Project not found.", err));
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json(
          errorResponse(
            "Project not found. error in request. Check query.",
            err
          )
        );
    });
};

exports.edit_project = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.edit_project -> req.body", req.body);
  const project_id = req.params.project_id;
  const { name, description } = req.body;

  if (!project_id) {
    res.status(400).json(errorResponse("missing project id"));
    return;
  }

  Project.update(
    {
      name,
      description,
    },
    {
      where: { id: project_id },
    }
  )
    .then(() => {
      res.status(200).json(successResponse("project updated successfully."));
      return;
    })
    .catch((err) => {
      res.status(400).json(errorResponse("Project update error", err));
      return;
    });
};

exports.view_user_specific = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.view_user_specific -> req.session", req.session);
  const { userId } = req.session;
  console.log("exports.view_user_specific -> userId", userId);

  const findProjects = async () => {
    const teams = await TeamsUsers.findAll({
      where: {
        user_id: userId,
      },
    });
    console.log("findTeams -> teams", teams);
    const teamQuery = teams.map((team) => {
      const {
        dataValues: { team_id },
      } = team;
      return { team_id };
    });
    return Project.findAll({
      where: {
        [Op.or]: teamQuery,
      },
    });
  };
  try {
    findProjects()
      .then((projects) => {
        console.log("findProjects -> projects", projects);
        res
          .status(200)
          .json(successResponse("Sucessfully found projects", projects));
      })
      .catch((err) => {
        res.status(404).json(errorResponse("No projects found", err));
      });
  } catch (err) {
    res.status(404).json(errorResponse("No projects found", err));
  }
};

exports.view_all = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.view_all -> req", req);
  Project.findAll()
    .then((projects) => {
      console.log("exports.view_all -> projects", projects);
      if (projects.length) {
        res
          .status(200)
          .json(successResponse("Sucessfully found projects", projects));
      } else {
        res.status(404).json(errorResponse("No projects found", err));
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json(
          errorResponse(
            "Projects not found. error in request. Check query.",
            err
          )
        );
    });
};

exports.create_project_column = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.create_project_column -> req.body", req.body);

  const projectId = req.body.projectId;
  const columnName = req.body.columnName.trim();
  const columnOrder = req.body.columnOrder;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!projectId || !columnName || !(columnOrder >= 0)) {
    res
      .status(400)
      .json(errorResponse("missing projectId, columnName or column order"));
    return;
  }

  Column.create({
    name: columnName,
    column_order: columnOrder,
  })
    .then((col) => {
      const {
        dataValues: { id: columnId },
      } = col;

      if (columnId) {
        ProjectColumns.create({
          project_id: projectId,
          column_id: columnId,
        })
          .then((result) => {
            res
              .status(200)
              .json(
                successResponse("Sucessfully created column in Project", result)
              );
          })
          .catch((err) => {
            res
              .status(400)
              .json(
                errorResponse(
                  "Error in creating project column. Please double check query.",
                  err
                )
              );
          });
      } else {
        res
          .status(400)
          .json(
            errorResponse(
              "Error in generating column. Message API developers.",
              err
            )
          );
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json(
          errorResponse(
            "Error in creating column. Please double check query.",
            err
          )
        );
    });
};

exports.view_project_columns = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.view_project_columns -> req.params", req.params);

  const projectId = req.params.projectId;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!projectId) {
    res.status(400).json(errorResponse("missing projectId"));
    return;
  }

  ProjectColumns.findAll({
    where: {
      project_id: projectId,
    },
  })
    .then((result) => {
      const columnQuery = result.map((val) => {
        const {
          dataValues: { column_id },
        } = val;
        return { id: column_id };
      });

      Column.findAll({
        where: {
          [Op.or]: columnQuery,
        },
      }).then(async (columnResults) => {
        console.log(
          "exports.view_project_columns -> columnResults",
          columnResults
        );
        const taskQuery = columnResults.map((val) => {
          const {
            dataValues: { id },
          } = val;
          return { column_id: id };
        });

        try {
          // find tasks for each column
          const tasks = await ColumnTask.findAll({
            where: {
              [Op.or]: taskQuery,
            },
          });
          console.log("exports.view_project_columns -> tasks", tasks);

          const columnInfo = columnResults.map((col) => {
            const {
              dataValues: { id: col_id },
            } = col;
            col.dataValues.tasks = [];
            tasks.forEach((element) => {
              const {
                dataValues: { column_id: owner_id, task_id },
              } = element;

              if (owner_id === col_id) {
                col.dataValues.tasks.push(task_id);
              }
            });
            return col;
          });

          res
            .status(200)
            .json(successResponse("Found project columns", columnInfo));
        } catch (err) {
          (err) =>
            res
              .status(400)
              .json(errorResponse("error in fetching column tasks", err));
        }
      });
    })
    .catch((err) =>
      res.status(404).json(errorResponse("no matching project found", err))
    );
};

exports.delete_column = async function (req, res, next) {
  console.log("exports.delete_column -> req.body", req.body);
  body(req.body).trim().escape().not().isEmpty();
  const id = req.body.id;

  if (!id) {
    res.status(400).json(errorResponse("missing column_id"));
    return;
  }

  try {
    console.log("starting transaction....");
    const result = await sequelize.transaction(
      projectTransactions.columnDelete(id)
    );
    console.log("finished transaction....");
    console.log(
      "exports.delete_column -> Number of deleted Columns: ",
      result
    );
    res.status(200).json(successResponse("successfully deleted column!"));
  } catch (err) {
    console.log("err", err);
    res
      .status(200)
      .json(errorResponse("Error occured in deleting column", err));
  }
};

exports.create_new_task = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.create_new_task -> req.body", req.body);

  const name = req.body.name.trim();
  const description = req.body.description.trim();
  const { userId: user_id_created } = req.session;
  console.log("user_id_created: ", user_id_created);
  const user_id_assigned = req.body.user_id_assigned;
  const priority = req.body.priority;
  const time_estimated = req.body.time_estimated;
  const flag = req.body.flag == "" ? false : req.body.flag;
  const date_created = new Date().toISOString();
  const column_id = req.body.column_id;
  const project_id = req.body.project_id;

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!name || !column_id || !(project_id >= 0)) {
    res
      .status(400)
      .json(errorResponse("missing projectId, columnName or column order"));
    return;
  }

  Task.create({
    name,
    description,
    date_created,
    user_id_created,
    user_id_assigned,
    priority,
    time_estimated,
    flag,
  })
    .then((task) => {
      const {
        dataValues: { id: task_id },
      } = task;
      ColumnTask.create({
        column_id,
        task_id,
      })
        .then((result) => {
          res
            .status(200)
            .json(successResponse("successfully created task", result));
        })
        .catch((err) =>
          res
            .status(400)
            .json(errorResponse("Error in attaching task to column", err))
        );
    })
    .catch((err) =>
      res.status(400).json(errorResponse("Error in creating task", err))
    );
};

exports.get_all_tasks = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("exports.get_all_tasks -> req.body", req.body);

  const task_ids = req.body.task_ids;
  console.log("exports.get_all_tasks -> task_ids", task_ids);

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400).json(errorResponse("errors in inputted data"));
  }

  if (!task_ids.length) {
    res.status(400).json(errorResponse("missing taskIds"));
    return;
  }

  Task.findAll({
    where: {
      [Op.or]: task_ids.map((t) => ({ id: t })),
    },
  })
    .then((result) => {
      res
        .status(200)
        .json(successResponse("Successfully found task data", result));
    })
    .catch((err) =>
      res.status(400).json(errorResponse("Error in finding tasks", err))
    );
};

exports.move_task = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("move task req.body is: ", req.body);
  console.log("move task params: ", req.params);
  const task_id = req.params.task_id.trim();
  const column_id = req.body.column_id;

  if (!task_id || !column_id) {
    res.status(400).json(errorResponse("missing task_id"));
    return;
  }

  ColumnTask.update(
    {
      column_id,
    },
    {
      where: { task_id },
    }
  )
    .then(() => {
      res.status(200).json(successResponse("task moved successfully."));
      return;
    })
    .catch((err) => {
      console.log("error in update", err);
      res.status(400).json(errorResponse("task couldn’t be moved.", err));
    });
};

exports.edit_task = function (req, res, next) {
  body(req.body).trim().escape().not().isEmpty();
  console.log("edit task req.body is: ", req.body);

  const {
    id,
    name,
    description,
    flag,
    user_id_assigned,
    priority,
    time_elapsed,
    time_estimated,
  } = req.body;
  const date_modified = new Date().toISOString();

  if (!id) {
    res.status(400).json(errorResponse("missing task_id"));
    return;
  }

  console.log("updating task with id: ", id);

  Task.update(
    {
      name,
      description,
      flag,
      user_id_assigned,
      priority,
      date_modified,
      time_elapsed,
      time_estimated,
    },
    {
      where: { id },
    }
  )
    .then(() => {
      console.log("UPDATE WAS SUCCESSFUL");
      res.status(200).json(successResponse("task updated successfully."));
      return;
    })
    .catch((err) => {
      console.log("error in update", err);
      res.status(400).json(errorResponse("task couldn’t be updated.", err));
    });
};

function DeleteTask(task_id) {
  return ColumnTask.destroy({
    where: {
      task_id,
    },
  })
    .then(() => {
      Task.destroy({
        where: {
          id: task_id,
        },
      })
        .then(() => 1)
        .catch((err) => {
          throw "task destroy error: " + err.message;
        });
    })
    .catch((err) => {
      throw "task destroy error: " + err.message;
    });
}

exports.delete_task = function (req, res, next) {
  console.log("exports.delete_task -> req.params", req.params);
  const task_id = req.params.task_id.trim();

  if (!task_id) {
    res.status(400).json(errorResponse("missing task_id"));
    return;
  }

  DeleteTask(task_id)
    .then(() => {
      res.status(200).json(successResponse("successfully deleted task"));
    })
    .catch((error) => {
      res.status(400).json(errorResponse(error));
    });
};
