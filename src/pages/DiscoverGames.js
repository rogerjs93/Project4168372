import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSearch, FaStar, FaSpinner, FaExclamationCircle, FaGamepad } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DiscoverGamesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  background: none;
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.large};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const GameCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: ${({ theme }) => theme.transitions.medium};
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const GameInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const GameTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const GameRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.tiny};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.small};
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
  background-color: ${({ theme }) => theme.colors.primary};
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
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const DiscoverGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock games data
  const mockGames = [
    { id: 1, title: 'Adventure Quest', image: 'https://picsum.photos/seed/game1/250/150', rating: 4.5 },
    { id: 2, title: 'Strategy Master', image: 'https://picsum.photos/seed/game2/250/150', rating: 4.2 },
    { id: 3, title: 'Puzzle Mania', image: 'https://picsum.photos/seed/game3/250/150', rating: 4.7 },
    { id: 4, title: 'Sports Challenge', image: 'https://picsum.photos/seed/game4/250/150', rating: 4.0 },
    { id: 5, title: 'Space Explorer', image: 'https://picsum.photos/seed/game5/250/150', rating: 4.8 },
    { id: 6, title: 'Racing Fever', image: 'https://picsum.photos/seed/game6/250/150', rating: 4.3 },
    { id: 7, title: 'Zombie Survival', image: 'https://picsum.photos/seed/game7/250/150', rating: 4.6 },
    { id: 8, title: 'Medieval Conquest', image: 'https://picsum.photos/seed/game8/250/150', rating: 4.1 },
  ];

  const fetchGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulated API call using mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const filteredGames = mockGames.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const paginatedGames = filteredGames.slice((page - 1) * 4, page * 4);
      setGames(prevGames => page === 1 ? paginatedGames : [...prevGames, ...paginatedGames]);
      setHasMore(paginatedGames.length === 4);

      // Uncomment the following block when connecting to a real server
      /*
      const response = await axios.get(`http://localhost:3001/games?_page=${page}&_limit=4&q=${searchTerm}`);
      const newGames = response.data;
      setGames(prevGames => page === 1 ? newGames : [...prevGames, ...newGames]);
      setHasMore(newGames.length === 4);
      */

      setLoading(false);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games. Please try again later.');
      setLoading(false);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const handleSearch = () => {
    setPage(1);
    setGames([]);
    fetchGames();
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <DiscoverGamesWrapper>
      <Header>
        <FaGamepad />
        Discover Games
      </Header>
      <SearchBar>
        <SearchInput
          placeholder="Search for games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>
          <FaSearch />
        </SearchButton>
      </SearchBar>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <GameGrid>
        {games.map((game) => (
          <GameCard key={game.id}>
            <GameImage src={game.image} alt={game.title} loading="lazy" />
            <GameInfo>
              <GameTitle>{game.title}</GameTitle>
              <GameRating>
                <FaStar /> {game.rating}
              </GameRating>
            </GameInfo>
          </GameCard>
        ))}
      </GameGrid>
      {loading && <LoadingSpinner />}
      {!loading && hasMore && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
          Load More Games
        </LoadMoreButton>
      )}
    </DiscoverGamesWrapper>
  );
};

export default DiscoverGames;