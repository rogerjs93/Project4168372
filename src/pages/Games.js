import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaGamepad, FaPlug, FaSort } from 'react-icons/fa';
import ErrorBoundary from '../components/ErrorBoundary';
import GameCard from '../components/GameCard';
import LoadingSpinner from '../components/LoadingSpinner';
import useDebounce from '../hooks/useDebounce';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { useToast } from '../hooks/useToast';

const GamesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 100px);
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

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  width: 100%;
  max-width: 300px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.errorLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const FilterDropdown = styled.select`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
`;

const GamesListWrapper = styled.div`
  flex-grow: 1;
  position: relative;

  .scrollable-content {
    overflow-y: scroll !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

const SortButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const Games = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [hasNextPage, setHasNextPage] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const pageRef = useRef(1);
  const addToast = useToast();

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
          _sort: 'title',
          _order: sortOrder,
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
      addToast('error', 'Failed to load games. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, filter, hasNextPage, sortOrder, addToast]);

  useEffect(() => {
    setGames([]);
    pageRef.current = 1;
    setHasNextPage(true);
    fetchGames();
  }, [debouncedSearchTerm, filter, sortOrder, fetchGames]);

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

  const handleSortToggle = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
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
          <FilterDropdown value={filter} onChange={handleFilterChange} aria-label="Filter games">
            <option value="all">All Games</option>
            <option value="action">Action</option>
            <option value="puzzle">Puzzle</option>
            <option value="strategy">Strategy</option>
            <option value="rpg">RPG</option>
          </FilterDropdown>
          <SortButton onClick={handleSortToggle} aria-label="Sort games">
            <FaSort /> Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </SortButton>
          <Button onClick={handleConnectExternal}>
            <FaPlug /> Connect External Program
          </Button>
        </GamesHeader>
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
        {isLoading && <LoadingSpinner />}
      </GamesWrapper>
    </ErrorBoundary>
  );
};

// Example of mock game data (to be removed when connecting to a real server)
const mockGames = [
  { id: 1, title: 'Adventure Quest', gameType: 'action', rating: 4.5 },
  { id: 2, title: 'Puzzle Master', gameType: 'puzzle', rating: 4.2 },
  { id: 3, title: 'Strategy Empire', gameType: 'strategy', rating: 4.7 },
  { id: 4, title: 'RPG Legends', gameType: 'rpg', rating: 4.8 },
  { id: 5, title: 'Racing Rivals', gameType: 'racing', rating: 4.3 },
  { id: 6, title: 'Zombie Survival', gameType: 'action', rating: 4.1 },
  { id: 7, title: 'Sudoku Challenge', gameType: 'puzzle', rating: 4.4 },
  { id: 8, title: 'Civilization Builder', gameType: 'strategy', rating: 4.9 },
  { id: 9, title: 'Fantasy Quest', gameType: 'rpg', rating: 4.6 },
  { id: 10, title: 'Sports Simulator', gameType: 'sports', rating: 4.0 },
  { id: 11, title: 'Ninja Warrior', gameType: 'action', rating: 4.2 },
  { id: 12, title: 'Mind Bender', gameType: 'puzzle', rating: 4.5 },
  { id: 13, title: 'Space Conqueror', gameType: 'strategy', rating: 4.7 },
  { id: 14, title: 'Dragon Slayer', gameType: 'rpg', rating: 4.8 },
  { id: 15, title: 'Street Racer', gameType: 'racing', rating: 4.1 },
  { id: 16, title: 'Alien Invasion', gameType: 'action', rating: 4.3 },
  { id: 17, title: 'Crossword Master', gameType: 'puzzle', rating: 4.2 },
  { id: 18, title: 'War Commander', gameType: 'strategy', rating: 4.6 },
  { id: 19, title: 'Mystic Realms', gameType: 'rpg', rating: 4.9 },
  { id: 20, title: 'Basketball Pro', gameType: 'sports', rating: 4.4 },
  { id: 21, title: 'Stealth Assassin', gameType: 'action', rating: 4.5 },
  { id: 22, title: 'Logic Labyrinth', gameType: 'puzzle', rating: 4.3 },
  { id: 23, title: 'City Planner', gameType: 'strategy', rating: 4.7 },
  { id: 24, title: 'Pirate Adventures', gameType: 'rpg', rating: 4.6 },
  // Add more mock games as needed
];

export default React.memo(Games);