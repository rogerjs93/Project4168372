import React from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <h1>Oops! Something went wrong.</h1>
          <p>We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.</p>
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;