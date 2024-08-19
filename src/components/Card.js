import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(98, 0, 234, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(98, 0, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(98, 0, 234, 0);
  }
`;

const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  padding: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.large};
    transform: translateY(-5px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-within {
    animation: ${pulseAnimation} 1.5s infinite;
  }
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  transition: color 0.2s ease;

  ${CardWrapper}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: opacity 0.2s ease;

  ${CardWrapper}:hover & {
    opacity: 0.9;
  }
`;

export const Card = ({ title, children, className, onClick }) => (
  <CardWrapper className={className} onClick={onClick} tabIndex={0}>
    {title && <CardTitle>{title}</CardTitle>}
    <CardContent>{children}</CardContent>
  </CardWrapper>
);

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  title: '',
  className: '',
  onClick: () => {},
};