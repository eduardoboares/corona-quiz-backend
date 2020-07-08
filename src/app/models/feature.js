const mongoose = require('../../database');

//const bcrypt = require('bcryptjs');

const FeatureSchema = new mongoose.Schema({
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
        require: true,
    }, 
    bbox: {
        type: [Number],
        require: true,
    }, 
    geometry: {
        type: {
          type: String,
          enum: ['Polygon'],
          required: true
        },
        coordinates: {
          type: [[[Number]]],
          required: true
        }
      },
      properties: {
        datetime: {
            type: Number,
            require: false,
        },
        cloud_cover: {
            type: Number,
            require: false,
        }, 
        platform: {
            type: String,
            require: false,
        }, 
      },
    geoCollection:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeoCollection',
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});


const Feature = mongoose.model('Feature', FeatureSchema);

module.exports = Feature;
