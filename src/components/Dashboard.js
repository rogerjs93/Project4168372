import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaPlus, FaSpinner, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import UserProfileCard from './UserProfileCard';
import TrendingTopicsCard from './TrendingTopicsCard';
import SocialFeed from './SocialFeed';
import GameList from './GameList';
import CreateGame from './CreateGame';
import ErrorBoundary from './ErrorBoundary';
import { useAuth } from '../hooks/useAuth';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;

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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
    transform: none;
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

const QuickGameCreation = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.medium};
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
  const [postPage, setPostPage] = useState(1);
  const [gamePage, setGamePage] = useState(1);
  const postsPerPage = 5;
  const gamesPerPage = 3;

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

  if (userLoading || postsLoading || gamesLoading) return <LoadingSpinner />;
  if (userError || postsError || gamesError) return <ErrorMessage>Error loading dashboard data. Please try again later.</ErrorMessage>;

  const paginatedPosts = posts.slice((postPage - 1) * postsPerPage, postPage * postsPerPage);
  const paginatedGames = games.slice((gamePage - 1) * gamesPerPage, gamePage * gamesPerPage);

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
        </Section>

        <Section>
          <SectionTitle>Social Feed</SectionTitle>
          <SocialFeed posts={paginatedPosts} onLike={handleLikePost} />
          <PaginationControls>
            <Button onClick={() => setPostPage(prev => Math.max(prev - 1, 1))} disabled={postPage === 1}>
              <FaChevronLeft /> Previous
            </Button>
            <span>Page {postPage}</span>
            <Button onClick={() => setPostPage(prev => prev + 1)} disabled={postPage * postsPerPage >= posts.length}>
              Next <FaChevronRight />
            </Button>
          </PaginationControls>
        </Section>

        <Section>
          <SectionTitle>My Games</SectionTitle>
          <GameList games={paginatedGames} />
          <PaginationControls>
            <Button onClick={() => setGamePage(prev => Math.max(prev - 1, 1))} disabled={gamePage === 1}>
              <FaChevronLeft /> Previous
            </Button>
            <span>Page {gamePage}</span>
            <Button onClick={() => setGamePage(prev => prev + 1)} disabled={gamePage * gamesPerPage >= games.length}>
              Next <FaChevronRight />
            </Button>
          </PaginationControls>
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