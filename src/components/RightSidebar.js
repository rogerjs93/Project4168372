import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGamepad, FaSearch, FaTrophy, FaChartBar, FaMedal, FaUsers, FaComments, FaGem } from 'react-icons/fa';

const SidebarWrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  width: ${({ isCollapsed }) => (isCollapsed ? '80px' : '240px')};
  position: fixed;
  right: 5px;
  top: 150px; // Adjust this value to position it below your header
  bottom: 5px;
  transition: all 0.3s ease;
  z-index: 1001; // Set this to be lower than the Chat component but higher than other content
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.medium};
  overflow-y: auto;
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

export const RightSidebar = ({ isCollapsed, onCollapse }) => {
  const toggleSidebar = () => {
    onCollapse(!isCollapsed);
  };

  const menuItems = [
    { icon: <FaGamepad />, text: 'My Games', path: '/my-games' },
    { icon: <FaSearch />, text: 'Discover Games', path: '/discover-games' },
    { icon: <FaTrophy />, text: 'Game Challenges', path: '/game-challenges' },
    { icon: <FaChartBar />, text: 'Leaderboards', path: '/leaderboards' },
    { icon: <FaMedal />, text: 'Game Tournaments', path: '/game-tournaments' },
    { icon: <FaUsers />, text: 'Game Communities', path: '/game-communities' },
    { icon: <FaComments />, text: 'Global Chat', path: '/global-chat' },
    { icon: <FaGem />, text: 'Game Collectibles', path: '/game-collectibles' },
  ];

  return (
    <SidebarWrapper isCollapsed={isCollapsed}>
      <SidebarContent>
        <SidebarHeader isCollapsed={isCollapsed}>
          {!isCollapsed && <SidebarTitle>Gaming</SidebarTitle>}
          <CollapseButton onClick={toggleSidebar}>
            {isCollapsed ? <FaGamepad /> : <FaGamepad />}
          </CollapseButton>
        </SidebarHeader>
        <SidebarList>
          {menuItems.map((item, index) => (
            <SidebarItem key={index}>
              <SidebarLink to={item.path}>
                <LinkIcon>{item.icon}</LinkIcon>
                {!isCollapsed && <LinkText>{item.text}</LinkText>}
              </SidebarLink>
            </SidebarItem>
          ))}
        </SidebarList>
      </SidebarContent>
    </SidebarWrapper>
  );
};