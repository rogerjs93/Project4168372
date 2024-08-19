import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
`;

const Toast = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme, type }) => {
    switch (type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'info':
        return theme.colors.primary;
      default:
        return theme.colors.secondary;
    }
  }};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: 12px 20px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.3s ease-in-out;
`;

const ToastIcon = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const ToastMessage = styled.div`
  flex-grow: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.surfaceLight};
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
`;

const ToastNotification = ({ toasts, removeToast }) => {
  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <Toast key={toast.id} type={toast.type} isClosing={toast.isClosing}>
          <ToastIcon>
            {toast.type === 'success' && <FaCheckCircle />}
            {toast.type === 'error' && <FaExclamationCircle />}
            {toast.type === 'info' && <FaInfoCircle />}
          </ToastIcon>
          <ToastMessage>{toast.message}</ToastMessage>
          <CloseButton onClick={() => removeToast(toast.id)}>
            <FaTimes />
          </CloseButton>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default ToastNotification;