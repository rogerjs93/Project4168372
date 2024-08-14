import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FaSpinner, FaRobot, FaSyncAlt, FaCopy, FaCheck } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SummarizerWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  animation: ${fadeIn} 0.3s ease-out;
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
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
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
  animation: ${fadeIn} 0.3s ease-out;
`;

const SummaryTitle = styled.h2`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.errorLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AISummarizer = () => {
  const [feed, setFeed] = useState([]);
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const fetchFeed = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setFeed(response.data);
    } catch (error) {
      console.error('Error fetching feed:', error);
      setError('Failed to fetch feed. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  const generateSummary = useCallback(() => {
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
  }, [feed]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [summary]);

  return (
    <SummarizerWrapper>
      <Title><FaRobot /> AI Feed Summarizer</Title>
      <Button onClick={generateSummary} disabled={isLoading}>
        {isLoading ? <SpinnerIcon /> : <FaSyncAlt />} Summarize My Feed
      </Button>
      {isLoading && <LoadingText><SpinnerIcon /> Processing your feed...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
      {summary && !isLoading && (
        <SummaryBox>
          <SummaryTitle>
            Your Feed Summary
            <IconButton onClick={handleCopy} title="Copy summary">
              {copied ? <FaCheck /> : <FaCopy />}
            </IconButton>
          </SummaryTitle>
          <SummaryText>{summary}</SummaryText>
        </SummaryBox>
      )}
    </SummarizerWrapper>
  );
};

export default AISummarizer;