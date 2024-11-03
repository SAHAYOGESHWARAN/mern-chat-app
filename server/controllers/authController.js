const twilio = require('twilio');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Create a User model for storing phone numbers

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendSms = async (req, res) => {
  const { phoneNumber } = req.body;
  
  // Generate a random verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Store the phone number and verification code (consider a proper User model)
  await User.findOneAndUpdate({ phoneNumber }, { verificationCode }, { upsert: true });

  await client.messages.create({
    to: phoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER,
    body: `Your verification code is: ${verificationCode}`,
  });

  res.status(200).send('Verification code sent');
};

exports.login = async (req, res) => {
    const { phoneNumber, verificationCode } = req.body;
    const user = await User.findOne({ phoneNumber });
  
    if (!user || user.verificationCode !== verificationCode) {
      return res.status(400).send('Invalid phone number or verification code');
    }
  
    user.isVerified = true; // Update the user to verified
    await user.save();
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  };
