import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaBookmark, FaExternalLinkAlt, FaTrash, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SavedWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SavedList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SavedItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: ${({ theme }) => theme.transitions.medium};
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
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
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const SavedItemDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SavedItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SavedItemLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.small};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.errorDark};
  }
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.large} auto;
  display: block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.errorLight};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const LoadMoreButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  margin-top: ${({ theme }) => theme.spacing.large};
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock saved items data
  const mockSavedItems = [
    { id: 1, title: 'Top 10 Travel Destinations', image: 'https://picsum.photos/id/401/300/180', description: 'Explore the most beautiful places on Earth.', link: '#' },
    { id: 2, title: 'How to Start a Successful Blog', image: 'https://picsum.photos/id/445/300/180', description: 'Tips and tricks for aspiring bloggers.', link: '#' },
    { id: 3, title: 'Healthy Recipes for Busy Professionals', image: 'https://picsum.photos/id/493/300/180', description: 'Quick and nutritious meals for your workweek.', link: '#' },
    { id: 4, title: 'The Future of Artificial Intelligence', image: 'https://picsum.photos/id/503/300/180', description: 'Exploring the potential impacts of AI on society.', link: '#' },
    { id: 5, title: 'Mastering the Art of Photography', image: 'https://picsum.photos/id/252/300/180', description: 'Expert tips to take your photography skills to the next level.', link: '#' },
  ];

  const fetchSavedItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulated API call using mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const newItems = mockSavedItems.slice((page - 1) * 3, page * 3);
      setSavedItems(prevItems => [...prevItems, ...newItems]);
      setHasMore(newItems.length === 3);

      // Uncomment the following block when connecting to a real server
      /*
      const response = await axios.get(`http://localhost:3001/saved-items?_page=${page}&_limit=3`);
      const newItems = response.data;
      setSavedItems(prevItems => [...prevItems, ...newItems]);
      setHasMore(newItems.length === 3);
      */

      setLoading(false);
    } catch (err) {
      console.error('Error fetching saved items:', err);
      setError('Failed to load saved items. Please try again later.');
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchSavedItems();
  }, [fetchSavedItems]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleRemove = useCallback(async (id) => {
    try {
      // Simulated API call for removing an item
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      setSavedItems(prevItems => prevItems.filter(item => item.id !== id));

      // Uncomment the following block when connecting to a real server
      /*
      await axios.delete(`http://localhost:3001/saved-items/${id}`);
      setSavedItems(prevItems => prevItems.filter(item => item.id !== id));
      */
    } catch (err) {
      console.error('Error removing saved item:', err);
      setError('Failed to remove item. Please try again.');
    }
  }, []);

  return (
    <SavedWrapper>
      <Header>
        <FaBookmark />
        Saved Items
      </Header>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <SavedList>
        {savedItems.map(item => (
          <SavedItem key={item.id}>
            <SavedItemImage src={item.image} alt={item.title} loading="lazy" />
            <SavedItemTitle>{item.title}</SavedItemTitle>
            <SavedItemDescription>{item.description}</SavedItemDescription>
            <SavedItemActions>
              <SavedItemLink href={item.link} target="_blank" rel="noopener noreferrer">
                Read More <FaExternalLinkAlt />
              </SavedItemLink>
              <RemoveButton onClick={() => handleRemove(item.id)} aria-label="Remove saved item">
                <FaTrash />
              </RemoveButton>
            </SavedItemActions>
          </SavedItem>
        ))}
      </SavedList>
      {loading && <LoadingSpinner />}
      {!loading && hasMore && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
          Load More
        </LoadMoreButton>
      )}
    </SavedWrapper>
  );
};

export default Saved;