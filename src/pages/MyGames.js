import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlus, FaGamepad, FaExclamationCircle } from 'react-icons/fa';

const MyGamesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`;

const MyGamesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const MyGamesTitle = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const CreateGameButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const GamesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const GameItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const GameContent = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const GameTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const GameDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  margin-top: ${({ theme }) => theme.spacing.large};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const MyGames = () => {
  const [error, setError] = useState(null);

  // Mock-up games data
  const mockGames = [
    { id: 1, title: "Space Explorer", description: "Explore the vast universe in this immersive space simulation", thumbnail: "https://picsum.photos/seed/game1/300/200" },
    { id: 2, title: "Puzzle Master", description: "Challenge your mind with intricate puzzles and brain teasers", thumbnail: "https://picsum.photos/seed/game2/300/200" },
    { id: 3, title: "Fantasy Quest", description: "Embark on an epic journey in a magical realm full of adventure", thumbnail: "https://picsum.photos/seed/game3/300/200" },
    { id: 4, title: "Racing Fever", description: "Experience high-speed thrills in this action-packed racing game", thumbnail: "https://picsum.photos/seed/game4/300/200" },
  ];

  const handleCreateGame = () => {
    setError('Failed to load your games. Please try again later.');
  };

  return (
    <MyGamesWrapper>
      <MyGamesHeader>
        <MyGamesTitle>
          <FaGamepad /> My Games
        </MyGamesTitle>
        <CreateGameButton onClick={handleCreateGame}>
          <FaPlus /> Create New Game
        </CreateGameButton>
      </MyGamesHeader>
      <GamesList>
        {mockGames.map(game => (
          <GameItem key={game.id}>
            <GameImage src={game.thumbnail} alt={game.title} />
            <GameContent>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
            </GameContent>
          </GameItem>
        ))}
      </GamesList>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
    </MyGamesWrapper>
  );
};

export default MyGames;