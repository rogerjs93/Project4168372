import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RegisterWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: ${({ theme }) => theme.spacing.small};
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  text-align: center;
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
        // Check if user already exists
        const checkUser = await axios.get(`http://localhost:3001/users?email=${email}`);
        if (checkUser.data.length > 0) {
          setError('User already exists');
          return;
        }

        const newUser = {
          username,
          email,
          password // In a real app, never store plain text passwords
        };

        const res = await axios.post('http://localhost:3001/users', newUser);
        
        if (res.data) {
          console.log(res.data);
          localStorage.setItem('userId', res.data.id);
          setSuccess(true);
          setError('');
          setTimeout(() => navigate('/dashboard'), 2000);
        } else {
          setError('Registration failed');
        }
      } catch (err) {
        console.error('Registration error:', err);
        setError(err.message || 'An error occurred during registration');
      }
    }
  };

  if (success) {
    return <SuccessMessage>Registration successful! Redirecting to dashboard...</SuccessMessage>;
  }

  return (
    <RegisterWrapper>
      <h2>Sign Up</h2>
      <Form onSubmit={onSubmit}>
        <Input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
        <Input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
        <Input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
        <Input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={onChange} minLength="6" required />
        <Button type="submit">Register</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </RegisterWrapper>
  );
};

export default Register;