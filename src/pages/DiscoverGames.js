import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaStar } from 'react-icons/fa';

const DiscoverGamesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.large} 0;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  background: none;
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:focus {
    outline: none;
  }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const GameCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const GameInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const GameTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const GameRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.tiny};
  color: ${({ theme }) => theme.colors.accent};
`;

const DiscoverGames = () => {
  const games = [
    { id: 1, title: 'Adventure Quest', image: 'https://via.placeholder.com/250x150', rating: 4.5 },
    { id: 2, title: 'Strategy Master', image: 'https://via.placeholder.com/250x150', rating: 4.2 },
    { id: 3, title: 'Puzzle Mania', image: 'https://via.placeholder.com/250x150', rating: 4.7 },
    { id: 4, title: 'Sports Challenge', image: 'https://via.placeholder.com/250x150', rating: 4.0 },
  ];

  return (
    <DiscoverGamesWrapper>
      <Header>
        <FaSearch />
        Discover Games
      </Header>
      <SearchBar>
        <SearchInput placeholder="Search for games..." />
        <FaSearch />
      </SearchBar>
      <GameGrid>
        {games.map((game) => (
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
      </GameGrid>
    </DiscoverGamesWrapper>
  );
};

export default DiscoverGames;