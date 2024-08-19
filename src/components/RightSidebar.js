import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaGamepad, FaSearch, FaFlagCheckered, FaMedal, FaTrophy, FaUsers, FaGlobe, FaGem, FaDice, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

const SidebarWrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  width: ${({ isCollapsed }) => (isCollapsed ? '80px' : '240px')};
  position: fixed;
  right: 0;
  top: 100px; // Adjust this value to match your header height
  bottom: 0;
  transition: width 0.3s ease;
  z-index: 1001;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  overflow-x: hidden;
  overflow-y: auto;
  animation: ${({ isCollapsed }) => (isCollapsed ? slideOut : slideIn)} 0.3s ease;

  &:hover {
    width: ${({ isCollapsed }) => (isCollapsed ? '240px' : '240px')};
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  padding: ${({ theme }) => theme.spacing.medium};
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const SidebarItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const SidebarLink = styled(Link)`
  color: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.textSecondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    right: auto;
    left: 0;
  }
`;

const LinkIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme, isActive }) => isActive ? theme.colors.primary : theme.colors.textSecondary};
  margin-right: ${({ theme }) => theme.spacing.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  ${SidebarLink}:hover & {
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

const LinkText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const RightSidebar = ({ isCollapsed, onCollapse }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    onCollapse(!isCollapsed);
  };

  const menuItems = [
    { icon: <FaGamepad />, text: 'My Games', path: '/my-games' },
    { icon: <FaSearch />, text: 'Discover Games', path: '/discover-games' },
    { icon: <FaFlagCheckered />, text: 'Game Challenges', path: '/game-challenges' },
    { icon: <FaMedal />, text: 'Leaderboards', path: '/leaderboards' },
    { icon: <FaTrophy />, text: 'Game Tournaments', path: '/game-tournaments' },
    { icon: <FaUsers />, text: 'Game Communities', path: '/game-communities' },
    { icon: <FaGlobe />, text: 'Global Chat', path: '/global-chat' },
    { icon: <FaGem />, text: 'Game Collectibles', path: '/game-collectibles' },
  ];

  return (
    <SidebarWrapper 
      isCollapsed={isCollapsed}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SidebarContent>
        <SidebarHeader>
          {(!isCollapsed || isHovered) && <SidebarTitle>Gaming</SidebarTitle>}
          <CollapseButton onClick={toggleSidebar} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {isCollapsed ? <FaChevronLeft /> : <FaChevronRight />}
          </CollapseButton>
        </SidebarHeader>
        <SidebarList>
          {menuItems.map((item, index) => (
            <SidebarItem key={index}>
              <SidebarLink 
                to={item.path}
                isActive={location.pathname === item.path}
                aria-label={item.text}
              >
                <LinkIcon isActive={location.pathname === item.path}>{item.icon}</LinkIcon>
                <LinkText isVisible={!isCollapsed || isHovered}>{item.text}</LinkText>
              </SidebarLink>
            </SidebarItem>
          ))}
        </SidebarList>
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default RightSidebar;