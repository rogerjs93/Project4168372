import React from 'react';
import styled from 'styled-components';

const ActivityFeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ActivityItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 15px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const ActivityContent = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ActivityTimestamp = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ActivityFeed = ({ activities }) => {
  return (
    <ActivityFeedWrapper>
      {activities.map(activity => (
        <ActivityItem key={activity.id}>
          <ActivityContent>{activity.content}</ActivityContent>
          <ActivityTimestamp>{new Date(activity.timestamp).toLocaleString()}</ActivityTimestamp>
        </ActivityItem>
      ))}
    </ActivityFeedWrapper>
  );
};

export default ActivityFeed;