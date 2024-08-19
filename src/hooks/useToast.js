import React, { createContext, useContext } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children, addToast }) => (
  <ToastContext.Provider value={addToast}>{children}</ToastContext.Provider>
);

export const useToast = () => {
  const addToast = useContext(ToastContext);
  if (!addToast) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return addToast;
};