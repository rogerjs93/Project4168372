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

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post('http://localhost:5000/api/auth', body, config);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response.data.msg || 'An error occurred during login');
    }
  };

  if (success) {
    return <p>Login successful! Redirecting to dashboard...</p>;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <Form onSubmit={onSubmit}>
        <Input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
        <Input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
        <Button type="submit">Login</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default Login;