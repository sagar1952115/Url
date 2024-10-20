// requestLogger.js
const logger = require('./logger');

function requestLogger(req, res, next) {
  logger.info(`${req.method} ${req.url}`);
  next();
}

module.exports = requestLogger;
