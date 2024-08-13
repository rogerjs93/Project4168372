import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 200px;
`;

const Spinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const LoadingText = styled.p`
  margin-left: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  );
};

export default Loading;