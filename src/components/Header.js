// src/components/Header.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaGamepad, FaUser, FaSearch, FaBell, FaCaretDown, FaChartBar, FaComments, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from './ThemeProvider';
import Chat from './Chat';
import axios from 'axios';
import NotificationCenter from './NotificationCenter';
import useDebounce from '../hooks/useDebounce';
import logoImage from '../assets/logohead.png';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1920px;
  margin: 0 auto;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
`;

const LeftSection = styled(Section)`
  width: 390px;
`;

const CenterSection = styled(Section)`
  justify-content: center;
  flex-grow: 1;
`;

const RightSection = styled(Section)`
  width: 240px;
  justify-content: flex-end;
  position: relative;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: ${({ theme }) => theme.spacing.medium};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  padding: ${({ theme }) => theme.spacing.small};
  width: 240px;
  transition: all 0.3s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
    width: 280px;
  }
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
  transition: color 0.2s ease;

  ${SearchBar}:focus-within & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.textSecondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.small};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const NavIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.tiny};
`;

const NavText = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.2rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.small};
  position: relative;
  transition: all 0.2s ease;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  margin-left: ${({ theme }) => theme.spacing.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.borderColor};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

const NotificationButton = styled(IconButton)`
  position: relative;
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
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
  animation: ${pulseAnimation} 2s infinite;
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
  animation: ${slideDown} 0.3s ease-out;
`;

const UserMenuLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.small};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    transform: translateX(5px);
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
  animation: ${fadeIn} 0.3s ease-out;

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
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: rotate(90deg);
  }
`;

export const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
    { path: '/', icon: <FaHome />, label: 'Home', ariaLabel: 'Home' },
    { path: '/games', icon: <FaGamepad />, label: 'Games', ariaLabel: 'Games' },
    { path: '/community', icon: <FaUsers />, label: 'Community', ariaLabel: 'Community' },
    { path: '/dashboard', icon: <FaChartBar />, label: 'Dashboard', ariaLabel: 'Dashboard' },
  ], []);

  return (
    <HeaderWrapper>
      <Nav>
        <LeftSection>
          <LogoLink to="/">
            <LogoImage src={logoImage} alt="Naama Logo" />
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
          <NavMenu>
            {navItems.map(({ path, icon, label, ariaLabel }) => (
              <NavItem key={path} to={path} active={location.pathname === path} aria-label={ariaLabel}>
                <NavIcon>{icon}</NavIcon>
                <NavText>{label}</NavText>
              </NavItem>
            ))}
          </NavMenu>
        </CenterSection>
        <RightSection>
          <IconButton onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </IconButton>
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

export default Header;