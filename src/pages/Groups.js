import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaSearch, FaUsers, FaPlus, FaUserPlus, FaUserMinus } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const GroupsWrapper = styled.div`
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

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CreateGroupButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #166fe5;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
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

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const GroupCard = styled.div`
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

const GroupImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const GroupName = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 4px 0;
  font-size: 17px;
  font-weight: 600;
`;

const GroupDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 12px 0;
  font-size: 13px;
`;

const GroupMemberCount = styled.span`
  font-size: 13px;
  color: #65676b;
  display: block;
  margin-bottom: 12px;
`;

const JoinGroupButton = styled.button`
  background-color: ${({ isMember }) => isMember ? '#e4e6eb' : '#1877f2'};
  color: ${({ isMember }) => isMember ? '#050505' : '#ffffff'};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;

  &:hover {
    background-color: ${({ isMember }) => isMember ? '#d8dadf' : '#166fe5'};
  }
`;

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const generateMockGroups = useCallback(() => {
    return [
      { id: 1, name: 'The Strategists', image: 'https://picsum.photos/id/201/300/150', description: 'A group for gamers to discuss their favorite strategy games.', memberCount: 150, isMember: false },
      { id: 2, name: 'Book Club', image: 'https://picsum.photos/id/403/300/150', description: 'Monthly book discussions and recommendations.', memberCount: 75, isMember: true },
      { id: 3, name: 'Fitness Motivation', image: 'https://picsum.photos/id/390/300/150', description: 'Share your fitness journey and motivate others.', memberCount: 200, isMember: false },
      { id: 4, name: 'Tech Innovators', image: 'https://picsum.photos/id/180/300/150', description: 'Discussing the latest in technology and innovation.', memberCount: 120, isMember: true },
      { id: 5, name: 'Cooking Enthusiasts', image: 'https://picsum.photos/id/292/300/150', description: 'Share recipes and cooking tips with fellow food lovers.', memberCount: 180, isMember: false },
      { id: 6, name: 'Travel Adventures', image: 'https://picsum.photos/id/450/300/150', description: 'Share travel stories and get tips for your next adventure.', memberCount: 250, isMember: false },
      { id: 7, name: 'Photography Club', image: 'https://picsum.photos/id/250/300/150', description: 'For photography enthusiasts to share their work and techniques.', memberCount: 95, isMember: true },
      { id: 8, name: 'Movie Buffs', image: 'https://picsum.photos/id/310/300/150', description: 'Discuss and review the latest films and classics.', memberCount: 130, isMember: false },
      { id: 9, name: 'Gardening Gurus', image: 'https://picsum.photos/id/320/300/150', description: 'Tips and tricks for growing beautiful gardens.', memberCount: 80, isMember: true },
      { id: 10, name: 'Pet Lovers', image: 'https://picsum.photos/id/330/300/150', description: 'A community for pet owners to share advice and cute pictures.', memberCount: 220, isMember: false },
      { id: 11, name: 'Startup Founders', image: 'https://picsum.photos/id/340/300/150', description: 'Network and share experiences with fellow entrepreneurs.', memberCount: 65, isMember: true },
      { id: 12, name: 'Yoga and Meditation', image: 'https://picsum.photos/id/350/300/150', description: 'Find inner peace and improve flexibility together.', memberCount: 110, isMember: false },
      { id: 13, name: 'DIY Crafters', image: 'https://picsum.photos/id/360/300/150', description: 'Share your DIY projects and get inspired by others.', memberCount: 140, isMember: true },
      { id: 14, name: 'Language Exchange', image: 'https://picsum.photos/id/370/300/150', description: 'Practice speaking new languages with native speakers.', memberCount: 85, isMember: false },
      { id: 15, name: 'Science Enthusiasts', image: 'https://picsum.photos/id/380/300/150', description: 'Discuss the latest scientific discoveries and theories.', memberCount: 70, isMember: true },
      { id: 16, name: 'Art Appreciation', image: 'https://picsum.photos/id/390/300/150', description: 'Explore and discuss various forms of art.', memberCount: 100, isMember: false },
      { id: 17, name: 'Sustainable Living', image: 'https://picsum.photos/id/400/300/150', description: 'Tips for living an eco-friendly lifestyle.', memberCount: 90, isMember: true },
      { id: 18, name: 'Music Makers', image: 'https://picsum.photos/id/410/300/150', description: 'Connect with fellow musicians and share your creations.', memberCount: 160, isMember: false },
      { id: 19, name: 'Home Brewers', image: 'https://picsum.photos/id/420/300/150', description: 'Share recipes and tips for brewing your own beer.', memberCount: 55, isMember: true },
      { id: 20, name: 'Mindfulness Practice', image: 'https://picsum.photos/id/430/300/150', description: 'Learn and share techniques for living mindfully.', memberCount: 75, isMember: false },
    ];
  }, []);

  useEffect(() => {
    setGroups(generateMockGroups());
  }, [generateMockGroups]);

  const handleJoinGroup = useCallback((groupId) => {
    setGroups(prevGroups => 
      prevGroups.map(group => 
        group.id === groupId 
          ? { 
              ...group, 
              isMember: !group.isMember,
              memberCount: group.isMember ? group.memberCount - 1 : group.memberCount + 1
            }
          : group
      )
    );
  }, []);

  const handleCreateGroup = useCallback(() => {
    // Implement group creation logic here
    console.log('Create new group');
  }, []);

  const filteredGroups = useMemo(() => 
    groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [groups, searchTerm]
  );

  return (
    <>
      <GlobalStyle />
      <GroupsWrapper>
        <Header>
          <FaUsers />
          Groups
        </Header>
        <ActionsBar>
          <CreateGroupButton onClick={handleCreateGroup}>
            <FaPlus /> Create New Group
          </CreateGroupButton>
          <SearchBar>
            <FaSearch color="#65676b" />
            <SearchInput
              type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </ActionsBar>
        <GroupsGrid>
          {filteredGroups.map(group => (
            <GroupCard key={group.id}>
              <GroupImage src={group.image} alt={group.name} />
              <GroupName>{group.name}</GroupName>
              <GroupDescription>{group.description}</GroupDescription>
              <GroupMemberCount>{group.memberCount} members</GroupMemberCount>
              <JoinGroupButton
                onClick={() => handleJoinGroup(group.id)}
                isMember={group.isMember}
              >
                {group.isMember ? (
                  <>
                    <FaUserMinus /> Leave Group
                  </>
                ) : (
                  <>
                    <FaUserPlus /> Join Group
                  </>
                )}
              </JoinGroupButton>
            </GroupCard>
          ))}
        </GroupsGrid>
      </GroupsWrapper>
    </>
  );
};

export default Groups;