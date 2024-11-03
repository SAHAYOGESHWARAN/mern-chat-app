const twilio = require('twilio');
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

// Implement verification code handling
