import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaChartBar, FaUser, FaEnvelope, FaCog, FaBars, FaTimes } from 'react-icons/fa';

const SidebarWrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  width: ${({ isCollapsed }) => (isCollapsed ? '80px' : '240px')};
  position: fixed;
  left: 5px;
  top: 317px; // Adjust this value to position it below your header
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.medium};
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isCollapsed }) => (isCollapsed ? 'center' : 'space-between')};
  padding-bottom: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SidebarTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 50%;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const SidebarItem = styled.li``;

const SidebarLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LinkIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  transition: ${({ theme }) => theme.transitions.fast};

  ${SidebarLink}:hover & {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const LinkText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const Sidebar = ({ isCollapsed, onCollapse }) => {
  const toggleSidebar = () => {
    onCollapse(!isCollapsed);
  };

  return (
    <SidebarWrapper isCollapsed={isCollapsed}>
      <SidebarContent>
        <SidebarHeader isCollapsed={isCollapsed}>
          {!isCollapsed && <SidebarTitle>Menu</SidebarTitle>}
          <CollapseButton onClick={toggleSidebar}>
            {isCollapsed ? <FaBars /> : <FaTimes />}
          </CollapseButton>
        </SidebarHeader>
        <SidebarList>
          <SidebarItem>
            <SidebarLink to="/dashboard">
              <LinkIcon><FaChartBar /></LinkIcon>
              {!isCollapsed && <LinkText>Dashboard</LinkText>}
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink to="/profile">
              <LinkIcon><FaUser /></LinkIcon>
              {!isCollapsed && <LinkText>Profile</LinkText>}
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink to="/messages">
              <LinkIcon><FaEnvelope /></LinkIcon>
              {!isCollapsed && <LinkText>Messages</LinkText>}
            </SidebarLink>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink to="/settings">
              <LinkIcon><FaCog /></LinkIcon>
              {!isCollapsed && <LinkText>Settings</LinkText>}
            </SidebarLink>
          </SidebarItem>
        </SidebarList>
      </SidebarContent>
    </SidebarWrapper>
  );
};