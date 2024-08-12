import React from 'react';
import styled from 'styled-components';
import { FaHistory, FaHeart, FaComment } from 'react-icons/fa';

const MemoriesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const MemoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

const MemoryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const MemoryDate = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const MemoryContent = styled.p`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const MemoryImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const MemoryActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Memories = () => {
  // Mock memories data
  const memories = [
    { id: 1, date: '1 year ago', content: 'Remember this amazing trip?', image: 'https://picsum.photos/id/103/600/400', likes: 42, comments: 8 },
    { id: 2, date: '2 years ago', content: 'Throwback to this incredible concert!', image: 'https://picsum.photos/id/117/600/400', likes: 87, comments: 15 },
    { id: 3, date: '3 years ago', content: 'My first day at the new job. Time flies!', image: 'https://picsum.photos/id/155/600/400', likes: 63, comments: 12 },
  ];

  return (
    <MemoriesWrapper>
      <Header>
        <FaHistory />
        Memories
      </Header>
      <MemoryList>
        {memories.map(memory => (
          <MemoryCard key={memory.id}>
            <MemoryDate>{memory.date}</MemoryDate>
            <MemoryContent>{memory.content}</MemoryContent>
            <MemoryImage src={memory.image} alt={`Memory from ${memory.date}`} />
            <MemoryActions>
              <ActionButton>
                <FaHeart /> {memory.likes} Likes
              </ActionButton>
              <ActionButton>
                <FaComment /> {memory.comments} Comments
              </ActionButton>
            </MemoryActions>
          </MemoryCard>
        ))}
      </MemoryList>
    </MemoriesWrapper>
  );
};

export default Memories;