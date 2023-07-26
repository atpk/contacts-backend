const constants = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode || 400;

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not FOund",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.ACCESS_FORBIDDEN:
      res.json({
        title: "Access Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORISED:
      res.json({
        title: "Unauthorised Access",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.VALIDATION_ERROR:
      res
        .status(statusCode)
        .json({
          title: "Validation Error",
          message: err.message,
          stackTrace: err.stack,
        });
      break;

    default:
      console.log("No error!!!");
      break;
  }
};

module.exports = errorHandler;
