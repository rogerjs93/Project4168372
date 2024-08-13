import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Spinner = styled(FaSpinner)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = () => (
  <SpinnerWrapper>
    <Spinner />
  </SpinnerWrapper>
);

export default LoadingSpinner;