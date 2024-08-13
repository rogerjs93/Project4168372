import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTrophy, FaClock, FaMedal, FaSpinner, FaExclamationCircle, FaFilter } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const GameChallengesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const FiltersBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const ChallengeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const ChallengeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: ${({ theme }) => theme.transitions.medium};
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const ChallengeTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const ChallengeGame = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ChallengeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const ChallengeMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const JoinButton = styled.button`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: ${({ theme }) => theme.fontSizes.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.large} auto;
  display: block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.errorLight};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const LoadMoreButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  margin-top: ${({ theme }) => theme.spacing.large};
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const GameChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock challenges data
  const mockChallenges = [
    { id: 1, title: 'Speed Run Challenge', game: 'Adventure Quest', timeLeft: '2 days', reward: '1000 coins' },
    { id: 2, title: 'High Score Challenge', game: 'Puzzle Mania', timeLeft: '1 week', reward: 'Exclusive Avatar' },
    { id: 3, title: 'Multiplayer Tournament', game: 'Strategy Master', timeLeft: '3 days', reward: 'Champion Trophy' },
    { id: 4, title: 'Boss Rush Challenge', game: 'Epic RPG', timeLeft: '5 days', reward: 'Legendary Weapon' },
    { id: 5, title: 'Time Attack Mode', game: 'Racing Fever', timeLeft: '4 days', reward: 'Custom Car Skin' },
    { id: 6, title: 'Survival Challenge', game: 'Zombie Outbreak', timeLeft: '6 days', reward: 'Unique Character' },
  ];

  const fetchChallenges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulated API call using mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const filteredChallenges = filter === 'all' 
        ? mockChallenges 
        : mockChallenges.filter(challenge => challenge.game === filter);
      const paginatedChallenges = filteredChallenges.slice((page - 1) * 3, page * 3);
      setChallenges(prevChallenges => page === 1 ? paginatedChallenges : [...prevChallenges, ...paginatedChallenges]);
      setHasMore(paginatedChallenges.length === 3);

      // Uncomment the following block when connecting to a real server
      /*
      const response = await axios.get(`http://localhost:3001/challenges?_page=${page}&_limit=3${filter !== 'all' ? `&game=${filter}` : ''}`);
      const newChallenges = response.data;
      setChallenges(prevChallenges => page === 1 ? newChallenges : [...prevChallenges, ...newChallenges]);
      setHasMore(newChallenges.length === 3);
      */

      setLoading(false);
    } catch (err) {
      console.error('Error fetching challenges:', err);
      setError('Failed to load challenges. Please try again later.');
      setLoading(false);
    }
  }, [filter, page]);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
    setChallenges([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleJoinChallenge = async (challengeId) => {
    try {
      // Simulated API call for joining a challenge
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      console.log(`Joined challenge ${challengeId}`);
      // You would typically update the challenge status in the state here
      // For now, we'll just log the action

      // Uncomment the following block when connecting to a real server
      /*
      await axios.post(`http://localhost:3001/challenges/${challengeId}/join`);
      // Update the challenge status in the state
      setChallenges(prevChallenges => 
        prevChallenges.map(challenge => 
          challenge.id === challengeId ? { ...challenge, joined: true } : challenge
        )
      );
      */
    } catch (err) {
      console.error('Error joining challenge:', err);
      setError('Failed to join challenge. Please try again.');
    }
  };

  return (
    <GameChallengesWrapper>
      <Header>
        <FaTrophy />
        Game Challenges
      </Header>
      <FiltersBar>
        <FilterSelect value={filter} onChange={handleFilterChange}>
          <option value="all">All Games</option>
          <option value="Adventure Quest">Adventure Quest</option>
          <option value="Puzzle Mania">Puzzle Mania</option>
          <option value="Strategy Master">Strategy Master</option>
        </FilterSelect>
      </FiltersBar>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <ChallengeList>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id}>
            <ChallengeTitle>{challenge.title}</ChallengeTitle>
            <ChallengeGame>Game: {challenge.game}</ChallengeGame>
            <ChallengeInfo>
              <ChallengeMetadata>
                <FaClock /> {challenge.timeLeft} left
              </ChallengeMetadata>
              <ChallengeMetadata>
                <FaMedal /> Reward: {challenge.reward}
              </ChallengeMetadata>
            </ChallengeInfo>
            <JoinButton onClick={() => handleJoinChallenge(challenge.id)}>
              Join Challenge
            </JoinButton>
          </ChallengeCard>
        ))}
      </ChallengeList>
      {loading && <LoadingSpinner />}
      {!loading && hasMore && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
          Load More Challenges
        </LoadMoreButton>
      )}
    </GameChallengesWrapper>
  );
};

export default GameChallenges;