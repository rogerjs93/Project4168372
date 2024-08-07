import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaChartBar, FaUser, FaEnvelope, FaCog, FaBars, FaTimes } from 'react-icons/fa';

const SidebarWrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  width: ${({ isCollapsed }) => (isCollapsed ? '50px' : '250px')};
  height: 100vh;
  position: ${({ isCollapsed }) => (isCollapsed ? 'relative' : 'absolute')};
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  overflow-x: hidden;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.small};
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isCollapsed }) => (isCollapsed ? 'center' : 'space-between')};
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
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
  padding: ${({ theme }) => theme.spacing.small};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.medium} 0;
`;

const SidebarItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const SidebarLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LinkIcon = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-right: ${({ theme }) => theme.spacing.small};
`;

const LinkText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Sidebar = ({ isCollapsed, onCollapse }) => {
  const toggleSidebar = () => {
    onCollapse(!isCollapsed);
  };

  return (
    <SidebarWrapper isCollapsed={isCollapsed}>
      <SidebarContent>
        <SidebarHeader isCollapsed={isCollapsed}>
          {!isCollapsed && <SidebarTitle>Quick Links</SidebarTitle>}
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