import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const NotificationCenterWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const NotificationItem = styled.div`
  background-color: ${({ theme, isRead }) => isRead ? theme.colors.background : theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
`;

const NotificationContent = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const NotificationTimestamp = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NotificationCenter = () => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();
  
    const fetchNotifications = useCallback(async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notifications?userId=${user.id}&_sort=timestamp&_order=desc`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }, [user.id]);
  
    useEffect(() => {
      fetchNotifications();
    }, [fetchNotifications]);

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:3001/notifications/${notificationId}`, { isRead: true });
      setNotifications(notifications.map(notification => 
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <NotificationCenterWrapper>
      <h2>Notifications</h2>
      <NotificationList>
        {notifications.map(notification => (
          <NotificationItem 
            key={notification.id} 
            isRead={notification.isRead}
            onClick={() => !notification.isRead && markAsRead(notification.id)}
          >
            <NotificationContent>{notification.content}</NotificationContent>
            <NotificationTimestamp>{new Date(notification.timestamp).toLocaleString()}</NotificationTimestamp>
          </NotificationItem>
        ))}
      </NotificationList>
    </NotificationCenterWrapper>
  );
};

export default NotificationCenter;