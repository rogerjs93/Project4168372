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