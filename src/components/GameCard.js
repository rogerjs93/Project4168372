import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaStar, FaGamepad } from 'react-icons/fa';

const GameItem = styled.article`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover, &:focus-within {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const GameImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
`;

const GameImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${GameItem}:hover & {
    transform: scale(1.05);
  }
`;

const GameContent = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const GameTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const GameDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  flex-grow: 1;
`;

const GameMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const GameRating = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.tiny};
`;

const GameGenre = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.tiny} ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const GameCard = ({ game }) => {
  const { id, title, description, thumbnail, rating, genre, image } = game;

  return (
    <GameItem>
      <GameImageWrapper>
        {image && <GameImage src={image} alt={title} />}
      </GameImageWrapper>
      <GameContent>
        <GameTitle>{title}</GameTitle>
        <GameDescription>{description}</GameDescription>
        <GameMeta>
          <GameRating>
            <FaStar aria-hidden="true" />
            {rating ? rating.toFixed(1) : 'N/A'}
          </GameRating>
          {genre && <GameGenre>{genre}</GameGenre>}
        </GameMeta>
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
    rating: PropTypes.number,
    genre: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default React.memo(GameCard);