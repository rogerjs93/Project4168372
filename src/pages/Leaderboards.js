import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaMedal, FaUser, FaSpinner, FaExclamationCircle } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LeaderboardsWrapper = styled.div`
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

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 ${({ theme }) => theme.spacing.small};
`;

const TableHeader = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-transform: uppercase;
`;

const TableRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: ${({ theme }) => theme.transitions.fast};
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const RankCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const PlayerName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Score = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.secondary};
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

const Leaderboards = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('overall');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchLeaderboardData = useCallback(async () => {
    // Move mockLeaderboardData inside the callback
    const mockLeaderboardData = [
      { id: 1, rank: 1, name: 'Player1', score: 10000 },
      { id: 2, rank: 2, name: 'Player2', score: 9500 },
      { id: 3, rank: 3, name: 'Player3', score: 9000 },
      { id: 4, rank: 4, name: 'Player4', score: 8500 },
      { id: 5, rank: 5, name: 'Player5', score: 8000 },
      { id: 6, rank: 6, name: 'Player6', score: 7500 },
      { id: 7, rank: 7, name: 'Player7', score: 7000 },
      { id: 8, rank: 8, name: 'Player8', score: 6500 },
      { id: 9, rank: 9, name: 'Player9', score: 6000 },
      { id: 10, rank: 10, name: 'Player10', score: 5500 },
    ];

    try {
      setLoading(true);
      setError(null);

      // Simulated API call using mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const filteredData = filter === 'overall' 
        ? mockLeaderboardData 
        : mockLeaderboardData.filter(player => player.game === filter);
      const paginatedData = filteredData.slice((page - 1) * 5, page * 5);
      setLeaderboardData(prevData => page === 1 ? paginatedData : [...prevData, ...paginatedData]);
      setHasMore(paginatedData.length === 5);

      // Uncomment the following block when connecting to a real server
      /*
      const response = await axios.get(`http://localhost:3001/leaderboard?_page=${page}&_limit=5${filter !== 'overall' ? `&game=${filter}` : ''}`);
      const newData = response.data;
      setLeaderboardData(prevData => page === 1 ? newData : [...prevData, ...newData]);
      setHasMore(newData.length === 5);
      */

      setLoading(false);
    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
      setError('Failed to load leaderboard data. Please try again later.');
      setLoading(false);
    }
  }, [filter, page]);

  useEffect(() => {
    fetchLeaderboardData();
  }, [fetchLeaderboardData]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
    setLeaderboardData([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <FaMedal color="gold" />;
      case 2: return <FaMedal color="silver" />;
      case 3: return <FaMedal color="#CD7F32" />;
      default: return <FaUser />;
    }
  };

  return (
    <LeaderboardsWrapper>
      <Header>
        <FaMedal />
        Leaderboards
      </Header>
      <FiltersBar>
        <FilterSelect value={filter} onChange={handleFilterChange}>
          <option value="overall">Overall</option>
          <option value="puzzle">Puzzle Games</option>
          <option value="action">Action Games</option>
          <option value="strategy">Strategy Games</option>
        </FilterSelect>
      </FiltersBar>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <LeaderboardTable>
        <thead>
          <tr>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Player</TableHeader>
            <TableHeader>Score</TableHeader>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player) => (
            <TableRow key={player.id}>
              <RankCell>
                {getRankIcon(player.rank)}
                {player.rank}
              </RankCell>
              <TableCell>
                <PlayerName>{player.name}</PlayerName>
              </TableCell>
              <TableCell>
                <Score>{player.score.toLocaleString()}</Score>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </LeaderboardTable>
      {loading && <LoadingSpinner />}
      {!loading && hasMore && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
          Load More
        </LoadMoreButton>
      )}
    </LeaderboardsWrapper>
  );
};

export default Leaderboards;