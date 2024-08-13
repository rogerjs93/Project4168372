import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const GamesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const GameCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const GameInfo = styled.div`
  padding: 10px;
`;

const GameTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const GameRatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StarIcon = styled(FaStar)`
  color: ${({ filled, theme }) => filled ? theme.colors.warning : theme.colors.lightGrey};
  cursor: pointer;
`;

const GamesSection = ({ games, onUpdateGame }) => {
  const handleRateGame = (gameId, rating) => {
    const updatedGame = games.find(game => game.id === gameId);
    if (updatedGame) {
      onUpdateGame({ ...updatedGame, rating });
    }
  };

  return (
    <GamesWrapper>
      {games.map(game => (
        <GameCard key={game.id}>
          <GameImage src={game.thumbnail || `https://source.unsplash.com/random/200x120?game=${game.id}`} alt={game.title} />
          <GameInfo>
            <GameTitle>{game.title}</GameTitle>
            <GameRatingWrapper>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  filled={star <= (game.rating || 0)}
                  onClick={() => handleRateGame(game.id, star)}
                />
              ))}
              <span>{game.rating !== undefined ? game.rating.toFixed(1) : 'Not rated'}</span>
            </GameRatingWrapper>
          </GameInfo>
        </GameCard>
      ))}
    </GamesWrapper>
  );
};

export default GamesSection;