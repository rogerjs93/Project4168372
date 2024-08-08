import React from 'react';
import styled from 'styled-components';

const CommunityWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const CommunityTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ForumsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ForumItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

export const Community = () => {
  const mockForums = [
    { id: 1, name: "Game Development", description: "Discuss game development techniques and share your projects" },
    { id: 2, name: "Player Lounge", description: "Chat about your favorite games and connect with other players" },
    { id: 3, name: "Feedback & Suggestions", description: "Share your ideas to improve the Naama platform" },
  ];

  return (
    <CommunityWrapper>
      <CommunityTitle>Community</CommunityTitle>
      <ForumsList>
        {mockForums.map(forum => (
          <ForumItem key={forum.id}>
            <h3>{forum.name}</h3>
            <p>{forum.description}</p>
          </ForumItem>
        ))}
      </ForumsList>
    </CommunityWrapper>
  );
};