import React from 'react';
import styled from 'styled-components';
import { FaTrophy, FaCalendarAlt, FaUsers, FaCoins } from 'react-icons/fa';

const TournamentsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const TournamentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const TournamentCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const TournamentTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const TournamentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const RegisterButton = styled.button`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const GameTournaments = () => {
  const tournaments = [
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
  ];

  return (
    <TournamentsWrapper>
      <Header>
        <FaTrophy />
        Game Tournaments
      </Header>
      <TournamentList>
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.id}>
            <TournamentTitle>{tournament.title}</TournamentTitle>
            <p>Game: {tournament.game}</p>
            <TournamentInfo>
              <InfoItem>
                <FaCalendarAlt /> {tournament.date}
              </InfoItem>
              <InfoItem>
                <FaUsers /> {tournament.participants} participants
              </InfoItem>
              <InfoItem>
                <FaCoins /> Prize Pool: ${tournament.prizePool}
              </InfoItem>
            </TournamentInfo>
            <RegisterButton>Register Now</RegisterButton>
          </TournamentCard>
        ))}
      </TournamentList>
    </TournamentsWrapper>
  );
};

export default GameTournaments;