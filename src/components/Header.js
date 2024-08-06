// components/Header.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  margin-left: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Header = () => (
  <HeaderWrapper>
    <Nav>
      <NavLink to="/">naama.online1</NavLink>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </Nav>
  </HeaderWrapper>
);

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
    <p>&copy; 2024 naama.online1. All rights reserved.</p>
  </FooterWrapper>
);

// components/Sidebar.js
import React from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  width: 200px;
  padding: 1rem;
`;

export const Sidebar = () => (
  <SidebarWrapper>
    <h3>Quick Links</h3>
    <ul>
      <li>Link 1</li>
      <li>Link 2</li>
      <li>Link 3</li>
    </ul>
  </SidebarWrapper>
);