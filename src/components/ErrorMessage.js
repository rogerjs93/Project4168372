import React from 'react';
import styled from 'styled-components';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: ${({ theme }) => theme.colors.error};
`;

const ErrorIcon = styled(FaExclamationCircle)`
  margin-right: ${({ theme }) => theme.spacing.small};
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const ErrorMessage = ({ message }) => (
  <ErrorWrapper>
    <ErrorIcon />
    <ErrorText>{message}</ErrorText>
  </ErrorWrapper>
);

export default ErrorMessage;