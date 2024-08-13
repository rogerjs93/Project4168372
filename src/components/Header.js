import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaGamepad, FaUser, FaSearch, FaBell, FaCaretDown, FaChartBar, FaComments, FaTimes } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { Logo } from './Logo';
import Chat from './Chat';
import axios from 'axios';
import NotificationCenter from './NotificationCenter';
import useDebounce from '../hooks/useDebounce';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
  position: relative;
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

const NotificationButton = styled(IconButton)`
  position: relative;
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
  min-width: 200px;
  z-index: 1100;
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

const NotificationCenterModal = styled.div`
  position: fixed;
  top: 60px;
  right: 270px;
  z-index: 1200;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.large};
  max-width: 400px;
  width: 100%;
  max-height: calc(100vh - 80px);
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
    right: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchNotifications = useCallback(async () => {
    if (isLoggedIn && user) {
      try {
        const response = await axios.get(`http://localhost:3001/notifications?userId=${user.id}&_sort=timestamp&_order=desc`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleSearch = useCallback(() => {
    if (debouncedSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedSearchQuery.trim())}`);
    }
  }, [debouncedSearchQuery, navigate]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch();
    }
  }, [debouncedSearchQuery, handleSearch]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const toggleNotificationCenter = () => {
    setIsNotificationCenterOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const navItems = useMemo(() => [
    { path: '/', icon: <FaHome />, ariaLabel: 'Home' },
    { path: '/games', icon: <FaGamepad />, ariaLabel: 'Games' },
    { path: '/community', icon: <FaUsers />, ariaLabel: 'Community' },
    { path: '/dashboard', icon: <FaChartBar />, ariaLabel: 'Dashboard' },
  ], []);

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
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              aria-label="Search Naama"
            />
          </SearchBar>
        </LeftSection>
        <CenterSection>
          {navItems.map(({ path, icon, ariaLabel }) => (
            <NavIcon key={path} to={path} active={location.pathname === path} aria-label={ariaLabel}>
              {icon}
            </NavIcon>
          ))}
        </CenterSection>
        <RightSection>
          {isLoggedIn ? (
            <>
              <NotificationButton onClick={toggleNotificationCenter} aria-label="Notifications">
                <FaBell />
                {unreadNotificationsCount > 0 && <NotificationCount>{unreadNotificationsCount}</NotificationCount>}
              </NotificationButton>
              <ChatIcon onClick={toggleChat} aria-label="Chat">
                <FaComments />
              </ChatIcon>
              <IconButton onClick={toggleUserMenu} aria-label="User menu" aria-expanded={isUserMenuOpen}>
                <FaUser />
                <FaCaretDown />
              </IconButton>
              {isUserMenuOpen && (
                <UserMenuDropdown>
                  <UserMenuLink to="/profile">Profile</UserMenuLink>
                  <UserMenuLink to="/settings">Settings</UserMenuLink>
                  <UserMenuLink as="button" onClick={handleLogout}>Logout</UserMenuLink>
                </UserMenuDropdown>
              )}
            </>
          ) : (
            <IconButton as={Link} to="/login" aria-label="Login">
              <FaUser />
            </IconButton>
          )}
        </RightSection>
      </Nav>
      {isChatOpen && <Chat onClose={() => setIsChatOpen(false)} />}
      {isNotificationCenterOpen && (
        <NotificationCenterModal>
          <CloseButton onClick={toggleNotificationCenter} aria-label="Close notifications">
            <FaTimes />
          </CloseButton>
          <NotificationCenter />
        </NotificationCenterModal>
      )}
    </HeaderWrapper>
  );
};