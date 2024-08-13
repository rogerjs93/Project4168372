import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHistory, FaHeart, FaComment, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MemoriesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
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
  transition: ${({ theme }) => theme.transitions.medium};
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
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
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
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
  align-self: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const Memories = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock memories data (for demonstration purposes)
  const mockMemories = [
    { id: 1, date: '1 year ago', content: 'Remember this amazing trip?', image: 'https://picsum.photos/id/103/600/400', likes: 42, comments: 8 },
    { id: 2, date: '2 years ago', content: 'Throwback to this incredible concert!', image: 'https://picsum.photos/id/117/600/400', likes: 87, comments: 15 },
    { id: 3, date: '3 years ago', content: 'My first day at the new job. Time flies!', image: 'https://picsum.photos/id/155/600/400', likes: 63, comments: 12 },
  ];

  const fetchMemories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulated API call using mock data
      // Remove this block when connecting to a real server
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const newMemories = mockMemories.slice((page - 1) * 2, page * 2);
      setMemories(prevMemories => [...prevMemories, ...newMemories]);
      setHasMore(newMemories.length === 2);
      setLoading(false);
      return;

      // Uncomment the following block when connecting to a real server
      /*
      const response = await axios.get(`http://localhost:3001/memories?_page=${page}&_limit=5`);
      const newMemories = response.data;
      setMemories(prevMemories => [...prevMemories, ...newMemories]);
      setHasMore(newMemories.length === 5);
      setLoading(false);
      */
    } catch (err) {
      console.error('Error fetching memories:', err);
      setError('Failed to load memories. Please try again later.');
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleLike = useCallback(async (id) => {
    try {
      const memory = memories.find(m => m.id === id);
      const updatedMemory = { ...memory, likes: memory.likes + 1 };
      
      // Simulated API call for updating likes
      // Remove this block when connecting to a real server
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      setMemories(prevMemories => prevMemories.map(m => m.id === id ? updatedMemory : m));

      // Uncomment the following block when connecting to a real server
      /*
      await axios.put(`http://localhost:3001/memories/${id}`, updatedMemory);
      setMemories(prevMemories => prevMemories.map(m => m.id === id ? updatedMemory : m));
      */
    } catch (err) {
      console.error('Error liking memory:', err);
    }
  }, [memories]);

  return (
    <MemoriesWrapper>
      <Header>
        <FaHistory />
        Memories
      </Header>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <MemoryList>
        {memories.map(memory => (
          <MemoryCard key={memory.id}>
            <MemoryDate>{memory.date}</MemoryDate>
            <MemoryContent>{memory.content}</MemoryContent>
            <MemoryImage src={memory.image} alt={`Memory from ${memory.date}`} loading="lazy" />
            <MemoryActions>
              <ActionButton onClick={() => handleLike(memory.id)}>
                <FaHeart /> {memory.likes} Likes
              </ActionButton>
              <ActionButton>
                <FaComment /> {memory.comments} Comments
              </ActionButton>
            </MemoryActions>
          </MemoryCard>
        ))}
      </MemoryList>
      {loading && <LoadingSpinner />}
      {!loading && hasMore && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
          Load More Memories
        </LoadMoreButton>
      )}
    </MemoriesWrapper>
  );
};

export default Memories;