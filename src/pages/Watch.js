import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPlayCircle, FaTwitch, FaYoutube, FaSteam, FaFacebookSquare, FaSearch, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const WatchWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.large};
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

const PlatformGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const PlatformCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const PlatformIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.primary};
`;

const PlatformName = styled.h3`
  margin: 0;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const PlatformDescription = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ViewButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.large} auto;
  display: block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Watch = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPlatforms = useCallback(async () => {
    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data (replace with actual API call when available)
      const mockPlatforms = [
        { name: 'Twitch', icon: <FaTwitch />, url: 'https://www.twitch.tv/', description: 'Live streaming platform for gamers' },
        { name: 'YouTube Gaming', icon: <FaYoutube />, url: 'https://www.youtube.com/gaming', description: 'Gaming content and live streams' },
        { name: 'Steam', icon: <FaSteam />, url: 'https://store.steampowered.com/', description: 'Digital distribution platform for PC gaming' },
        { name: 'Facebook Gaming', icon: <FaFacebookSquare />, url: 'https://www.facebook.com/gaming/', description: 'Social gaming and streaming platform' },
      ];
      setPlatforms(mockPlatforms);

      // Uncomment the following lines when connecting to a real server
      // const response = await axios.get('http://localhost:3001/watch-platforms');
      // setPlatforms(response.data);
    } catch (error) {
      console.error('Error fetching platforms:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlatforms();
  }, [fetchPlatforms]);

  const filteredPlatforms = platforms.filter(platform =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    platform.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <WatchWrapper>
      <Header>
        <FaPlayCircle />
        Watch Gaming Platforms
      </Header>
      <SearchBar>
        <FaSearch />
        <SearchInput
          type="text"
          placeholder="Search platforms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <PlatformGrid>
          {filteredPlatforms.map((platform) => (
            <PlatformCard key={platform.name}>
              <PlatformIcon>{platform.icon}</PlatformIcon>
              <PlatformName>{platform.name}</PlatformName>
              <PlatformDescription>{platform.description}</PlatformDescription>
              <ViewButton href={platform.url} target="_blank" rel="noopener noreferrer">
                View Platform <FaExternalLinkAlt />
              </ViewButton>
            </PlatformCard>
          ))}
        </PlatformGrid>
      )}
    </WatchWrapper>
  );
};

export default Watch;