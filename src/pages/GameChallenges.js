import React from 'react';
import styled from 'styled-components';
import { FaTrophy, FaClock, FaMedal } from 'react-icons/fa';

const GameChallengesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ChallengeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const ChallengeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const ChallengeTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ChallengeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const ChallengeMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const JoinButton = styled.button`
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

const GameChallenges = () => {
  const challenges = [
    { id: 1, title: 'Speed Run Challenge', game: 'Adventure Quest', timeLeft: '2 days', reward: '1000 coins' },
    { id: 2, title: 'High Score Challenge', game: 'Puzzle Mania', timeLeft: '1 week', reward: 'Exclusive Avatar' },
    { id: 3, title: 'Multiplayer Tournament', game: 'Strategy Master', timeLeft: '3 days', reward: 'Champion Trophy' },
  ];

  return (
    <GameChallengesWrapper>
      <Header>
        <FaTrophy />
        Game Challenges
      </Header>
      <ChallengeList>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id}>
            <ChallengeTitle>{challenge.title}</ChallengeTitle>
            <p>Game: {challenge.game}</p>
            <ChallengeInfo>
              <ChallengeMetadata>
                <FaClock /> {challenge.timeLeft} left
              </ChallengeMetadata>
              <ChallengeMetadata>
                <FaMedal /> Reward: {challenge.reward}
              </ChallengeMetadata>
              <JoinButton>Join Challenge</JoinButton>
            </ChallengeInfo>
          </ChallengeCard>
        ))}
      </ChallengeList>
    </GameChallengesWrapper>
  );
};

export default GameChallenges;