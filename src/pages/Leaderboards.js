import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTrophy, FaCalendarAlt, FaUsers, FaCoins, FaSpinner, FaExclamationCircle, FaFilter } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const TournamentsWrapper = styled.div`
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

const TournamentList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const TournamentCard = styled.div`
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

const TournamentTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const GameTitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const TournamentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: ${({ theme }) => theme.fontSizes.medium};

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

const GameTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock tournaments data
  const mockTournaments = [
    {
      id: 1,
      title: 'Summer Showdown',
      game: 'Battle Royale',
      date: '2023-07-15',
      participants: 64,
      prizePool: 10000,
    },
    {
      id: 2,
      title: 'Strategy Masters Cup',
      game: 'Chess Championship',
      date: '2023-08-01',
      participants: 32,
      prizePool: 5000,
    },
    {
      id: 3,
      title: 'Speed Racers Grand Prix',
      game: 'Turbo Racing Simulator',
      date: '2023-08-20',
      participants: 100,
      prizePool: 15000,
    },
    {
      id: 4,
      title: 'Puzzle Masters Challenge',
      game: 'Brain Teasers Deluxe',
      date: '2023-09-05',
      participants: 50,
      prizePool: 7500,
    },
    {
      id: 5,
      title: 'MOBA Mayhem',
      game: 'League of Legends',
      date: '2023-09-15',
      participants: 128,
      prizePool: 20000,
    },
    {
      id: 6,
      title: 'FPS Frenzy',
      game: 'Counter-Strike: Global Offensive',
      date: '2023-10-01',
      participants: 64,
      prizePool: 12000,
    },
  ];

  const fetchTournaments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulated API call using mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const filteredTournaments = filter === 'all' 
        ? mockTournaments 
        : mockTournaments.filter(tournament => tournament.game === filter);
      const paginatedTournaments = filteredTournaments.slice((page - 1) * 3, page * 3);
      setTournaments(prevTournaments => page === 1 ? paginatedTournaments : [...prevTournaments, ...paginatedTournaments]);
      setHasMore(paginatedTournaments.length === 3);

      // Uncomment the following block when connecting to a real server
      /*
      const response = await axios.get(`http://localhost:3001/tournaments?_page=${page}&_limit=3${filter !== 'all' ? `&game=${filter}` : ''}`);
      const newTournaments = response.data;
      setTournaments(prevTournaments => page === 1 ? newTournaments : [...prevTournaments, ...newTournaments]);
      setHasMore(newTournaments.length === 3);
      */

      setLoading(false);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      setError('Failed to load tournaments. Please try again later.');
      setLoading(false);
    }
  }, [filter, page]);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
    setTournaments([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleRegister = async (tournamentId) => {
    try {
      // Simulated API call for registering to a tournament
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      console.log(`Registered for tournament ${tournamentId}`);
      // You would typically update the tournament status in the state here
      // For now, we'll just log the action

      // Uncomment the following block when connecting to a real server
      /*
      await axios.post(`http://localhost:3001/tournaments/${tournamentId}/register`);
      // Update the tournament status in the state
      setTournaments(prevTournaments => 
        prevTournaments.map(tournament => 
          tournament.id === tournamentId ? { ...tournament, registered: true } : tournament
        )
      );
      */
    } catch (err) {
      console.error('Error registering for tournament:', err);
      setError('Failed to register for tournament. Please try again.');
    }
  };

  return (
    <TournamentsWrapper>
      <Header>
        <FaTrophy />
        Game Tournaments
      </Header>
      <FiltersBar>
        <FilterSelect value={filter} onChange={handleFilterChange}>
          <option value="all">All Games</option>
          <option value="Battle Royale">Battle Royale</option>
          <option value="Chess Championship">Chess Championship</option>
          <option value="Turbo Racing Simulator">Turbo Racing Simulator</option>
        </FilterSelect>
      </FiltersBar>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <TournamentList>
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id}>
            <TournamentTitle>{tournament.title}</TournamentTitle>
            <GameTitle>Game: {tournament.game}</GameTitle>
            <TournamentInfo>
              <InfoItem>
                <FaCalendarAlt /> {tournament.date}
              </InfoItem>
              <InfoItem>
                <FaUsers /> {tournament.participants} participants
              </InfoItem>
              <InfoItem>
                <FaCoins /> Prize Pool: ${tournament.prizePool.toLocaleString()}
              </InfoItem>
            </TournamentInfo>
            <RegisterButton onClick={() => handleRegister(tournament.id)}>
              Register Now
            </RegisterButton>
          </TournamentCard>
        ))}
      </TournamentList>
      {loading && <LoadingSpinner />}
      {!loading && hasMore && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
          Load More Tournaments
        </LoadMoreButton>
      )}
    </TournamentsWrapper>
  );
};

export default GameTournaments;