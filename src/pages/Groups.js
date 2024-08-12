import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaPlus } from 'react-icons/fa';

const GroupsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
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
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const GroupsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const GroupCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const GroupImage = styled.img`
  width: 100%;
  height: 150px;
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
  margin: 0;
`;

const Groups = () => {
  // Mock groups data
  const groups = [
    { id: 1, name: 'The strategist', image: 'https://picsum.photos/id/201/250/150', description: 'A group for gamers to discuss their favorite strategy games.' },
    { id: 2, name: 'Book Club', image: 'https://picsum.photos/id/403/250/150', description: 'Monthly book discussions and recommendations.' },
    { id: 3, name: 'Fitness Motivation', image: 'https://picsum.photos/id/390/250/150', description: 'Share your fitness journey and motivate others.' },
    // Add more groups as needed
  ];

  return (
    <GroupsWrapper>
      <Header>
        <FaUsers />
        Groups
      </Header>
      <CreateGroupButton>
        <FaPlus /> Create New Group
      </CreateGroupButton>
      <GroupsList>
        {groups.map(group => (
          <GroupCard key={group.id}>
            <GroupImage src={group.image} alt={group.name} />
            <GroupName>{group.name}</GroupName>
            <GroupDescription>{group.description}</GroupDescription>
          </GroupCard>
        ))}
      </GroupsList>
    </GroupsWrapper>
  );
};

export default Groups;