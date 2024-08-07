import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { username, email, password, password2 } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
    } else {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const body = JSON.stringify({ username, email, password });
        const res = await axios.post('http://localhost:5000/api/users', body, config);
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        setSuccess(true);
        setError('');
        setTimeout(() => navigate('/dashboard'), 2000);
      } catch (err) {
        setError(err.response.data.msg || 'An error occurred during registration');
      }
    }
  };

  if (success) {
    return <p>Registration successful! Redirecting to dashboard...</p>;
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={onSubmit}>
        <Input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
        <Input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
        <Input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
        <Input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={onChange} minLength="6" required />
        <Button type="submit">Register</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default Register;