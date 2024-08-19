import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../AuthContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LoginWrapper = styled.div`
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

const RememberMeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Checkbox = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    position: relative;
    
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${({ theme }) => theme.colors.surfaceLight};
      font-size: 12px;
    }
  }
`;

const CheckboxLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.small};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const { email, password, rememberMe } = formData;

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const validateForm = () => {
    return email.length > 0 && password.length >= 6;
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
      
      if (res.data.length > 0) {
        const user = res.data[0];
        login(user.id);
        if (rememberMe) {
          localStorage.setItem('rememberMe', email);
        } else {
          localStorage.removeItem('rememberMe');
        }
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
    }
  };

  return (
    <LoginWrapper>
      <Title>Sign In</Title>
      <Form onSubmit={onSubmit}>
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
            required 
          />
        </InputWrapper>
        <RememberMeWrapper>
          <Checkbox
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={onChange}
          />
          <CheckboxLabel htmlFor="rememberMe">Remember me</CheckboxLabel>
        </RememberMeWrapper>
        <Button type="submit" disabled={!validateForm()}>
          <FaSignInAlt />
          Login
        </Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LinkWrapper>
        <StyledLink to="/forgot-password">Forgot Password?</StyledLink>
        <StyledLink to="/register">Don't have an account? Sign up</StyledLink>
      </LinkWrapper>
    </LoginWrapper>
  );
};

export default Login;