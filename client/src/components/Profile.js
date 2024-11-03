import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: token },
      });
      setUser(response.data);
      setStatus(response.data.status);
    };

    fetchUserProfile();
  }, []);

  const updateStatus = async () => {
    const token = localStorage.getItem('token');
    await axios.put('http://localhost:5000/api/profile', { status }, {
      headers: { Authorization: token },
    });
    // Optionally handle success/failure
  };

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <img src={user.profilePicture} alt="Profile" />
      <input 
        value={status} 
        onChange={(e) => setStatus(e.target.value)} 
        placeholder="Update status" 
      />
      <button onClick={updateStatus}>Update</button>
    </div>
  );
};

export default Profile;
