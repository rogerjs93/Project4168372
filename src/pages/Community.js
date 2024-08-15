import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUsers, FaComments, FaSearch, FaSpinner, FaExclamationCircle, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import axios from 'axios';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

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
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
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
        { id: 6, name: "Game Design", description: "Share and discuss game design concepts and theories", threads: 180, posts: 2200 },
        { id: 7, name: "Art & Animation", description: "Showcase your game art and discuss animation techniques", threads: 120, posts: 950 },
        { id: 8, name: "Sound & Music", description: "Talk about game audio, share your compositions, and get feedback", threads: 90, posts: 700 },
        { id: 9, name: "Marketing & Promotion", description: "Discuss strategies for marketing and promoting your games", threads: 110, posts: 1300 },
        { id: 10, name: "Game Jams", description: "Organize and participate in game development challenges", threads: 80, posts: 600 },
        { id: 11, name: "VR & AR Gaming", description: "Explore virtual and augmented reality in gaming", threads: 70, posts: 550 },
        { id: 12, name: "Mobile Gaming", description: "Discuss mobile game development and trends", threads: 160, posts: 1800 },
        { id: 13, name: "Modding Community", description: "Share and discuss game mods and modding techniques", threads: 130, posts: 1600 },
        { id: 14, name: "Game Writing", description: "Explore narrative design and game writing techniques", threads: 85, posts: 720 },
        { id: 15, name: "Esports & Competitions", description: "Discuss competitive gaming and organize tournaments", threads: 140, posts: 2500 },
        { id: 16, name: "Game Industry News", description: "Share and discuss the latest news in the game industry", threads: 220, posts: 3000 },
        { id: 17, name: "Retro Gaming", description: "Celebrate classic games and discuss retro gaming", threads: 95, posts: 1100 },
        { id: 18, name: "Game Accessibility", description: "Discuss making games more accessible to all players", threads: 60, posts: 400 },
        { id: 19, name: "Educational Games", description: "Explore the world of educational game development", threads: 75, posts: 580 },
        { id: 20, name: "Game AI", description: "Discuss artificial intelligence in game development", threads: 100, posts: 850 },
        { id: 21, name: "Crowdfunding & Publishing", description: "Share experiences with game crowdfunding and publishing", threads: 65, posts: 520 },
        { id: 22, name: "Game Localization", description: "Discuss techniques for localizing games for different markets", threads: 55, posts: 380 },
        { id: 23, name: "Game Analytics", description: "Explore data analysis and metrics in game development", threads: 70, posts: 600 },
        { id: 24, name: "Cross-Platform Development", description: "Discuss strategies for developing games across multiple platforms", threads: 85, posts: 720 },
        { id: 25, name: "Game Asset Marketplace", description: "Buy, sell, and discuss game development assets", threads: 110, posts: 1400 },
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
      setError('Failed to load forums. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, category, sortBy, sortOrder, page, hasNextPage]);

  useEffect(() => {
    setForums([]);
    setPage(1);
    setHasNextPage(true);
    fetchForums();
  }, [searchTerm, category, sortBy, sortOrder]);

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

  const ForumRow = useMemo(() => ({ index, style }) => {
    const forum = forums[index];
    if (!forum) return null;

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
          <FaUsers />
          Community Forums
        </CommunityTitle>
        <SearchBar>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Search forums..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchBar>
        <FilterDropdown value={category} onChange={handleCategoryChange}>
          <option value="all">All Categories</option>
          <option value="development">Development</option>
          <option value="design">Design</option>
          <option value="audio">Audio</option>
          <option value="business">Business</option>
          <option value="community">Community</option>
        </FilterDropdown>
        <SortButton onClick={handleSortChange}>
          <FaSortAmountDown />
          Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} ({sortOrder.toUpperCase()})
        </SortButton>
      </CommunityHeader>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
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
      {loading && <LoadingSpinner />}
    </CommunityWrapper>
  );
};

export default Community;