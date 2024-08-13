import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FaUsers, FaPlus, FaSearch, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const GroupsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const CreateGroupButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
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
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  &:focus {
    outline: none;
  }
`;

const GroupsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const GroupCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const GroupImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const GroupName = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
`;

const GroupDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin: 0 0 ${({ theme }) => theme.spacing.medium} 0;
`;

const GroupMemberCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const JoinGroupButton = styled.button`
  width: 100%;
  background-color: ${({ theme, isMember }) => isMember ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: ${({ theme }) => theme.spacing.small};

  &:hover {
    background-color: ${({ theme, isMember }) => isMember ? theme.colors.secondaryDark : theme.colors.primaryDark};
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

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  // Mock groups data
  const mockGroups = [
    { id: 1, name: 'The Strategists', image: 'https://picsum.photos/id/201/300/150', description: 'A group for gamers to discuss their favorite strategy games.', memberCount: 150, isMember: false },
    { id: 2, name: 'Book Club', image: 'https://picsum.photos/id/403/300/150', description: 'Monthly book discussions and recommendations.', memberCount: 75, isMember: true },
    { id: 3, name: 'Fitness Motivation', image: 'https://picsum.photos/id/390/300/150', description: 'Share your fitness journey and motivate others.', memberCount: 200, isMember: false },
    { id: 4, name: 'Tech Innovators', image: 'https://picsum.photos/id/180/300/150', description: 'Discussing the latest in technology and innovation.', memberCount: 120, isMember: true },
    { id: 5, name: 'Cooking Enthusiasts', image: 'https://picsum.photos/id/292/300/150', description: 'Share recipes and cooking tips with fellow food lovers.', memberCount: 180, isMember: false },
  ];

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data instead of API call
      setGroups(mockGroups);

      // Uncomment the following lines when connecting to a real server
      // const response = await axios.get('http://localhost:3001/groups');
      // setGroups(response.data);
    } catch (err) {
      console.error('Error fetching groups:', err);
      setError('Failed to load groups. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleCreateGroup = useCallback(() => {
    // Implement group creation logic here
    console.log('Create new group');
  }, []);

  const handleJoinGroup = useCallback(async (groupId, isMember) => {
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update local state to reflect the change
      setGroups(prevGroups => 
        prevGroups.map(group => 
          group.id === groupId
            ? { 
                ...group, 
                isMember: !isMember, 
                memberCount: isMember ? group.memberCount - 1 : group.memberCount + 1 
              }
            : group
        )
      );

      // Uncomment the following lines when connecting to a real server
      // if (isMember) {
      //   await axios.delete(`http://localhost:3001/groups/${groupId}/members/${user.id}`);
      // } else {
      //   await axios.post(`http://localhost:3001/groups/${groupId}/members`, { userId: user.id });
      // }
      // fetchGroups();
    } catch (err) {
      console.error('Error updating group membership:', err);
      setError(`Failed to ${isMember ? 'leave' : 'join'} group. Please try again.`);
    }
  }, []);

  const filteredGroups = useMemo(() => 
    groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [groups, searchTerm]
  );

  return (
    <GroupsWrapper>
      <Header>
        <FaUsers />
        Groups
      </Header>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <ActionsBar>
        <CreateGroupButton onClick={handleCreateGroup}>
          <FaPlus /> Create New Group
        </CreateGroupButton>
        <SearchBar>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search groups"
          />
        </SearchBar>
      </ActionsBar>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <GroupsList>
          {filteredGroups.map(group => (
            <GroupCard key={group.id}>
              <GroupImage src={group.image} alt={group.name} />
              <GroupName>{group.name}</GroupName>
              <GroupDescription>{group.description}</GroupDescription>
              <GroupMemberCount>{group.memberCount} members</GroupMemberCount>
              <JoinGroupButton
                onClick={() => handleJoinGroup(group.id, group.isMember)}
                isMember={group.isMember}
              >
                {group.isMember ? 'Leave Group' : 'Join Group'}
              </JoinGroupButton>
            </GroupCard>
          ))}
        </GroupsList>
      )}
    </GroupsWrapper>
  );
};

export default Groups;