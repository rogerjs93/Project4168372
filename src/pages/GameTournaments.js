import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTrophy, FaCalendarAlt, FaUsers, FaCoins, FaSearch, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const TournamentsWrapper = styled.div`
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
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  &:focus {
    outline: none;
  }
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
`;

const TournamentGame = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
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
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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

const GameTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTournaments = useCallback(async () => {
    setLoading(true);
    try {
      // Simulated API call using setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data (replace this with actual API call when connecting to a real server)
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
          title: 'Puzzle Mania',
          game: 'Tetris Tournament',
          date: '2023-09-05',
          participants: 128,
          prizePool: 7500,
        },
      ];
      setTournaments(mockTournaments);

      // Uncomment the following lines when connecting to a real server
      // const response = await axios.get('http://localhost:3001/tournaments');
      // setTournaments(response.data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const filteredTournaments = tournaments.filter(tournament =>
    tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tournament.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegister = (tournamentId) => {
    // Implement registration logic here
    console.log(`Registered for tournament ${tournamentId}`);
  };

  return (
    <TournamentsWrapper>
      <Header>
        <FaTrophy />
        Game Tournaments
      </Header>
      <SearchBar>
        <FaSearch />
        <SearchInput
          type="text"
          placeholder="Search tournaments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TournamentList>
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id}>
              <TournamentTitle>{tournament.title}</TournamentTitle>
              <TournamentGame>{tournament.game}</TournamentGame>
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
      )}
    </TournamentsWrapper>
  );
};

export default GameTournaments;