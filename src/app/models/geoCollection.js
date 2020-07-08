const mongoose = require('../../database');
//const bcrypt = require('bcryptjs');

const GeoCollectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
    type: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    features: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feature',
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    usePushEach: true
  },
);

const GeoCollection = mongoose.model('GeoCollection', GeoCollectionSchema);

module.exports = GeoCollection;