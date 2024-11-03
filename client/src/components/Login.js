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
    // Prompt user for verification code
    // After receiving the code, verify it with another API call
  };
  

export default Login;
