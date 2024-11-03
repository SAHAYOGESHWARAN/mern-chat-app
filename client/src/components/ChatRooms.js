import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await axios.get('http://localhost:5000/api/rooms');
      setRooms(response.data);
    };

    fetchRooms();
  }, []);

  const createRoom = async () => {
    await axios.post('http://localhost:5000/api/rooms', { name: roomName });
    setRoomName(''); // Reset room name
    // Fetch updated rooms
  };

  return (
    <div>
      <h2>Chat Rooms</h2>
      <input 
        value={roomName} 
        onChange={(e) => setRoomName(e.target.value)} 
        placeholder="Room name" 
      />
      <button onClick={createRoom}>Create Room</button>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRooms;
