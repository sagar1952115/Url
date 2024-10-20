// logger.js
const { createLogger, format, transports } = require('winston');
const SentryTransport = require('./SentryTransport');
const dotenv = require('dotenv');

dotenv.config();

// Define custom log format
const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }), // Capture stack trace
  format.splat(),
  format.json()
);

// Create Winston logger instance
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: customFormat,
  transports: [
    // Console transport
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, stack }) => {
          return stack
            ? `${timestamp} [${level}]: ${message} - ${stack}`
            : `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
    // File transport for errors
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // File transport for all logs
    new transports.File({ filename: 'logs/combined.log' }),
    // Sentry transport for error-level logs
    new SentryTransport({ level: 'error' }),
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

module.exports = logger;
