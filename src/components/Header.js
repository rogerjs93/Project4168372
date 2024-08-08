import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSearch, FaBell } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import { Logo } from './Logo'; // Import the new Logo component

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.medium};
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
  max-width: 1200px;
  margin: 0 auto;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ isMobile }) => (isMobile ? 'none' : 'flex')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.surfaceLight};
    padding: ${({ theme }) => theme.spacing.medium};
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
  margin-left: ${({ theme }) => theme.spacing.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: ${({ theme }) => theme.spacing.small} 0;
  }
`;

const Button = styled(NavLink)`
  background-color: ${({ theme, primary }) => primary ? theme.colors.primary : 'transparent'};
  color: ${({ theme, primary }) => primary ? theme.colors.surfaceLight : theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: ${({ theme }) => theme.transitions.medium};

  &:hover {
    background-color: ${({ theme, primary }) => primary ? theme.colors.secondary : theme.colors.primary};
    color: ${({ theme }) => theme.colors.surfaceLight};
    border-color: ${({ theme, primary }) => primary ? theme.colors.secondary : theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
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

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small};
  margin-left: ${({ theme }) => theme.spacing.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    margin: ${({ theme }) => theme.spacing.small} 0;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.small};
  width: 200px;

  &:focus {
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: ${({ theme }) => theme.spacing.small};
`;

const NotificationIcon = styled(FaBell)`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    // Navigate to search results page or update current page with results
  };

  return (
    <HeaderWrapper>
      <Nav>
        <Link to="/">
          <Logo /> {/* Use the new Logo component here */}
        </Link>
        <SearchBar>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search games, users, posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          />
        </SearchBar>
        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        <NavSection isMobile={!isMobileMenuOpen}>
          <NavLink to="/games">Games</NavLink>
          <NavLink to="/community">Community</NavLink>
          <NavLink to="/support">Support</NavLink>
        </NavSection>
        <NavSection isMobile={!isMobileMenuOpen}>
          {isLoggedIn ? (
            <>
              <NotificationIcon />
              <UserMenu onClick={toggleUserMenu}>
                <FaUser />
                <UserMenuDropdown isOpen={isUserMenuOpen}>
                  <UserMenuLink to="/dashboard">Dashboard</UserMenuLink>
                  <UserMenuLink to="/profile">Profile</UserMenuLink>
                  <UserMenuLink as="button" onClick={handleLogout}>Logout</UserMenuLink>
                </UserMenuDropdown>
              </UserMenu>
            </>
          ) : (
            <>
              <Button to="/login">Log In</Button>
              <Button to="/register" primary>Sign Up</Button>
            </>
          )}
        </NavSection>
      </Nav>
    </HeaderWrapper>
  );
};