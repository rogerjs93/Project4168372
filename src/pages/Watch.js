import React from 'react';
import styled from 'styled-components';
import { FaPlayCircle, FaTwitch, FaYoutube, FaSteam, FaFacebookSquare } from 'react-icons/fa';

const WatchWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const PlatformGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const PlatformCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const PlatformIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const PlatformName = styled.h3`
  margin: 0;
  text-align: center;
`;

const Watch = () => {
  const platforms = [
    { name: 'Twitch', icon: <FaTwitch />, url: 'https://www.twitch.tv/' },
    { name: 'YouTube Gaming', icon: <FaYoutube />, url: 'https://www.youtube.com/gaming' },
    { name: 'Steam', icon: <FaSteam />, url: 'https://store.steampowered.com/' },
    { name: 'Facebook Gaming', icon: <FaFacebookSquare />, url: 'https://www.facebook.com/gaming/' },
  ];

  return (
    <WatchWrapper>
      <Header>
        <FaPlayCircle />
        Watch Gaming Platforms
      </Header>
      <PlatformGrid>
        {platforms.map((platform) => (
          <PlatformCard key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer">
            <PlatformIcon>{platform.icon}</PlatformIcon>
            <PlatformName>{platform.name}</PlatformName>
          </PlatformCard>
        ))}
      </PlatformGrid>
    </WatchWrapper>
  );
};

export default Watch;