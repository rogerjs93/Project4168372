import React from 'react';
import styled from 'styled-components';
import { FaGamepad, FaPlay, FaEdit } from 'react-icons/fa';

const MyGamesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const GameList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const GameCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const GameTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme, primary }) => primary ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme, primary }) => primary ? theme.colors.primaryDark : theme.colors.secondaryDark};
  }
`;

const MyGames = () => {
  const games = [
    { id: 1, title: 'Space Invaders', description: 'Classic arcade game' },
    { id: 2, title: 'Puzzle Master', description: 'Brain-teasing puzzle game' },
    { id: 3, title: 'Racing Fever', description: 'High-speed racing game' },
  ];

  return (
    <MyGamesWrapper>
      <Header>
        <FaGamepad />
        My Games
      </Header>
      <GameList>
        {games.map((game) => (
          <GameCard key={game.id}>
            <GameTitle>{game.title}</GameTitle>
            <p>{game.description}</p>
            <ButtonGroup>
              <Button primary><FaPlay /> Play</Button>
              <Button><FaEdit /> Edit</Button>
            </ButtonGroup>
          </GameCard>
        ))}
      </GameList>
    </MyGamesWrapper>
  );
};

export default MyGames;