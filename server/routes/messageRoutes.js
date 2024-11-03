const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// Send a new message
router.post('/', async (req, res) => {
  const newMessage = new Message(req.body);
  await newMessage.save();
  res.json(newMessage);
});

module.exports = router;
