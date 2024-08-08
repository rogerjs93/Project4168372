import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Card } from './Card';
import CreateGame from './CreateGame';
import { FaUserCircle, FaSpinner, FaGamepad, FaFire, FaPlus, FaHeart, FaComment, FaShare } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
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

const SocialFeedItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  animation: ${slideIn} 0.5s ease-out;
`;

const SocialFeedAuthor = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const SocialFeedContent = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SocialFeedActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TrendingTopics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const TopicTag = styled.span`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.tiny} ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const QuickGameCreation = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const GameCard = styled(Card)`
  animation: ${slideIn} 0.5s ease-out;
`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  const [showCreateGame, setShowCreateGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [trendingTopics, setTrendingTopics] = useState(['#GameDev', '#Multiplayer', '#Indie', '#PixelArt']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userResponse, postsResponse, gamesResponse] = await Promise.all([
          axios.get('http://localhost:3001/users/aa09'),
          axios.get('http://localhost:3001/posts'),
          axios.get('http://localhost:3001/games?creatorId=aa09')
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
    };

    fetchData();
  }, []);

  const handleCreateGame = () => {
    setShowCreateGame(true);
  };

  const handleGameCreated = async (newGame) => {
    try {
      const response = await axios.post('http://localhost:3001/games', {
        ...newGame,
        creatorId: user.id,
        rating: 0,
        playCount: 0
      });
      setGames([...games, response.data]);
      setShowCreateGame(false);
    } catch (error) {
      console.error('Error creating game:', error);
      setError('Failed to create game. Please try again.');
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const updatedPost = posts.find(post => post.id === postId);
      updatedPost.likes += 1;
      await axios.put(`http://localhost:3001/posts/${postId}`, updatedPost);
      setPosts(posts.map(post => post.id === postId ? updatedPost : post));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

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
        <Card title="Trending Topics">
          <TrendingTopics>
            {trendingTopics.map((topic, index) => (
              <TopicTag key={index}>{topic}</TopicTag>
            ))}
          </TrendingTopics>
        </Card>
        <QuickGameCreation>
          <SectionTitle>Quick Game Creation</SectionTitle>
          <Button onClick={handleCreateGame}>
            <FaPlus /> Create New Game
          </Button>
        </QuickGameCreation>
      </Section>

      <Section>
        <SectionTitle>Social Feed</SectionTitle>
        {posts.map(post => (
          <SocialFeedItem key={post.id}>
            <SocialFeedAuthor>{post.userId}</SocialFeedAuthor>
            <SocialFeedContent>{post.content}</SocialFeedContent>
            <SocialFeedActions>
              <ActionButton onClick={() => handleLikePost(post.id)}>
                <FaHeart /> {post.likes} Likes
              </ActionButton>
              <ActionButton>
                <FaComment /> {post.comments.length} Comments
              </ActionButton>
              <ActionButton>
                <FaShare /> Share
              </ActionButton>
            </SocialFeedActions>
          </SocialFeedItem>
        ))}
      </Section>

      <Section>
        <SectionTitle>My Games</SectionTitle>
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