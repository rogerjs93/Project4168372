import React from 'react';
import styled from 'styled-components';
import { FaBookmark, FaExternalLinkAlt } from 'react-icons/fa';

const SavedWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SavedList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const SavedItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const SavedItemImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const SavedItemTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
`;

const SavedItemDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SavedItemLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Saved = () => {
  // Mock saved items data
  const savedItems = [
    { id: 1, title: 'Top 10 Travel Destinations', image: 'https://picsum.photos/id/401/300/180', description: 'Explore the most beautiful places on Earth.', link: '#' },
    { id: 2, title: 'How to Start a Successful Blog', image: 'https://picsum.photos/id/445/300/180', description: 'Tips and tricks for aspiring bloggers.', link: '#' },
    { id: 3, title: 'Healthy Recipes for Busy Professionals', image: 'https://picsum.photos/id/493/300/180', description: 'Quick and nutritious meals for your workweek.', link: '#' },
  ];

  return (
    <SavedWrapper>
      <Header>
        <FaBookmark />
        Saved Items
      </Header>
      <SavedList>
        {savedItems.map(item => (
          <SavedItem key={item.id}>
            <SavedItemImage src={item.image} alt={item.title} />
            <SavedItemTitle>{item.title}</SavedItemTitle>
            <SavedItemDescription>{item.description}</SavedItemDescription>
            <SavedItemLink href={item.link}>
              Read More <FaExternalLinkAlt />
            </SavedItemLink>
          </SavedItem>
        ))}
      </SavedList>
    </SavedWrapper>
  );
};

export default Saved;