import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaSearch, FaStar, FaGamepad } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const DiscoverGamesWrapper = styled.div`
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

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
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

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
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

const GameCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const GameInfo = styled.div`
  padding: 16px;
`;

const GameTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

const GameRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.warning};
  font-size: 14px;
`;

const DiscoverGames = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const generateMockGames = useCallback(() => {
    return [
      { id: 1, title: 'Adventure Quest', image: 'https://picsum.photos/seed/game1/250/150', rating: 4.5 },
      { id: 2, title: 'Strategy Master', image: 'https://picsum.photos/seed/game2/250/150', rating: 4.2 },
      { id: 3, title: 'Puzzle Mania', image: 'https://picsum.photos/seed/game3/250/150', rating: 4.7 },
      { id: 4, title: 'Space Explorer', image: 'https://picsum.photos/seed/game4/250/150', rating: 4.3 },
      { id: 5, title: 'Racing Fever', image: 'https://picsum.photos/seed/game5/250/150', rating: 4.1 },
      { id: 6, title: 'Fantasy RPG', image: 'https://picsum.photos/seed/game6/250/150', rating: 4.8 },
      { id: 7, title: 'Zombie Survival', image: 'https://picsum.photos/seed/game7/250/150', rating: 4.0 },
      { id: 8, title: 'City Builder', image: 'https://picsum.photos/seed/game8/250/150', rating: 4.4 },
      { id: 9, title: 'Sports Challenge', image: 'https://picsum.photos/seed/game9/250/150', rating: 4.2 },
      { id: 10, title: 'Dungeon Crawler', image: 'https://picsum.photos/seed/game10/250/150', rating: 4.6 },
      { id: 11, title: 'Magical Quest', image: 'https://picsum.photos/seed/game11/250/150', rating: 4.3 },
      { id: 12, title: 'Pirate Treasure', image: 'https://picsum.photos/seed/game12/250/150', rating: 4.1 },
      { id: 13, title: 'Wild West Adventure', image: 'https://picsum.photos/seed/game13/250/150', rating: 4.5 },
      { id: 14, title: 'Cyberpunk Future', image: 'https://picsum.photos/seed/game14/250/150', rating: 4.7 },
      { id: 15, title: 'Medieval Kingdoms', image: 'https://picsum.photos/seed/game15/250/150', rating: 4.2 },
      { id: 16, title: 'Alien Invasion', image: 'https://picsum.photos/seed/game16/250/150', rating: 4.4 },
      { id: 17, title: 'Ninja Warrior', image: 'https://picsum.photos/seed/game17/250/150', rating: 4.3 },
      { id: 18, title: 'Candy Crush Clone', image: 'https://picsum.photos/seed/game18/250/150', rating: 4.0 },
      { id: 19, title: 'Underwater Explorer', image: 'https://picsum.photos/seed/game19/250/150', rating: 4.6 },
      { id: 20, title: 'Time Travel Paradox', image: 'https://picsum.photos/seed/game20/250/150', rating: 4.8 },
      { id: 21, title: 'Galactic Empires', image: 'https://picsum.photos/seed/game21/250/150', rating: 4.5 },
      { id: 22, title: 'Dragon Slayer', image: 'https://picsum.photos/seed/game22/250/150', rating: 4.7 },
      { id: 23, title: 'Steampunk World', image: 'https://picsum.photos/seed/game23/250/150', rating: 4.2 },
      { id: 24, title: 'Prehistoric Survival', image: 'https://picsum.photos/seed/game24/250/150', rating: 4.1 },
      { id: 25, title: 'Virtual Pet Simulator', image: 'https://picsum.photos/seed/game25/250/150', rating: 4.0 },
      { id: 26, title: 'Superhero Academy', image: 'https://picsum.photos/seed/game26/250/150', rating: 4.6 },
      { id: 27, title: 'Mystery Detective', image: 'https://picsum.photos/seed/game27/250/150', rating: 4.3 },
      { id: 28, title: 'Cooking Master', image: 'https://picsum.photos/seed/game28/250/150', rating: 4.2 },
      { id: 29, title: 'Music Rhythm Challenge', image: 'https://picsum.photos/seed/game29/250/150', rating: 4.4 },
      { id: 30, title: 'Escape Room Puzzler', image: 'https://picsum.photos/seed/game30/250/150', rating: 4.5 },
      // ... Add more mock games here (up to 30 or more)
    ];
  }, []);

  useEffect(() => {
    setGames(generateMockGames());
  }, [generateMockGames]);

  const filteredGames = useMemo(() => 
    games.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [games, searchTerm]
  );

  return (
    <>
      <GlobalStyle />
      <DiscoverGamesWrapper>
        <Header>
          <FaGamepad />
          Discover Games
        </Header>
        <SearchBar>
          <FaSearch color="#65676b" />
          <SearchInput
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <GamesGrid>
          {filteredGames.map(game => (
            <GameCard key={game.id}>
              <GameImage src={game.image} alt={game.title} />
              <GameInfo>
                <GameTitle>{game.title}</GameTitle>
                <GameRating>
                  <FaStar /> {game.rating}
                </GameRating>
              </GameInfo>
            </GameCard>
          ))}
        </GamesGrid>
      </DiscoverGamesWrapper>
    </>
  );
};

export default DiscoverGames;