import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUsers, FaUserPlus, FaGamepad, FaSearch, FaSpinner, FaUserMinus } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CommunitiesWrapper = styled.div`
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
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  &:focus {
    outline: none;
  }
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const CommunityCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: ${({ theme }) => theme.transitions.medium};
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const CommunityTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CommunityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const JoinButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme, joined }) => joined ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  &:hover {
    background-color: ${({ theme, joined }) => joined ? theme.colors.secondaryDark : theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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

const GameCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCommunities = useCallback(async () => {
    setLoading(true);
    try {
      // Simulated API call using setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data (replace this with actual API call when connecting to a real server)
      const mockCommunities = [
        { id: 1, name: 'RPG Enthusiasts', members: 5000, game: 'Various RPGs', joined: false },
        { id: 2, name: 'FPS Pros', members: 7500, game: 'First-Person Shooters', joined: false },
        { id: 3, name: 'Strategy Masterminds', members: 3000, game: 'Strategy Games', joined: false },
        { id: 4, name: 'Indie Game Lovers', members: 2000, game: 'Indie Games', joined: false },
        { id: 5, name: 'MOBA Masters', members: 10000, game: 'Multiplayer Online Battle Arenas', joined: false },
        { id: 6, name: 'Retro Gamers', members: 3500, game: 'Classic Video Games', joined: false },
      ];
      setCommunities(mockCommunities);

      // Uncomment the following lines when connecting to a real server
      // const response = await axios.get('http://localhost:3001/communities');
      // setCommunities(response.data);
    } catch (error) {
      console.error('Error fetching communities:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinCommunity = useCallback((communityId) => {
    setCommunities(prevCommunities =>
      prevCommunities.map(community =>
        community.id === communityId
          ? { ...community, joined: !community.joined, members: community.joined ? community.members - 1 : community.members + 1 }
          : community
      )
    );
  }, []);

  return (
    <CommunitiesWrapper>
      <Header>
        <FaUsers />
        Game Communities
      </Header>
      <SearchBar>
        <FaSearch />
        <SearchInput
          type="text"
          placeholder="Search communities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <CommunityGrid>
          {filteredCommunities.map((community) => (
            <CommunityCard key={community.id}>
              <CommunityTitle>{community.name}</CommunityTitle>
              <CommunityInfo>
                <FaUsers /> {community.members.toLocaleString()} members
              </CommunityInfo>
              <CommunityInfo>
                <FaGamepad /> {community.game}
              </CommunityInfo>
              <JoinButton
                joined={community.joined}
                onClick={() => handleJoinCommunity(community.id)}
              >
                {community.joined ? (
                  <>
                    <FaUserMinus /> Leave Community
                  </>
                ) : (
                  <>
                    <FaUserPlus /> Join Community
                  </>
                )}
              </JoinButton>
            </CommunityCard>
          ))}
        </CommunityGrid>
      )}
    </CommunitiesWrapper>
  );
};

export default GameCommunities;