const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Sample API route
app.get('/api/messages', (req, res) => {
  // Logic to get messages from the database
  res.json({ messages: [] });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
