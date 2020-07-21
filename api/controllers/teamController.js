const { body, validationResult } = require("express-validator");
const Team = require("../models/Team");

exports.create_team = function (req, res, next) {
  console.log(req.body);

  body(req.body).trim().escape().not().isEmpty();
  const name = req.body.name.trim();

  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.json({
      confirmation: "failed",
      data: [],
      message: "errors in inputted data",
    });
  }

  if (!name) {
    res.json({
      confirmation: "failed",
      data: [],
      message: "username or password can't be null",
    });
    return;
  }

  Team.create({
    name,
  })
    .then((team) => {
      console.log(team);
      res.json({
        confirmation: "success",
        data: team,
        message: "Team created successfully.",
      });
    })
    .catch((err) => {
      res.json({
        confirmation: "failed",
        data: [],
        err: err,
        message: "Team already exists.",
      });
    });
};

exports.view_team = function (req, res, next) {};
