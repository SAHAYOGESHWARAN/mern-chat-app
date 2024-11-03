const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  verificationCode: { type: String },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
