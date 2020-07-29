var express = require("express");
var router = express.Router();
const { errorResponse, successResponse } = require("../utility/response");

// GET home page.
router.get("/", function (req, res) {
  const error = errorResponse("unauthorized for API resource");
  console.log("error", error);
  res.json(error);
});

module.exports = router;
