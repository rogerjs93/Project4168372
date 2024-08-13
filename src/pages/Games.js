import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaGamepad, FaPlug } from 'react-icons/fa';
import ErrorBoundary from '../components/ErrorBoundary';
import GameCard from '../components/GameCard';
import LoadingSpinner from '../components/LoadingSpinner';

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

const ConnectExternalButton = styled.button`
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

const Games = () => {
  const [allGames, setAllGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3001/games`);
      setAllGames(response.data);
      setFilteredGames(response.data);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = allGames.filter(game => 
      game.title.toLowerCase().includes(lowercasedSearch) ||
      (game.description && game.description.toLowerCase().includes(lowercasedSearch))
    );
    setFilteredGames(filtered);
  }, [searchTerm, allGames]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
          <ConnectExternalButton onClick={handleConnectExternal}>
            <FaPlug /> Connect External Program
          </ConnectExternalButton>
        </GamesHeader>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <GamesList>
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </GamesList>
        )}
      </GamesWrapper>
    </ErrorBoundary>
  );
};

export default Games;