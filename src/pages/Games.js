import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaPlus, FaGamepad } from 'react-icons/fa';
import CreateGame from '../components/CreateGame';

const GamesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`;

const GamesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const GamesTitle = styled.h1`
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.boxShadow.large};
`;

const Games = () => {
  const [games, setGames] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3001/games');
      setGames(response.data);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGame = async (newGame) => {
    try {
      const response = await axios.post('http://localhost:3001/games', newGame);
      setGames([...games, response.data]);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error('Error creating game:', err);
      setError('Failed to create game. Please try again.');
    }
  };

  if (isLoading) return <div>Loading games...</div>;
  if (error) return <div>{error}</div>;

  return (
    <GamesWrapper>
      <GamesHeader>
        <GamesTitle>
          <FaGamepad /> Games
        </GamesTitle>
        <CreateGameButton onClick={() => setIsCreateModalOpen(true)}>
          <FaPlus /> Create New Game
        </CreateGameButton>
      </GamesHeader>
      <GamesList>
        {games.map(game => (
          <GameItem key={game.id}>
            <GameImage src={game.thumbnail || `https://picsum.photos/seed/${game.id}/300/200`} alt={game.title} />
            <GameContent>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
            </GameContent>
          </GameItem>
        ))}
      </GamesList>
      {isCreateModalOpen && (
        <Modal>
          <ModalContent>
            <CreateGame onGameCreated={handleCreateGame} />
            <CreateGameButton onClick={() => setIsCreateModalOpen(false)}>Cancel</CreateGameButton>
          </ModalContent>
        </Modal>
      )}
    </GamesWrapper>
  );
};

export default Games;