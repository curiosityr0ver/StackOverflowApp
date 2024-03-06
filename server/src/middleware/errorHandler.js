const response = require("../utils/response");

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    response(401, error.message, "Check Your SQL Syntax", res);
  } else {
    response(500, "Internal Server-Error", error, res);
  }
};

module.exports = { errorHandler, CustomError };
