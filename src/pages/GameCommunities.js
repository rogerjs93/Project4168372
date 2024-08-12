import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaUserPlus, FaGamepad } from 'react-icons/fa';

const CommunitiesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const CommunityCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const CommunityTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CommunityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const JoinButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
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

const GameCommunities = () => {
  const communities = [
    { id: 1, name: 'RPG Enthusiasts', members: 5000, game: 'Various RPGs' },
    { id: 2, name: 'FPS Pros', members: 7500, game: 'First-Person Shooters' },
    { id: 3, name: 'Strategy Masterminds', members: 3000, game: 'Strategy Games' },
    { id: 4, name: 'Indie Game Lovers', members: 2000, game: 'Indie Games' },
  ];

  return (
    <CommunitiesWrapper>
      <Header>
        <FaUsers />
        Game Communities
      </Header>
      <CommunityGrid>
        {communities.map((community) => (
          <CommunityCard key={community.id}>
            <CommunityTitle>{community.name}</CommunityTitle>
            <CommunityInfo>
              <FaUsers /> {community.members} members
            </CommunityInfo>
            <CommunityInfo>
              <FaGamepad /> {community.game}
            </CommunityInfo>
            <JoinButton>
              <FaUserPlus /> Join Community
            </JoinButton>
          </CommunityCard>
        ))}
      </CommunityGrid>
    </CommunitiesWrapper>
  );
};

export default GameCommunities;