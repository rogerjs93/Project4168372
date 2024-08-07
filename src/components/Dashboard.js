import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card } from './Card';
import CreateGame from './CreateGame';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.large};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  const [showCreateGame, setShowCreateGame] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const userResponse = await axios.get(`http://localhost:3001/users/${userId}`);
          setUser(userResponse.data);

          const postsResponse = await axios.get(`http://localhost:3001/posts?userId=${userId}`);
          setPosts(postsResponse.data);

          const gamesResponse = await axios.get(`http://localhost:3001/games?creatorId=${userId}`);
          setGames(gamesResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  const handleCreateGame = () => {
    setShowCreateGame(true);
  };

  const handleGameCreated = async (newGame) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('http://localhost:3001/games', {
        ...newGame,
        creatorId: userId
      });
      setGames([...games, response.data]);
      setShowCreateGame(false);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  return (
    <DashboardContainer>
      <Section>
        <Card title="User Profile">
          {user && (
            <>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
            </>
          )}
        </Card>
      </Section>

      <Section>
        <h2>Social Feed</h2>
        {posts.map(post => (
          <Card key={post.id} title={post.title}>
            <p>{post.content}</p>
          </Card>
        ))}
      </Section>

      <Section>
        <h2>My Games</h2>
        {games.map(game => (
          <Card key={game.id} title={game.title}>
            <p>{game.description || 'No description available.'}</p>
            <p>Type: {game.gameType}</p>
            <p>Entities: {game.entities ? Object.keys(game.entities).length : 0}</p>
          </Card>
        ))}
        <Button onClick={handleCreateGame}>Create New Game</Button>
      </Section>

      {showCreateGame && (
        <Modal>
          <ModalContent>
            <CreateGame onGameCreated={handleGameCreated} />
            <Button onClick={() => setShowCreateGame(false)}>Cancel</Button>
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;