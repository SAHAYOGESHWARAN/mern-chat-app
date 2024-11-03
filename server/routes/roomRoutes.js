const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Create a new room
router.post('/', async (req, res) => {
  const newRoom = new Room(req.body);
  await newRoom.save();
  res.json(newRoom);
});

// Get all rooms
router.get('/', async (req, res) => {
  const rooms = await Room.find().populate('members', 'username');
  res.json(rooms);
});

module.exports = router;
