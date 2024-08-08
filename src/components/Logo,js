import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif; // You may need to import this font
  color: ${({ theme }) => theme.colors.primary};
`;

const LogoIcon = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${props => props.standalone ? '0' : '10px'};
`;

const LogoText = styled.span`
  font-size: ${props => props.size || '24px'};
  font-weight: bold;
  letter-spacing: 1px;
`;

const GameControllerIcon = ({ color = '#fff', size = '24' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2"/>
    <path d="M12 8V16M8 12H16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const Logo = ({ iconOnly = false, size }) => {
  return (
    <LogoWrapper>
      <LogoIcon size={size} standalone={iconOnly}>
        <GameControllerIcon size={size ? `${parseInt(size) * 0.6}px` : '24'} />
      </LogoIcon>
      {!iconOnly && <LogoText size={size}>Naama</LogoText>}
    </LogoWrapper>
  );
};