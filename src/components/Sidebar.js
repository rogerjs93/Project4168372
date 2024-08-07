import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarWrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  width: 250px;
  padding: ${({ theme }) => theme.spacing.large};
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
`;

const SidebarTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.small};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const SidebarLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  display: block;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Sidebar = () => (
  <SidebarWrapper>
    <SidebarTitle>Quick Links</SidebarTitle>
    <SidebarList>
      <SidebarItem>
        <SidebarLink to="/dashboard">Dashboard</SidebarLink>
      </SidebarItem>
      <SidebarItem>
        <SidebarLink to="/profile">Profile</SidebarLink>
      </SidebarItem>
      <SidebarItem>
        <SidebarLink to="/messages">Messages</SidebarLink>
      </SidebarItem>
      <SidebarItem>
        <SidebarLink to="/settings">Settings</SidebarLink>
      </SidebarItem>
    </SidebarList>
  </SidebarWrapper>
);