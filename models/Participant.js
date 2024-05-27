const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  sex: { type: String, required: true, enum: ['Male', 'Female'] }
});

module.exports = mongoose.model('Participant', ParticipantSchema);
