const errorResponse = (message, err = {}) => ({
  confirmation: "failed",
  data: [],
  message,
  err,
  success: false,
});

const successResponse = (message, data = []) => ({
  confirmation: "success",
  data,
  message,
  success: true,
});

module.exports = { errorResponse, successResponse };
