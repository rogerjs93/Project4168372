import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaGamepad, FaPlug } from 'react-icons/fa';
// import { FaFilter } from 'react-icons/fa'; // Uncomment when implementing advanced filtering
import ErrorBoundary from '../components/ErrorBoundary';
import GameCard from '../components/GameCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useDebounce from '../hooks/useDebounce';

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
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const GamesTitle = styled.h1`
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.boxShadow.small};
  }
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  width: 100%;
  max-width: 300px;
`;

const GamesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.large};
`;

const FilterDropdown = styled.select`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Games = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const gamesPerPage = 12;

  const lastGameElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // For the mock server, we'll fetch all games and then filter them client-side
      const response = await axios.get(`http://localhost:3001/games`);
      let filteredGames = response.data;

      // Apply search filter
      if (debouncedSearchTerm) {
        filteredGames = filteredGames.filter(game => 
          game.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          (game.description && game.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        );
      }

      // Apply game type filter
      if (filter !== 'all') {
        filteredGames = filteredGames.filter(game => game.gameType === filter);
      }

      // Apply pagination
      const paginatedGames = filteredGames.slice((page - 1) * gamesPerPage, page * gamesPerPage);

      setGames(prevGames => page === 1 ? paginatedGames : [...prevGames, ...paginatedGames]);
      setHasMore(paginatedGames.length === gamesPerPage);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearchTerm, filter]);

  useEffect(() => {
    setGames([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedSearchTerm, filter]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleConnectExternal = () => {
    console.log('Connecting to external program...');
    alert('This feature will be implemented in the future to connect with an external game creation program.');
  };

  return (
    <ErrorBoundary>
      <GamesWrapper>
        <GamesHeader>
          <GamesTitle>
            <FaGamepad /> Games
          </GamesTitle>
          <SearchInput
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search games"
          />
          <FilterDropdown value={filter} onChange={handleFilterChange}>
            <option value="all">All Games</option>
            <option value="action">Action</option>
            <option value="puzzle">Puzzle</option>
            <option value="strategy">Strategy</option>
            <option value="rpg">RPG</option>
          </FilterDropdown>
          <Button onClick={handleConnectExternal}>
            <FaPlug /> Connect External Program
          </Button>
        </GamesHeader>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <GamesList>
            {games.map((game, index) => (
              <GameCard 
                key={game.id} 
                game={game} 
                ref={games.length === index + 1 ? lastGameElementRef : undefined}
              />
            ))}
          </GamesList>
        )}
        {isLoading && <LoadingSpinner />}
      </GamesWrapper>
    </ErrorBoundary>
  );
};

export default Games;