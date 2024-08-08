import React from 'react';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
`;

const LogoSvg = styled.svg`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
`;

const LogoText = styled.span`
  font-size: ${props => props.size ? `${parseInt(props.size) * 0.5}px` : '20px'};
  font-weight: bold;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Logo = ({ size, showText = true }) => {
  return (
    <LogoWrapper>
      <LogoSvg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6200EA" />
            <stop offset="100%" stopColor="#03DAC6" />
          </linearGradient>
        </defs>
        <path d="M50 5 L95 30 L95 70 L50 95 L5 70 L5 30 Z" fill="url(#logo-gradient)" />
        <path d="M40 20 L60 20 L60 80 L40 80 M40 50 L60 50" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="35" r="5" fill="white" />
        <circle cx="70" cy="65" r="5" fill="white" />
      </LogoSvg>
      {showText && <LogoText size={size}>Naama</LogoText>}
    </LogoWrapper>
  );
};