import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaTrophy, FaCalendarAlt, FaUsers, FaCoins, FaSearch, FaGamepad, FaPlus } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background-color: #f0f2f5;
    color: #1c1e21;
  }
`;

const TournamentsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1877f2;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CreateTournamentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #166fe5;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: #1c1e21;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const TournamentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TournamentCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const TournamentTitle = styled.h3`
  color: #1c1e21;
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

const TournamentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #65676b;
  font-size: 14px;
  margin-bottom: 4px;
`;

const RegisterButton = styled.button`
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  margin-top: 12px;

  &:hover {
    background-color: #166fe5;
  }
`;

const GameTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const generateMockTournaments = useCallback(() => {
    // This function will be replaced with actual API call when connecting to a real server
    return [
      { id: 1, title: 'Summer Showdown', game: 'Battle Royale', date: '2023-07-15', participants: 64, prizePool: 10000 },
      { id: 2, title: 'Strategy Masters Cup', game: 'Chess Championship', date: '2023-08-01', participants: 32, prizePool: 5000 },
      { id: 3, title: 'Speed Racers Grand Prix', game: 'Turbo Racing Simulator', date: '2023-08-20', participants: 100, prizePool: 15000 },
      { id: 4, title: 'Puzzle Mania', game: 'Tetris Tournament', date: '2023-09-05', participants: 128, prizePool: 7500 },
      { id: 5, title: 'FPS Frenzy', game: 'Shooter Elite', date: '2023-09-15', participants: 64, prizePool: 12000 },
      { id: 6, title: 'MOBA Mayhem', game: 'League of Legends', date: '2023-10-01', participants: 16, prizePool: 20000 },
      { id: 7, title: 'Fighting Game Showdown', game: 'Street Fighter VI', date: '2023-10-10', participants: 32, prizePool: 8000 },
      { id: 8, title: 'Card Masters Duel', game: 'Hearthstone', date: '2023-10-20', participants: 64, prizePool: 6000 },
      { id: 9, title: 'Sports Spectacular', game: 'FIFA 23', date: '2023-11-01', participants: 32, prizePool: 10000 },
      { id: 10, title: 'RTS Championship', game: 'Starcraft II', date: '2023-11-15', participants: 16, prizePool: 15000 },
      { id: 11, title: 'Battle Royale Bonanza', game: 'Fortnite', date: '2023-11-30', participants: 100, prizePool: 25000 },
      { id: 12, title: 'RPG Raid Race', game: 'World of Warcraft', date: '2023-12-10', participants: 20, prizePool: 10000 },
      { id: 13, title: 'Rhythm Game Rave', game: 'Beat Saber', date: '2023-12-20', participants: 32, prizePool: 5000 },
      { id: 14, title: 'Tactical Shooter Takedown', game: 'Counter-Strike: Global Offensive', date: '2024-01-05', participants: 16, prizePool: 20000 },
      { id: 15, title: 'Racing Sim Showdown', game: 'iRacing', date: '2024-01-15', participants: 20, prizePool: 10000 },
      { id: 16, title: 'Platformer Paradise', game: 'Super Mario Maker 2', date: '2024-01-25', participants: 64, prizePool: 5000 },
      { id: 17, title: 'Arena Brawl', game: 'Super Smash Bros. Ultimate', date: '2024-02-05', participants: 128, prizePool: 15000 },
      { id: 18, title: 'Space Strategy Summit', game: 'Stellaris', date: '2024-02-15', participants: 16, prizePool: 7500 },
      { id: 19, title: 'Virtual Reality Vendetta', game: 'Half-Life: Alyx', date: '2024-02-25', participants: 32, prizePool: 10000 },
      { id: 20, title: 'Retro Gaming Rumble', game: 'Multiple Classic Games', date: '2024-03-05', participants: 64, prizePool: 5000 },
      { id: 21, title: 'Survival Showdown', game: 'Minecraft', date: '2024-03-15', participants: 100, prizePool: 8000 },
      { id: 22, title: 'Rogue-like Rampage', game: 'Hades', date: '2024-03-25', participants: 32, prizePool: 6000 },
      { id: 23, title: 'Simulator Spectacular', game: 'Microsoft Flight Simulator', date: '2024-04-05', participants: 20, prizePool: 10000 },
      { id: 24, title: 'Dungeon Crawler Contest', game: 'Path of Exile', date: '2024-04-15', participants: 64, prizePool: 12000 },
      { id: 25, title: 'Mobile Gaming Masters', game: 'Multiple Mobile Games', date: '2024-04-25', participants: 128, prizePool: 15000 },
      { id: 26, title: 'Esports Extravaganza', game: 'Multiple Games', date: '2024-05-05', participants: 256, prizePool: 50000 },
      { id: 27, title: 'Speedrun Sensation', game: 'Multiple Games', date: '2024-05-15', participants: 32, prizePool: 10000 },
      { id: 28, title: 'Grand Strategy Gala', game: 'Europa Universalis IV', date: '2024-05-25', participants: 16, prizePool: 7500 },
      { id: 29, title: 'Indie Game Invitational', game: 'Multiple Indie Games', date: '2024-06-05', participants: 64, prizePool: 10000 },
      { id: 30, title: 'Crossplay Championship', game: 'Rocket League', date: '2024-06-15', participants: 48, prizePool: 15000 },
    ];
  }, []);

  useEffect(() => {
    setTournaments(generateMockTournaments());
  }, [generateMockTournaments]);

  const handleRegister = useCallback((tournamentId) => {
    console.log(`Registered for tournament ${tournamentId}`);
    // Implement registration logic here
  }, []);

  const handleCreateTournament = useCallback(() => {
    console.log('Create new tournament');
    // Implement tournament creation logic here
  }, []);

  const filteredTournaments = useMemo(() => 
    tournaments.filter(tournament =>
      tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.game.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [tournaments, searchTerm]
  );

  return (
    <>
      <GlobalStyle />
      <TournamentsWrapper>
        <Header>
          <FaTrophy />
          Game Tournaments
        </Header>
        <ActionsBar>
          <CreateTournamentButton onClick={handleCreateTournament}>
            <FaPlus /> Create New Tournament
          </CreateTournamentButton>
          <SearchBar>
            <FaSearch color="#65676b" />
            <SearchInput
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </ActionsBar>
        <TournamentGrid>
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id}>
              <TournamentTitle>{tournament.title}</TournamentTitle>
              <TournamentInfo>
                <FaGamepad /> {tournament.game}
              </TournamentInfo>
              <TournamentInfo>
                <FaCalendarAlt /> {tournament.date}
              </TournamentInfo>
              <TournamentInfo>
                <FaUsers /> {tournament.participants} participants
              </TournamentInfo>
              <TournamentInfo>
                <FaCoins /> Prize Pool: ${tournament.prizePool.toLocaleString()}
              </TournamentInfo>
              <RegisterButton onClick={() => handleRegister(tournament.id)}>
                Register Now
              </RegisterButton>
            </TournamentCard>
          ))}
        </TournamentGrid>
      </TournamentsWrapper>
    </>
  );
};

export default GameTournaments;