const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    abbr: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    featured: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

const LeaderModel = mongoose.model('Leader', Schema);

module.exports = LeaderModel;
