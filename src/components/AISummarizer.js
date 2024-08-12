import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaSpinner, FaRobot } from 'react-icons/fa';

const SummarizerWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
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
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const SummaryBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const SummaryTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SummaryText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const AISummarizer = () => {
  const [feed, setFeed] = useState([]);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setFeed(response.data);
    } catch (error) {
      console.error('Error fetching feed:', error);
      setError('Failed to fetch feed. Please try again later.');
    }
  };

  const generateSummary = () => {
    setIsLoading(true);
    setError('');
    const allContent = feed.map(post => post.content).join(' ');
    
    // Simulate AI processing
    setTimeout(() => {
      try {
        const words = allContent.split(' ');
        const summaryWords = words
          .filter((_, index) => index % 3 === 0)
          .slice(0, 50);
        const simulatedSummary = "Based on your social feed, here's a summary of key topics and trends: " + summaryWords.join(' ') + (words.length > 150 ? '...' : '');
        setSummary(simulatedSummary);
      } catch (error) {
        setError('An error occurred while generating the summary. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <SummarizerWrapper>
      <Title><FaRobot /> AI Feed Summarizer</Title>
      <Button onClick={generateSummary} disabled={isLoading}>
        {isLoading ? <FaSpinner /> : 'Summarize My Feed'}
      </Button>
      {isLoading && <LoadingText><FaSpinner /> Processing your feed...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
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