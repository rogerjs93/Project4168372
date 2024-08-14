import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUsers, FaComments, FaSearch, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CommunityWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`;

const CommunityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const CommunityTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small};
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.small};
  width: 200px;

  &:focus {
    outline: none;
  }
`;

const ForumsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const ForumItem = styled.li`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.medium};
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const ForumHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.medium};
`;

const ForumName = styled.h3`
  margin: 0;
`;

const ForumContent = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const ForumDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ForumStats = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
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

const Community = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchForums = useCallback(async () => {
    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data (replace with actual API call when available)
      const mockForums = [
        { id: 1, name: "Game Development", description: "Discuss game development techniques and share your projects", threads: 150, posts: 1200 },
        { id: 2, name: "Player Lounge", description: "Chat about your favorite games and connect with other players", threads: 300, posts: 5000 },
        { id: 3, name: "Feedback & Suggestions", description: "Share your ideas to improve the Naama platform", threads: 75, posts: 450 },
        { id: 4, name: "Indie Showcase", description: "Show off your indie game projects and get feedback", threads: 100, posts: 800 },
        { id: 5, name: "Technical Support", description: "Get help with technical issues and troubleshooting", threads: 200, posts: 1500 },
      ];
      setForums(mockForums);

      // Uncomment the following lines when connecting to a real server
      // const response = await axios.get('http://localhost:3001/forums');
      // setForums(response.data);
    } catch (error) {
      console.error('Error fetching forums:', error);
      setError('Failed to load forums. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchForums();
  }, [fetchForums]);

  const filteredForums = forums.filter(forum =>
    forum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    forum.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CommunityWrapper>
      <CommunityHeader>
        <CommunityTitle>
          <FaUsers />
          Community Forums
        </CommunityTitle>
        <SearchBar>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Search forums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </CommunityHeader>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ForumsList>
          {filteredForums.map(forum => (
            <ForumItem key={forum.id}>
              <ForumHeader>
                <ForumName>{forum.name}</ForumName>
              </ForumHeader>
              <ForumContent>
                <ForumDescription>{forum.description}</ForumDescription>
                <ForumStats>
                  <span><FaComments /> {forum.threads} threads</span>
                  <span>{forum.posts} posts</span>
                </ForumStats>
              </ForumContent>
            </ForumItem>
          ))}
        </ForumsList>
      )}
    </CommunityWrapper>
  );
};

export default Community;