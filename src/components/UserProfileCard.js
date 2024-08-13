import React from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { Card } from './Card';

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Avatar = styled(FaUserCircle)`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Email = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const UserProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <Card title="User Profile">
      <UserProfile>
        <Avatar />
        <UserInfo>
          <Username>{user.username}</Username>
          <Email>{user.email}</Email>
        </UserInfo>
      </UserProfile>
    </Card>
  );
};

export default UserProfileCard;