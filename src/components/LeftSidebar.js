import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaNewspaper, FaUserFriends, FaUsers, FaCalendarAlt, FaHistory, FaBookmark, FaRobot, FaPlayCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const SidebarWrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  width: ${({ $isCollapsed }) => ($isCollapsed ? '80px' : '240px')};
  position: fixed;
  left: 0;
  top: 180px; // Adjust this value to match your header height
  bottom: 20;
  transition: width 0.3s ease;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  overflow-x: hidden;
  overflow-y: auto;
  animation: ${({ $isCollapsed }) => ($isCollapsed ? slideOut : slideIn)} 0.3s ease;

  ${({ $isHovered, $isCollapsed }) =>
    $isHovered &&
    $isCollapsed &&
    css`
      width: 240px;
    `}

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.scrollbarThumb};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.scrollbarTrack};
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

const SidebarTitle = styled.h2`
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

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const SidebarNav = styled.nav`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const SidebarItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const SidebarLink = styled(Link)`
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary : theme.colors.textSecondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;

  &:hover, &:focus {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after, &:focus::after {
    width: 100%;
  }
`;

const LinkIcon = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary : theme.colors.textSecondary};
  margin-right: ${({ theme }) => theme.spacing.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  ${SidebarLink}:hover &, ${SidebarLink}:focus & {
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

const LinkText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const LeftSidebar = ({ isCollapsed, onCollapse }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);

  const toggleSidebar = useCallback(() => {
    onCollapse(!isCollapsed);
  }, [isCollapsed, onCollapse]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleSidebar();
    }
  }, [toggleSidebar]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { icon: <FaNewspaper />, text: 'News Feed', path: '/feed' },
    { icon: <FaUserFriends />, text: 'Friends', path: '/friends' },
    { icon: <FaUsers />, text: 'Groups', path: '/groups' },
    { icon: <FaCalendarAlt />, text: 'Events', path: '/events' },
    { icon: <FaHistory />, text: 'Memories', path: '/memories' },
    { icon: <FaBookmark />, text: 'Saved', path: '/saved' },
    { icon: <FaRobot />, text: 'AI Summarizer', path: '/ai-summarizer' },
    { icon: <FaPlayCircle />, text: 'Watch', path: '/watch' },
  ];

  return (
    <SidebarWrapper
      ref={sidebarRef}
      $isCollapsed={isCollapsed}
      $isHovered={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="complementary"
      aria-label="Left sidebar navigation"
    >
      <SidebarContent>
        <SidebarHeader>
          {(!isCollapsed || isHovered) && <SidebarTitle>Social</SidebarTitle>}
          <CollapseButton
            onClick={toggleSidebar}
            onKeyDown={handleKeyDown}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </CollapseButton>
        </SidebarHeader>
        <SidebarNav>
          <SidebarList>
            {menuItems.map((item, index) => (
              <SidebarItem key={index}>
                <SidebarLink
                  to={item.path}
                  $isActive={location.pathname === item.path}
                  aria-label={item.text}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  <LinkIcon $isActive={location.pathname === item.path}>{item.icon}</LinkIcon>
                  <LinkText $isVisible={!isCollapsed || isHovered}>{item.text}</LinkText>
                </SidebarLink>
              </SidebarItem>
            ))}
          </SidebarList>
        </SidebarNav>
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default LeftSidebar;