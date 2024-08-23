import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUsers, FaComments, FaSearch, FaSpinner, FaExclamationCircle, FaFilter, FaSortAmountDown, FaRedoAlt } from 'react-icons/fa';
import axios from 'axios';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useToast } from '../hooks/useToast';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CommunityWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;

const CommunityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
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

const FilterDropdown = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ForumsList = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const ForumItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.medium};
  animation: ${fadeIn} 0.3s ease-out;
  margin-bottom: ${({ theme }) => theme.spacing.medium};

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
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SkeletonForumItem = styled(ForumItem)`
  height: 150px;
`;

const SkeletonLine = styled.div`
  height: ${props => props.height || '16px'};
  width: ${props => props.width || '100%'};
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const Community = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const addToast = useToast();

  const ITEMS_PER_PAGE = 20;

  const fetchForums = useCallback(async () => {
    if (!hasNextPage) return;

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
        // ... (add more mock forums as needed)
      ];

      const filteredForums = mockForums
        .filter(forum => 
          (category === 'all' || forum.category === category) &&
          (forum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           forum.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
          if (sortBy === 'name') {
            return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
          } else if (sortBy === 'threads') {
            return sortOrder === 'asc' ? a.threads - b.threads : b.threads - a.threads;
          } else if (sortBy === 'posts') {
            return sortOrder === 'asc' ? a.posts - b.posts : b.posts - a.posts;
          }
          return 0;
        });

      const paginatedForums = filteredForums.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
      setForums(prevForums => [...prevForums, ...paginatedForums]);
      setHasNextPage(paginatedForums.length === ITEMS_PER_PAGE);
      setPage(prevPage => prevPage + 1);

      // Uncomment the following lines when connecting to a real server
      // const response = await axios.get('http://localhost:3001/forums', {
      //   params: { _page: page, _limit: ITEMS_PER_PAGE, q: searchTerm, category, _sort: sortBy, _order: sortOrder }
      // });
      // setForums(prevForums => [...prevForums, ...response.data]);
      // setHasNextPage(response.data.length === ITEMS_PER_PAGE);
      // setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching forums:', error);
      setError('Failed to load forums. Please check your internet connection and try again.');
      addToast('error', 'Failed to load forums. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, category, sortBy, sortOrder, page, hasNextPage, addToast]);

  useEffect(() => {
    setForums([]);
    setPage(1);
    setHasNextPage(true);
    fetchForums();
  }, [searchTerm, category, sortBy, sortOrder, fetchForums]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSortChange = () => {
    if (sortBy === 'name') {
      setSortBy('threads');
    } else if (sortBy === 'threads') {
      setSortBy('posts');
    } else {
      setSortBy('name');
    }
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const renderSkeletonForumItem = () => (
    <SkeletonForumItem>
      <SkeletonLine height="24px" width="60%" />
      <SkeletonLine height="16px" width="100%" />
      <SkeletonLine height="16px" width="80%" />
      <SkeletonLine height="16px" width="40%" />
    </SkeletonForumItem>
  );

  const ForumRow = useMemo(() => ({ index, style }) => {
    const forum = forums[index];
    if (!forum) return <div style={style}>{renderSkeletonForumItem()}</div>;

    return (
      <ForumItem style={style}>
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
    );
  }, [forums]);

  const itemCount = hasNextPage ? forums.length + 1 : forums.length;
  const loadMoreItems = loading ? () => {} : fetchForums;
  const isItemLoaded = index => !hasNextPage || index < forums.length;

  return (
    <CommunityWrapper>
      <CommunityHeader>
        <CommunityTitle>
          <FaUsers aria-hidden="true" />
          Community Forums
        </CommunityTitle>
        <SearchBar>
          <FaSearch aria-hidden="true" />
          <SearchInput
            type="text"
            placeholder="Search forums..."
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search forums"
          />
        </SearchBar>
        <FilterDropdown value={category} onChange={handleCategoryChange} aria-label="Filter by category">
          <option value="all">All Categories</option>
          <option value="development">Development</option>
          <option value="design">Design</option>
          <option value="audio">Audio</option>
          <option value="business">Business</option>
          <option value="community">Community</option>
        </FilterDropdown>
        <SortButton onClick={handleSortChange} aria-label={`Sort by ${sortBy} in ${sortOrder}ending order`}>
          <FaSortAmountDown aria-hidden="true" />
          Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} ({sortOrder.toUpperCase()})
        </SortButton>
      </CommunityHeader>
      {error ? (
        <ErrorMessage role="alert">
          <FaExclamationCircle aria-hidden="true" /> {error}
          <RetryButton onClick={() => { setPage(1); setHasNextPage(true); fetchForums(); }} aria-label="Retry loading forums">
            <FaRedoAlt aria-hidden="true" /> Retry
          </RetryButton>
        </ErrorMessage>
      ) : (
        <ForumsList>
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={itemCount}
                loadMoreItems={loadMoreItems}
              >
                {({ onItemsRendered, ref }) => (
                  <List
                    height={height}
                    itemCount={itemCount}
                    itemSize={150}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    width={width}
                  >
                    {ForumRow}
                  </List>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        </ForumsList>
      )}
      {loading && forums.length === 0 && (
        <div aria-live="polite" aria-busy="true">
          <LoadingSpinner />
          <p>Loading forums...</p>
        </div>
      )}
    </CommunityWrapper>
  );
};

export default Community;