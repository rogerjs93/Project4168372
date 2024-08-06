import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.error('Passwords do not match');
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const body = JSON.stringify({ username, email, password });
        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
        // Save token to localStorage
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
        <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={onChange} minLength="6" required />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;