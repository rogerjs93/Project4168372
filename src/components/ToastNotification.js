import React, { useContext } from 'react';
import styled from 'styled-components';
import { ToastContext } from './ToastProvider';

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
`;

const Toast = styled.div`
  background-color: ${({ type }) => (type === 'error' ? '#ff4d4d' : '#4caf50')};
  color: white;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ToastNotification = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <Toast key={toast.id} type={toast.type}>
          {toast.message}
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default ToastNotification;