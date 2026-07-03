const logger = require('../config/logger');

// 404 handler for unmatched routes
function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
}

// Central error handler — every failure path returns { success: false, message }
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
  const isOperational = err.isOperational === true;

  if (!isOperational) {
    logger.error(err.stack || err.message);
  }

  const message =
    isOperational || process.env.NODE_ENV !== 'production'
      ? err.message
      : 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && !isOperational ? { stack: err.stack } : {}),
  });
}

module.exports = { notFound, errorHandler };
