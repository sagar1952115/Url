// sentry.js
const Sentry = require('@sentry/node');
const dotenv = require('dotenv');

dotenv.config();

function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 1.0, // Adjust based on your needs
  });
}

module.exports = initSentry;
