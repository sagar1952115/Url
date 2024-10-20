const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Url',
    required: true,
  },
  clickTimestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: String,
  userAgent: String,
  referrer: String,
});

// Create compound index for efficient querying
analyticsSchema.index({ urlId: 1, clickTimestamp: 1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;