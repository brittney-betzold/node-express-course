const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(`Error: ${err.message}`, {
    statusCode: err.statusCode,
    stack: err.stack,
  });

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Something Went Wrong, Try again later");
};

module.exports = errorHandlerMiddleware;
