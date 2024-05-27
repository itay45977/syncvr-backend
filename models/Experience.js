const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
    required: true
  }],
  synchrony: {
    type: Map,
    of: new mongoose.Schema({
      timestamp: Date,
      data: mongoose.Schema.Types.Mixed
    }, { _id: false }),
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  feedbackParticipant1: {
    type: String,
    default: ''
  },
  feedbackParticipant2: {
    type: String,
    default: ''
  },
  completed: {
    type: String,
    enum: ['yes', 'no'],
    default: 'no'
  }
});

module.exports = mongoose.model('Experience', ExperienceSchema);
