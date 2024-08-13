import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';

const TrendingTopics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const TopicTag = styled.span`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.tiny} ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const TrendingTopicsCard = () => {
  const trendingTopics = ['#GameDev', '#Multiplayer', '#Indie', '#PixelArt'];

  return (
    <Card title="Trending Topics">
      <TrendingTopics>
        {trendingTopics.map((topic, index) => (
          <TopicTag key={index}>{topic}</TopicTag>
        ))}
      </TrendingTopics>
    </Card>
  );
};

export default TrendingTopicsCard;