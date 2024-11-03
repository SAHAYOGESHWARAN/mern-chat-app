import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // Implement Twilio SMS verification here
    history.push('/chat');
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
const handleLogin = async () => {
    await axios.post('http://localhost:5000/api/auth/send-sms', { phoneNumber });
  
    const code = prompt('Enter the verification code:'); // Simple prompt for demo purposes
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      phoneNumber,
      verificationCode: code,
    });
  
    localStorage.setItem('token', response.data.token); // Store token in local storage
    history.push('/chat');
  };
  

export default Login;
