import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card } from './Card';
import CreateGame from './CreateGame';
import { FaUserCircle, FaSpinner } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.large};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
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
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

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
  box-shadow: ${({ theme }) => theme.boxShadow.large};
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Avatar = styled(FaUserCircle)`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Email = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.medium};
`;

const LoadingSpinner = styled(FaSpinner)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  const [showCreateGame, setShowCreateGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          setLoading(true);
          const [userResponse, postsResponse, gamesResponse] = await Promise.all([
            axios.get(`http://localhost:3001/users/${userId}`),
            axios.get(`http://localhost:3001/posts?userId=${userId}`),
            axios.get(`http://localhost:3001/games?creatorId=${userId}`)
          ]);

          setUser(userResponse.data);
          setPosts(postsResponse.data);
          setGames(gamesResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load dashboard data. Please try again later.');
        } finally {
          setLoading(false);
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
      setError('Failed to create game. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <DashboardContainer>
      <Section>
        <Card title="User Profile">
          {user && (
            <UserProfile>
              <Avatar />
              <UserInfo>
                <Username>{user.username}</Username>
                <Email>{user.email}</Email>
              </UserInfo>
            </UserProfile>
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
        <GameGrid>
          {games.map(game => (
            <Card key={game.id} title={game.title}>
              <p>{game.description || 'No description available.'}</p>
              <p>Type: {game.gameType}</p>
              <p>Entities: {game.entities ? Object.keys(game.entities).length : 0}</p>
            </Card>
          ))}
        </GameGrid>
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