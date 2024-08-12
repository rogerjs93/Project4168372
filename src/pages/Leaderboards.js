import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrophy, FaMedal, FaUser } from 'react-icons/fa';

const LeaderboardsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CategorySelector = styled.select`
  margin: ${({ theme }) => theme.spacing.large} 0;
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  border-radius: ${({ theme }) => theme.borderRadius.small};
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
`;

const TableRow = styled.tr`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
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
`;

const Leaderboards = () => {
  const [selectedCategory, setSelectedCategory] = useState('overall');

  const categories = [
    { id: 'overall', name: 'Overall' },
    { id: 'puzzle', name: 'Puzzle Games' },
    { id: 'action', name: 'Action Games' },
    { id: 'strategy', name: 'Strategy Games' },
  ];

  const leaderboardData = [
    { id: 1, rank: 1, name: 'Player1', score: 10000 },
    { id: 2, rank: 2, name: 'Player2', score: 9500 },
    { id: 3, rank: 3, name: 'Player3', score: 9000 },
    { id: 4, rank: 4, name: 'Player4', score: 8500 },
    { id: 5, rank: 5, name: 'Player5', score: 8000 },
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <FaTrophy color="gold" />;
      case 2: return <FaMedal color="silver" />;
      case 3: return <FaMedal color="#CD7F32" />;
      default: return <FaUser />;
    }
  };

  return (
    <LeaderboardsWrapper>
      <Header>
        <FaTrophy />
        Leaderboards
      </Header>
      <CategorySelector
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </CategorySelector>
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
              <TableCell>{player.score}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </LeaderboardTable>
    </LeaderboardsWrapper>
  );
};

export default Leaderboards;