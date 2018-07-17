const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  handle: {
    type: String,
    required: true,
    max: 20
  },
  brandName: {
    type: String
  },
  websites: {
    type: [String]
  },
  bio: {
      type: String
  },
  youtubeUrl: {
      type: String
  },
  vimeoUrl: {
      type: String
  },
  facebookUrl: {
      type: String
  },
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
