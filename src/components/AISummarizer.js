import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SummarizerWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SummaryBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const SummaryTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SummaryText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;

const AISummarizer = () => {
  const [feed, setFeed] = useState([]);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      // Replace this with your actual API endpoint
      const response = await axios.get('http://localhost:3001/posts');
      setFeed(response.data);
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };

  const generateSummary = () => {
    setIsLoading(true);
    // Combine all post contents into a single string
    const allContent = feed.map(post => post.content).join(' ');
    
    // Simulate AI processing (replace this with actual AI API call)
    setTimeout(() => {
      const words = allContent.split(' ');
      const summaryWords = words.slice(0, 50); // Take first 50 words as a "summary"
      const simulatedSummary = "Here's a summary of your social feed: " + summaryWords.join(' ') + (words.length > 50 ? '...' : '');
      setSummary(simulatedSummary);
      setIsLoading(false);
    }, 2000); // Simulate 2 seconds of processing time
  };

  return (
    <SummarizerWrapper>
      <Title>AI Feed Summarizer</Title>
      <Button onClick={generateSummary} disabled={isLoading}>
        {isLoading ? 'Generating Summary...' : 'Summarize My Feed'}
      </Button>
      {isLoading && <LoadingText>Processing your feed...</LoadingText>}
      {summary && !isLoading && (
        <SummaryBox>
          <SummaryTitle>Your Feed Summary</SummaryTitle>
          <SummaryText>{summary}</SummaryText>
        </SummaryBox>
      )}
    </SummarizerWrapper>
  );
};

export default AISummarizer;