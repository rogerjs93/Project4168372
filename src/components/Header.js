import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaGamepad, FaUser, FaSearch, FaBell, FaCaretDown, FaChartBar, FaComments } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import { Logo } from './Logo';
import Chat from './Chat';
import axios from 'axios';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; // Keep this lower than both Chat and RightSidebar
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1920px;
  margin: 0 auto;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  width: 390px;
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 240px;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: ${({ theme }) => theme.spacing.medium};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.small};
  width: 240px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.small};
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: ${({ theme }) => theme.spacing.small};
`;

const NavIcon = styled(Link)`
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.textSecondary};
  font-size: 1.5rem;
  padding: ${({ theme }) => theme.spacing.medium};
  margin: 0 ${({ theme }) => theme.spacing.small};
  border-radius: 8px;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.2rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.small};
  position: relative;
  transition: ${({ theme }) => theme.transitions.fast};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  margin-left: ${({ theme }) => theme.spacing.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.borderColor};
  }
`;

const NotificationCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.surfaceLight};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 2px 5px;
  border-radius: 10px;
  transform: translate(50%, -50%);
`;

const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.large};
  padding: ${({ theme }) => theme.spacing.medium};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  min-width: 200px;
  z-index: 1000;
`;

const UserMenuLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.small};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ChatIcon = styled(IconButton)`
  position: relative;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.large};
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const NotificationItem = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationContent = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const NotificationTimestamp = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    }
  }, [isLoggedIn]);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/notifications?userId=${user.id}&_sort=timestamp&_order=desc`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [user.id]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    }
  }, [isLoggedIn, fetchNotifications]);
  
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:3001/notifications/${notificationId}`, { isRead: true });
      setNotifications(notifications.map(notification => 
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification.id);
    // Here you can add logic to navigate to the relevant page based on the notification type
    setIsNotificationOpen(false);
  };

  return (
    <HeaderWrapper>
      <Nav>
        <LeftSection>
          <LogoLink to="/">
            <Logo size="40" />
          </LogoLink>
          <SearchBar>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search Naama"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
          </SearchBar>
        </LeftSection>
        <CenterSection>
          <NavIcon to="/" active={location.pathname === '/'}>
            <FaHome />
          </NavIcon>
          <NavIcon to="/games" active={location.pathname === '/games'}>
            <FaGamepad />
          </NavIcon>
          <NavIcon to="/community" active={location.pathname === '/community'}>
            <FaUsers />
          </NavIcon>
          <NavIcon to="/dashboard" active={location.pathname === '/dashboard'}>
            <FaChartBar />
          </NavIcon>
        </CenterSection>
        <RightSection>
          {isLoggedIn ? (
            <>
              <IconButton onClick={toggleNotifications}>
                <FaBell />
                <NotificationCount>{notifications.filter(n => !n.isRead).length}</NotificationCount>
              </IconButton>
              <NotificationDropdown isOpen={isNotificationOpen}>
                {notifications.map(notification => (
                  <NotificationItem key={notification.id} onClick={() => handleNotificationClick(notification)}>
                    <NotificationContent>{notification.content}</NotificationContent>
                    <NotificationTimestamp>{new Date(notification.timestamp).toLocaleString()}</NotificationTimestamp>
                  </NotificationItem>
                ))}
              </NotificationDropdown>
              <ChatIcon onClick={toggleChat}>
                <FaComments />
              </ChatIcon>
              <IconButton onClick={toggleUserMenu}>
                <FaUser />
                <FaCaretDown />
                <UserMenuDropdown isOpen={isUserMenuOpen}>
                  <UserMenuLink to="/profile">Profile</UserMenuLink>
                  <UserMenuLink to="/settings">Settings</UserMenuLink>
                  <UserMenuLink as="button" onClick={handleLogout}>Logout</UserMenuLink>
                </UserMenuDropdown>
              </IconButton>
            </>
          ) : (
            <>
              <IconButton as={Link} to="/login">
                <FaUser />
              </IconButton>
            </>
          )}
        </RightSection>
      </Nav>
      {isChatOpen && <Chat onClose={() => setIsChatOpen(false)} />}
    </HeaderWrapper>
  );
};