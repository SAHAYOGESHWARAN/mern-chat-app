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
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get('http://localhost:5000/api/messages');
      setMessages(response.data);
    };
  
    fetchMessages();
  
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);
  

  const addEmoji = (emoji) => {
    setInput(input + emoji.native);
    setShowEmojiPicker(false);
  };
  
  useEffect(() => {
    Notification.requestPermission();
  }, []);
  socket.on('receiveMessage', (message) => {
    setMessages((prev) => [...prev, message]);
    if (Notification.permission === 'granted') {
      new Notification('New Message', {
        body: message.text,
      });
    }
  });
  

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
