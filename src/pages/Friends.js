import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FaSearch, FaUserFriends, FaUserPlus, FaUserMinus, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

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

const FriendsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const FriendCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const FriendAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: ${({ theme }) => theme.spacing.small};
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
  const { user } = useAuth();

  // Mock friends data
  const mockFriends = [
    { id: 1, name: 'John Doe', avatar: 'https://picsum.photos/id/27/100/100', status: 'Online', isFriend: true },
    { id: 2, name: 'Jane Smith', avatar: 'https://picsum.photos/id/64/100/100', status: 'Offline', isFriend: true },
    { id: 3, name: 'Bob Johnson', avatar: 'https://picsum.photos/id/91/100/100', status: 'Away', isFriend: false },
    { id: 4, name: 'Alice Brown', avatar: 'https://picsum.photos/id/45/100/100', status: 'Online', isFriend: false },
    { id: 5, name: 'Charlie Davis', avatar: 'https://picsum.photos/id/53/100/100', status: 'Busy', isFriend: true },
  ];

  const fetchFriends = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data instead of API call
      setFriends(mockFriends);

      // Uncomment the following lines when connecting to a real server
      // const response = await axios.get(`http://localhost:3001/users/${user.id}/friends`);
      // setFriends(response.data);
    } catch (err) {
      console.error('Error fetching friends:', err);
      setError('Failed to load friends. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);  // Remove user.id from dependencies for mock data

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

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

      // Uncomment the following lines when connecting to a real server
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
  }, []);  // Remove user.id and fetchFriends from dependencies for mock data

  const filteredFriends = useMemo(() => 
    friends.filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [friends, searchTerm]
  );

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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FriendsList>
          {filteredFriends.map(friend => (
            <FriendCard key={friend.id}>
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
          ))}
        </FriendsList>
      )}
    </FriendsWrapper>
  );
};

export default Friends;