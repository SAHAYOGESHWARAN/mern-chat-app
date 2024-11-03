import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', input);
    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
