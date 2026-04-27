const logger = require("../utils/logger");
const sanitize = require("../utils/sanitize");

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    status: err.status || 500,
    params: req.params,
    query: req.query,
    body: sanitize(req.body),
  });

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
