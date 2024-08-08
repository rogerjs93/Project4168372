import React from 'react';
import styled from 'styled-components';

const GamesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const GamesTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const GamesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const GameItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

export const Games = () => {
  const mockGames = [
    { id: 1, title: "Space Explorer", description: "Explore the vast universe in this immersive space simulation" },
    { id: 2, title: "Puzzle Master", description: "Challenge your mind with intricate puzzles and brain teasers" },
    { id: 3, title: "Fantasy Quest", description: "Embark on an epic journey in a magical realm full of adventure" },
  ];

  return (
    <GamesWrapper>
      <GamesTitle>Games</GamesTitle>
      <GamesList>
        {mockGames.map(game => (
          <GameItem key={game.id}>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </GameItem>
        ))}
      </GamesList>
    </GamesWrapper>
  );
};