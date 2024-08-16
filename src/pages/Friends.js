import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaSearch, FaUserFriends, FaUserPlus, FaUserMinus } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const FriendsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  margin-bottom: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: #1c1e21;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const FriendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const FriendCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const FriendAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 12px;
  object-fit: cover;
`;

const FriendName = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 4px 0;
  font-size: 17px;
  font-weight: 600;
`;

const FriendStatus = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 12px 0;
  font-size: 13px;
`;

const FriendAction = styled.button`
  background-color: ${({ isFriend }) => isFriend ? '#e4e6eb' : '#1877f2'};
  color: ${({ isFriend }) => isFriend ? '#050505' : '#ffffff'};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;

  &:hover {
    background-color: ${({ isFriend }) => isFriend ? '#d8dadf' : '#166fe5'};
  }
`;

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const generateMockFriends = useCallback(() => {
    return Array.from({ length: 30 }, (_, index) => ({
      id: index + 1,
      name: `Friend ${index + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${(index + 1) % 70}`,
      status: ['Online', 'Offline', 'Away', 'Busy'][Math.floor(Math.random() * 4)],
      isFriend: Math.random() > 0.5,
    }));
  }, []);

  useEffect(() => {
    setFriends(generateMockFriends());
  }, [generateMockFriends]);

  const handleFriendAction = useCallback((friendId) => {
    setFriends(prevFriends => 
      prevFriends.map(friend => 
        friend.id === friendId 
          ? { ...friend, isFriend: !friend.isFriend }
          : friend
      )
    );
  }, []);

  const filteredFriends = useMemo(() => 
    friends.filter(friend =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [friends, searchTerm]
  );

  return (
    <>
      <GlobalStyle />
      <FriendsWrapper>
        <Header>
          <FaUserFriends />
          Friends
        </Header>
        <SearchBar>
          <FaSearch color="#65676b" />
          <SearchInput
            type="text"
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <FriendsGrid>
          {filteredFriends.map(friend => (
            <FriendCard key={friend.id}>
              <FriendAvatar src={friend.avatar} alt={friend.name} />
              <FriendName>{friend.name}</FriendName>
              <FriendStatus>{friend.status}</FriendStatus>
              <FriendAction
                onClick={() => handleFriendAction(friend.id)}
                isFriend={friend.isFriend}
              >
                {friend.isFriend ? (
                  <>
                    <FaUserMinus /> Unfriend
                  </>
                ) : (
                  <>
                    <FaUserPlus /> Add Friend
                  </>
                )}
              </FriendAction>
            </FriendCard>
          ))}
        </FriendsGrid>
      </FriendsWrapper>
    </>
  );
};

export default Friends;