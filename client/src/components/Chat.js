import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  const sendMessage = () => {
    if (input) {
      socket.emit('sendMessage', input);
      setInput('');
    }
  };

  const addEmoji = (emoji) => {
    setInput(input + emoji.native);
    setShowEmojiPicker(false);
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
      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
      {showEmojiPicker && <Picker onSelect={addEmoji} />}
    </div>
  );
};

export default Chat;
