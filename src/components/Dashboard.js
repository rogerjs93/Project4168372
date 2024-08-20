import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { FaPlus, FaSpinner, FaChevronLeft, FaChevronRight, FaChartLine, FaGamepad, FaUsers, FaStar } from 'react-icons/fa';
import UserProfileCard from './UserProfileCard';
import TrendingTopicsCard from './TrendingTopicsCard';
import SocialFeed from './SocialFeed';
import GameList from './GameList';
import CreateGame from './CreateGame';
import ErrorBoundary from './ErrorBoundary';
import { useAuth } from '../hooks/useAuth';
import Skeleton from './SkeletonLoader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.medium};
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 2fr 1fr;
    padding: ${({ theme }) => theme.spacing.large};
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.small};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
  }
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
  font-size: ${({ theme }) => theme.fontSizes.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
    transform: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.medium};
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
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.boxShadow.large};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.large};
  }
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
  padding: ${({ theme }) => theme.spacing.medium};
`;

const QuickGameCreation = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const SkeletonCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ScrollableSection = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
    border: 3px solid ${({ theme }) => theme.colors.background};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 500px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
  }
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ChartContainer = styled.div`
  height: 250px;
  margin-bottom: ${({ theme }) => theme.spacing.large};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 300px;
  }
`;

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  const [showCreateGame, setShowCreateGame] = useState(false);
  const [activityData, setActivityData] = useState([]);

  const { data: userData, loading: userLoading, error: userError } = useFetch(`http://localhost:3001/users/${user?.id}`);
  const { data: postsData, loading: postsLoading, error: postsError } = useFetch('http://localhost:3001/posts');
  const { data: gamesData, loading: gamesLoading, error: gamesError } = useFetch(`http://localhost:3001/games?creatorId=${user?.id}`);

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }
  }, [postsData]);

  useEffect(() => {
    if (gamesData) {
      setGames(gamesData);
      // Generate mock activity data
      const mockActivityData = gamesData.map((game, index) => ({
        date: new Date(Date.now() - (30 - index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        plays: Math.floor(Math.random() * 100)
      }));
      setActivityData(mockActivityData);
    }
  }, [gamesData]);

  const handleCreateGame = () => {
    setShowCreateGame(true);
  };

  const handleGameCreated = useCallback(async (newGame) => {
    try {
      const response = await axios.post('http://localhost:3001/games', {
        ...newGame,
        creatorId: user.id,
        rating: 0,
        playCount: 0
      });
      setGames(prevGames => [...prevGames, response.data]);
      setShowCreateGame(false);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  }, [user]);

  const handleLikePost = useCallback(async (postId) => {
    try {
      const updatedPost = posts.find(post => post.id === postId);
      updatedPost.likes += 1;
      await axios.put(`http://localhost:3001/posts/${postId}`, updatedPost);
      setPosts(prevPosts => prevPosts.map(post => post.id === postId ? updatedPost : post));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }, [posts]);

  const renderSkeletonDashboard = () => (
    <DashboardContainer>
      <Section>
        <SkeletonCard>
          <Skeleton.Circle size="80px" />
          <Skeleton.Line height="20px" width="60%" />
          <Skeleton.Line height="16px" width="40%" />
        </SkeletonCard>
        <SkeletonCard>
          <Skeleton.Line height="24px" width="80%" />
          <Skeleton.Line height="16px" width="100%" />
          <Skeleton.Line height="16px" width="100%" />
        </SkeletonCard>
      </Section>
      <Section>
        <SectionTitle>Social Feed</SectionTitle>
        {[1, 2, 3].map((_, index) => (
          <SkeletonCard key={index}>
            <Skeleton.Line height="20px" width="40%" />
            <Skeleton.Line height="16px" width="100%" />
            <Skeleton.Line height="16px" width="80%" />
          </SkeletonCard>
        ))}
      </Section>
      <Section>
        <SectionTitle>My Games</SectionTitle>
        {[1, 2, 3].map((_, index) => (
          <SkeletonCard key={index}>
            <Skeleton.Rect height="100px" />
            <Skeleton.Line height="20px" width="60%" />
            <Skeleton.Line height="16px" width="40%" />
          </SkeletonCard>
        ))}
      </Section>
    </DashboardContainer>
  );

  if (userLoading || postsLoading || gamesLoading) return renderSkeletonDashboard();
  if (userError || postsError || gamesError) return <ErrorMessage>Error loading dashboard data. Please try again later.</ErrorMessage>;

  return (
    <ErrorBoundary>
      <DashboardContainer>
        <Section>
          <UserProfileCard user={userData} />
          <TrendingTopicsCard />
          <QuickGameCreation>
            <SectionTitle>Quick Game Creation</SectionTitle>
            <Button onClick={handleCreateGame}>
              <FaPlus /> Create New Game
            </Button>
          </QuickGameCreation>
          <StatsGrid>
            <StatCard>
              <StatValue><FaGamepad /> {games.length}</StatValue>
              <StatLabel>Games Created</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue><FaUsers /> {userData.followers || 0}</StatValue>
              <StatLabel>Followers</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue><FaChartLine /> {games.reduce((sum, game) => sum + game.playCount, 0)}</StatValue>
              <StatLabel>Total Plays</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue><FaStar /> {(games.reduce((sum, game) => sum + game.rating, 0) / games.length || 0).toFixed(1)}</StatValue>
              <StatLabel>Avg. Rating</StatLabel>
            </StatCard>
          </StatsGrid>
          <ChartContainer>
            <SectionTitle>Game Activity</SectionTitle>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="plays" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Section>

        <Section>
          <SectionTitle>Social Feed</SectionTitle>
          <ScrollableSection>
            <SocialFeed posts={posts} onLike={handleLikePost} />
          </ScrollableSection>
        </Section>

        <Section>
          <SectionTitle>My Games</SectionTitle>
          <ScrollableSection>
            <GameList games={games} />
          </ScrollableSection>
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
    </ErrorBoundary>
  );
};

export default Dashboard;