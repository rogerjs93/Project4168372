import React, { createContext, useContext } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children, addToast }) => (
  <ToastContext.Provider value={addToast}>{children}</ToastContext.Provider>
);

export { useToast } from '../components/ToastProvider';