import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaGamepad, FaPlug } from 'react-icons/fa';
import ErrorBoundary from '../components/ErrorBoundary';
import GameCard from '../components/GameCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useDebounce from '../hooks/useDebounce';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

const GamesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 800px; // Adjust based on your layout
  margin: 0 auto;
  height: calc(100vh - 100px); // Adjust based on your layout
  display: flex;
  flex-direction: column;
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

const GamesListWrapper = styled.div`
  flex-grow: 1;
  position: relative;

  /* Hide scrollbars */
  .scrollable-container {
    overflow: hidden !important;
  }

  /* Custom scrollbar style */
  .scrollable-content {
    overflow-y: scroll !important;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    &::-webkit-scrollbar { /* WebKit */
      width: 0;
      height: 0;
    }
  }
`;

const Games = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [hasNextPage, setHasNextPage] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const pageRef = useRef(1);

  const ITEMS_PER_PAGE = 20;

  const fetchGames = useCallback(async () => {
    if (!hasNextPage) return;

    setIsLoading(true);
    setError(null);
    try {
      // NOTE: This is using mock data. Replace with actual API call when connecting to a real server
      const response = await axios.get(`http://localhost:3001/games`, {
        params: {
          _page: pageRef.current,
          _limit: ITEMS_PER_PAGE,
          q: debouncedSearchTerm,
          gameType: filter !== 'all' ? filter : undefined,
        },
      });
      
      // NOTE: When connecting to a real server, ensure the API returns both the games and the total count
      const newGames = response.data;
      setGames(prevGames => [...prevGames, ...newGames]);
      setHasNextPage(newGames.length === ITEMS_PER_PAGE);
      pageRef.current += 1;
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, filter, hasNextPage]);

  useEffect(() => {
    setGames([]);
    pageRef.current = 1;
    setHasNextPage(true);
    fetchGames();
  }, [debouncedSearchTerm, filter]);

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

  const MemoizedGameCard = useMemo(() => React.memo(GameCard), []);

  const Row = ({ index, style }) => {
    if (index >= games.length) return null;
    const game = games[index];
    return (
      <div style={style}>
        <MemoizedGameCard game={game} />
      </div>
    );
  };

  const itemCount = hasNextPage ? games.length + 1 : games.length;

  const loadMoreItems = isLoading ? () => {} : fetchGames;

  const isItemLoaded = (index) => !hasNextPage || index < games.length;

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
          <GamesListWrapper>
            <AutoSizer>
              {({ height, width }) => (
                <InfiniteLoader
                  isItemLoaded={isItemLoaded}
                  itemCount={itemCount}
                  loadMoreItems={loadMoreItems}
                >
                  {({ onItemsRendered, ref }) => (
                    <List
                      ref={ref}
                      height={height}
                      itemCount={itemCount}
                      itemSize={300} // Adjust based on your GameCard height
                      width={width}
                      onItemsRendered={onItemsRendered}
                      className="scrollable-content"
                      style={{ overflowX: 'hidden' }}
                    >
                      {Row}
                    </List>
                  )}
                </InfiniteLoader>
              )}
            </AutoSizer>
          </GamesListWrapper>
        )}
        {isLoading && <LoadingSpinner />}
      </GamesWrapper>
    </ErrorBoundary>
  );
};

export default React.memo(Games);