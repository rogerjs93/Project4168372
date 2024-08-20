import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaUsers, FaUserPlus, FaGamepad, FaSearch, FaUserMinus, FaPlus } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const CommunitiesWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const ActionsBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const CreateCommunityButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #166fe5;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: #1c1e21;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  overflow-y: auto;
  max-height: calc(100vh - 200px);
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CommunityCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 8px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const CommunityTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

const CommunityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  margin-bottom: 4px;
`;

const JoinButton = styled.button`
  background-color: ${({ joined, theme }) => joined ? theme.colors.background : theme.colors.primary};
  color: ${({ joined, theme }) => joined ? theme.colors.textPrimary : theme.colors.surfaceLight};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: ${({ joined, theme }) => joined ? theme.colors.borderColor : theme.colors.primaryDark};
  }
`;

const GameCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const generateMockCommunities = useCallback(() => {
    // This function will be replaced with actual API call when connecting to a real server
    return [
      { id: 1, name: 'RPG Enthusiasts', members: 5000, game: 'Various RPGs', joined: false },
      { id: 2, name: 'FPS Pros', members: 7500, game: 'First-Person Shooters', joined: false },
      { id: 3, name: 'Strategy Masterminds', members: 3000, game: 'Strategy Games', joined: false },
      { id: 4, name: 'Indie Game Lovers', members: 2000, game: 'Indie Games', joined: false },
      { id: 5, name: 'MOBA Masters', members: 10000, game: 'Multiplayer Online Battle Arenas', joined: false },
      { id: 6, name: 'Retro Gamers', members: 3500, game: 'Classic Video Games', joined: false },
      { id: 7, name: 'Sandbox Builders', members: 6000, game: 'Minecraft', joined: false },
      { id: 8, name: 'Battle Royale Squad', members: 8000, game: 'Fortnite', joined: false },
      { id: 9, name: 'Racing Enthusiasts', members: 4000, game: 'Forza Horizon', joined: false },
      { id: 10, name: 'Puzzle Solvers', members: 2500, game: 'Portal', joined: false },
      { id: 11, name: 'Open World Explorers', members: 5500, game: 'The Legend of Zelda', joined: false },
      { id: 12, name: 'Survival Experts', members: 3200, game: 'Do Starve', joined: false },
      { id: 13, name: 'MMO Adventurers', members: 7000, game: 'World of Warcraft', joined: false },
      { id: 14, name: 'Fighting Game Pros', members: 2800, game: 'Street Fighter', joined: false },
      { id: 15, name: 'Sports Gamers United', members: 4500, game: 'FIFA', joined: false },
      { id: 16, name: 'Roguelike Fans', members: 1800, game: 'Hades', joined: false },
      { id: 17, name: 'Sim City Planners', members: 3300, game: 'Cities: Skylines', joined: false },
      { id: 18, name: 'Rhythm Game Maestros', members: 2200, game: 'Beat Saber', joined: false },
      { id: 19, name: 'Stealth Mission Experts', members: 2600, game: 'Metal Gear Solid', joined: false },
      { id: 20, name: 'Card Game Strategists', members: 3700, game: 'Hearthstone', joined: false },
      { id: 21, name: 'Horror Game Survivors', members: 2900, game: 'Resident Evil', joined: false },
      { id: 22, name: 'Space Sim Pilots', members: 1900, game: 'Elite Dangerous', joined: false },
      { id: 23, name: 'Platformer Pros', members: 3100, game: 'Super Mario', joined: false },
      { id: 24, name: 'Visual Novel Readers', members: 1500, game: 'Doki Doki Literature Club', joined: false },
      { id: 25, name: 'Tactical Shooter Squad', members: 4200, game: 'Rainbow Six Siege', joined: false },
      { id: 26, name: 'Farming Sim Enthusiasts', members: 2700, game: 'Stardew Valley', joined: false },
      { id: 27, name: 'Speedrunners United', members: 1600, game: 'Various Games', joined: false },
      { id: 28, name: 'Esports Fanatics', members: 5800, game: 'Various Competitive Games', joined: false },
      { id: 29, name: 'VR Explorers', members: 2100, game: 'Half-Life: Alyx', joined: false },
      { id: 30, name: 'Narrative Adventure Fans', members: 2400, game: 'Life is Strange', joined: false },
    ];
  }, []);

  useEffect(() => {
    setCommunities(generateMockCommunities());
  }, [generateMockCommunities]);

  const handleJoinCommunity = useCallback((communityId) => {
    setCommunities(prevCommunities =>
      prevCommunities.map(community =>
        community.id === communityId
          ? { ...community, joined: !community.joined, members: community.joined ? community.members - 1 : community.members + 1 }
          : community
      )
    );
  }, []);

  const handleCreateCommunity = useCallback(() => {
    console.log('Create new community');
    // Implement community creation logic here
  }, []);

  const filteredCommunities = useMemo(() => 
    communities.filter(community =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.game.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [communities, searchTerm]
  );

  return (
    <>
      <GlobalStyle />
      <CommunitiesWrapper>
        <Header>
          <FaUsers />
          Game Communities
        </Header>
        <ActionsBar>
          <CreateCommunityButton onClick={handleCreateCommunity}>
            <FaPlus /> Create New Community
          </CreateCommunityButton>
          <SearchBar>
            <FaSearch color="#65676b" />
            <SearchInput
              type="text"
              placeholder="Search communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </ActionsBar>
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
      </CommunitiesWrapper>
    </>
  );
};

export default GameCommunities;