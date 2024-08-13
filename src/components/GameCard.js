import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const GameCard = ({ game }) => {
  return (
    <GameItem>
      <GameImage src={game.thumbnail || `https://picsum.photos/seed/${game.id}/300/200`} alt={game.title} />
      <GameContent>
        <GameTitle>{game.title}</GameTitle>
        <GameDescription>{game.description}</GameDescription>
      </GameContent>
    </GameItem>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default GameCard;