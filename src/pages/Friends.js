import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FaSearch, FaUserFriends, FaUserPlus, FaUserMinus, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteScroll from 'react-infinite-scroll-component';

const FriendsWrapper = styled.div`
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

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  &:focus {
    outline: none;
  }
`;

const GridWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 200px); // Adjust based on your layout
`;

const FriendCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const FriendAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto ${({ theme }) => theme.spacing.small};
  object-fit: cover;
`;

const FriendName = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
`;

const FriendStatus = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.medium} 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const FriendAction = styled.button`
  background-color: ${({ theme, isFriend }) => isFriend ? theme.colors.error : theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};

  &:hover {
    background-color: ${({ theme, isFriend }) => isFriend ? theme.colors.errorDark : theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
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

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.medium} auto;
  display: block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  const itemsPerPage = 20; // Number of items to load per page

  // Mock friends data generator
  const generateMockFriends = (start, end) => {
    return Array.from({ length: end - start }, (_, index) => ({
      id: start + index,
      name: `Friend ${start + index}`,
      avatar: `https://picsum.photos/id/${(start + index) % 100}/100/100`,
      status: ['Online', 'Offline', 'Away', 'Busy'][Math.floor(Math.random() * 4)],
      isFriend: Math.random() > 0.5,
    }));
  };

  const fetchFriends = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    setError('');
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data generator instead of static mock data
      const newFriends = generateMockFriends((page - 1) * itemsPerPage, page * itemsPerPage);
      setFriends(prevFriends => [...prevFriends, ...newFriends]);
      setHasMore(newFriends.length === itemsPerPage);
      setPage(prevPage => prevPage + 1);

      // TODO: Remove mock data and uncomment the following lines when connecting to a real server
      // const response = await axios.get(`http://localhost:3001/users/${user.id}/friends?_page=${page}&_limit=${itemsPerPage}`);
      // setFriends(prevFriends => [...prevFriends, ...response.data]);
      // setHasMore(response.data.length === itemsPerPage);
      // setPage(prevPage => prevPage + 1);
    } catch (err) {
      console.error('Error fetching friends:', err);
      setError('Failed to load friends. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleFriendAction = useCallback(async (friendId, action) => {
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update local state to reflect the change
      setFriends(prevFriends => 
        prevFriends.map(friend => 
          friend.id === friendId 
            ? { ...friend, isFriend: action === 'add' }
            : friend
        )
      );

      // TODO: Remove mock data and uncomment the following lines when connecting to a real server
      // if (action === 'add') {
      //   await axios.post(`http://localhost:3001/users/${user.id}/friends`, { friendId });
      // } else if (action === 'remove') {
      //   await axios.delete(`http://localhost:3001/users/${user.id}/friends/${friendId}`);
      // }
      // fetchFriends();
    } catch (err) {
      console.error(`Error ${action === 'add' ? 'adding' : 'removing'} friend:`, err);
      setError(`Failed to ${action === 'add' ? 'add' : 'remove'} friend. Please try again.`);
    }
  }, []);

  const filteredFriends = useMemo(() => 
    friends.filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [friends, searchTerm]
  );

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 4 + columnIndex;
    if (index >= filteredFriends.length) return null;
    const friend = filteredFriends[index];

    return (
      <div style={style}>
        <FriendCard>
          <FriendAvatar src={friend.avatar} alt={friend.name} />
          <FriendName>{friend.name}</FriendName>
          <FriendStatus>{friend.status}</FriendStatus>
          <FriendAction
            onClick={() => handleFriendAction(friend.id, friend.isFriend ? 'remove' : 'add')}
            isFriend={friend.isFriend}
            aria-label={friend.isFriend ? 'Remove friend' : 'Add friend'}
          >
            {friend.isFriend ? (
              <>
                <FaUserMinus /> Remove Friend
              </>
            ) : (
              <>
                <FaUserPlus /> Add Friend
              </>
            )}
          </FriendAction>
        </FriendCard>
      </div>
    );
  };

  return (
    <FriendsWrapper>
      <Header>
        <FaUserFriends />
        Friends
      </Header>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <SearchBar>
        <FaSearch />
        <SearchInput
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search friends"
        />
      </SearchBar>
      <InfiniteScroll
        dataLength={filteredFriends.length}
        next={fetchFriends}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        scrollableTarget="friendsGrid"
      >
        <GridWrapper id="friendsGrid">
          <Grid
            columnCount={4}
            columnWidth={250}
            height={window.innerHeight - 200} // Adjust based on your layout
            rowCount={Math.ceil(filteredFriends.length / 4)}
            rowHeight={350} // Adjust based on your card height
            width={1000} // Adjust based on your layout
          >
            {Cell}
          </Grid>
        </GridWrapper>
      </InfiniteScroll>
    </FriendsWrapper>
  );
};

export default Friends;