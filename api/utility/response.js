const errorResponse = (message, err = {}) => ({
  confirmation: "failed",
  data: [],
  message,
  err,
});

const successResponse = (message, data) => ({
  confirmation: "success",
  data,
  message,
});

module.exports = { errorResponse, successResponse };
