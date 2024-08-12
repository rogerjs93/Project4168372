import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaUserFriends } from 'react-icons/fa';

const FriendsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const FriendCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const FriendAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const FriendName = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock friends data
  const friends = [
    { id: 1, name: 'John Doe', avatar: 'https://picsum.photos/id/27/100/100' },
    { id: 2, name: 'Jane Smith', avatar: 'https://picsum.photos/id/64/100/100' },
    { id: 3, name: 'Bob Johnson', avatar: 'https://picsum.photos/id/91/100/100' },
    // Add more friends as needed
  ];

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FriendsWrapper>
      <Header>
        <FaUserFriends />
        Friends
      </Header>
      <SearchBar>
        <FaSearch />
        <SearchInput
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      <FriendsList>
        {filteredFriends.map(friend => (
          <FriendCard key={friend.id}>
            <FriendAvatar src={friend.avatar} alt={friend.name} />
            <FriendName>{friend.name}</FriendName>
          </FriendCard>
        ))}
      </FriendsList>
    </FriendsWrapper>
  );
};

export default Friends;