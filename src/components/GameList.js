import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.medium};
`;

const GameCard = styled(Card)`
  animation: slideIn 0.5s ease-out;

  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const GameList = ({ games }) => {
  return (
    <GameGrid>
      {games.map(game => (
        <GameCard key={game.id} title={game.title}>
          <p>{game.description}</p>
          <p>Type: {game.gameType}</p>
          <p>Rating: {game.rating !== undefined ? game.rating.toFixed(1) : 'Not rated'}</p>
          <p>Plays: {game.playCount !== undefined ? game.playCount : 0}</p>
        </GameCard>
      ))}
    </GameGrid>
  );
};

export default GameList;