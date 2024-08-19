import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const RegisterWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: ${({ theme }) => theme.spacing.xlarge};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.large};
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.xlarge};
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: ${({ theme }) => theme.transitions.fast};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const InputIcon = styled.span`
  position: absolute;
  left: ${({ theme }) => theme.spacing.medium};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: ${({ theme }) => theme.spacing.small};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.errorLight};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.successLight};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
  }
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
    return (
      <RegisterWrapper>
        <SuccessMessage>Registration successful! Redirecting to dashboard...</SuccessMessage>
      </RegisterWrapper>
    );
  }

  return (
    <RegisterWrapper>
      <Title>Sign Up</Title>
      <Form onSubmit={onSubmit}>
        <InputWrapper>
          <InputIcon><FaUser /></InputIcon>
          <Input 
            type="text" 
            placeholder="Username" 
            name="username" 
            value={username} 
            onChange={onChange} 
            required 
          />
        </InputWrapper>
        <InputWrapper>
          <InputIcon><FaEnvelope /></InputIcon>
          <Input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email} 
            onChange={onChange} 
            required 
          />
        </InputWrapper>
        <InputWrapper>
          <InputIcon><FaLock /></InputIcon>
          <Input 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={password} 
            onChange={onChange} 
            minLength="6" 
            required 
          />
        </InputWrapper>
        <InputWrapper>
          <InputIcon><FaLock /></InputIcon>
          <Input 
            type="password" 
            placeholder="Confirm Password" 
            name="password2" 
            value={password2} 
            onChange={onChange} 
            minLength="6" 
            required 
          />
        </InputWrapper>
        <Button type="submit">
          <FaUserPlus />
          Register
        </Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LoginLink to="/login">Already have an account? Sign in</LoginLink>
    </RegisterWrapper>
  );
};

export default Register;