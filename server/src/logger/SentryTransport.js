// SentryTransport.js
const Transport = require('winston-transport');
const Sentry = require('@sentry/node');

class SentryTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.level = opts.level || 'error'; // Default level to 'error'
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const { level, message, ...meta } = info;

    if (level === 'error') {
      // If message is an Error instance, send it directly
      if (message instanceof Error) {
        Sentry.captureException(message);
      } else {
        Sentry.captureException(new Error(message));
      }
    } else if (level === 'warn') {
      Sentry.captureMessage(message, Sentry.Severity.Warning);
    } else {
      Sentry.captureMessage(message, Sentry.Severity.Info);
    }

    callback();
  }
}

module.exports = SentryTransport;
