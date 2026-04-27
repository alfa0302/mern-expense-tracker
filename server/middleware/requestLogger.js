const logger = require("../utils/logger");
const sanitize = require("../utils/sanitize");

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info({
      message: "HTTP Request",
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      params: req.params,
      query: req.query,
      body:
        process.env.NODE_ENV === "development" ? sanitize(req.body) : undefined,
    });
  });

  next();
};

module.exports = requestLogger;
