const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  verificationCode: { type: String },
  isVerified: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  profilePicture: { type: String }, // URL to profile picture
  status: { type: String, default: 'Available' }, // User status
});

module.exports = mongoose.model('User', UserSchema);
