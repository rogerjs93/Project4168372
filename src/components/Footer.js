// components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  text-align: center;
`;

export const Footer = () => (
  <FooterWrapper>
    <p>&copy; 2024 Naama.online. All rights reserved.</p>
  </FooterWrapper>
);