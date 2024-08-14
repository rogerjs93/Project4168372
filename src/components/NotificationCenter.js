import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { FaBell, FaCheckCircle, FaUserPlus, FaTrophy, FaCheck, FaRegBell, FaSync, FaExclamationCircle } from 'react-icons/fa';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const NotificationCenterWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.surfaceLight}, ${({ theme }) => theme.colors.background});
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.large};
  animation: ${fadeIn} 0.3s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.small};
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  font-weight: 600;
`;

const IconButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }

  ${props => props.loading && css`
    animation: ${rotate} 1s linear infinite;
  `}
`;

const NotificationListWrapper = styled.div`
  height: 400px;
  overflow: hidden;

  .scrollable-container {
    overflow: hidden !important;
  }

  .scrollable-content {
    overflow-y: scroll !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

const StyledNotificationItem = styled.div`
  background-color: ${({ theme, isRead }) => isRead ? theme.colors.background : theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  cursor: pointer;
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  font-size: 1.2rem;
  color: ${({ theme, type }) => {
    switch (type) {
      case 'like': return theme.colors.accent;
      case 'follow': return theme.colors.success;
      case 'milestone': return theme.colors.warning;
      default: return theme.colors.primary;
    }
  }};
  background-color: ${({ theme, type }) => {
    switch (type) {
      case 'like': return `${theme.colors.accent}20`;
      case 'follow': return `${theme.colors.success}20`;
      case 'milestone': return `${theme.colors.warning}20`;
      default: return `${theme.colors.primary}20`;
    }
  }};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 50%;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ isRead }) => isRead ? 400 : 500};
`;

const NotificationTimestamp = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: block;
  margin-top: ${({ theme }) => theme.spacing.tiny};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyStateIcon = styled(FaRegBell)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const EmptyStateText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 20;

  const fetchNotifications = useCallback(async () => {
    if (!hasNextPage) return;

    setLoading(true);
    setError(null);
    try {
      // NOTE: This is using mock data. Replace with actual API call when connecting to a real server
      const response = await axios.get(`http://localhost:3001/notifications`, {
        params: {
          userId: user.id,
          _sort: 'timestamp',
          _order: 'desc',
          _page: page,
          _limit: ITEMS_PER_PAGE
        }
      });
      
      const newNotifications = response.data;
      setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
      setHasNextPage(newNotifications.length === ITEMS_PER_PAGE);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [user.id, page, hasNextPage]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (notificationId) => {
    try {
      // NOTE: This is using mock data. Replace with actual API call when connecting to a real server
      await axios.patch(`http://localhost:3001/notifications/${notificationId}`, { isRead: true });
      setNotifications(notifications.map(notification => 
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // NOTE: This is using mock data. Replace with actual API call when connecting to a real server
      await Promise.all(
        notifications
          .filter(n => !n.isRead)
          .map(n => axios.patch(`http://localhost:3001/notifications/${n.id}`, { isRead: true }))
      );
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like': return <FaCheckCircle />;
      case 'follow': return <FaUserPlus />;
      case 'milestone': return <FaTrophy />;
      default: return <FaBell />;
    }
  };

  const NotificationItem = useMemo(() => React.memo(({ index, style }) => {
    const notification = notifications[index];
    if (!notification) return null;

    return (
      <StyledNotificationItem
        style={style}
        isRead={notification.isRead}
        onClick={() => !notification.isRead && markAsRead(notification.id)}
      >
        <IconWrapper type={notification.type}>
          {getNotificationIcon(notification.type)}
        </IconWrapper>
        <NotificationContent>
          <NotificationText isRead={notification.isRead}>{notification.content}</NotificationText>
          <NotificationTimestamp>{new Date(notification.timestamp).toLocaleString()}</NotificationTimestamp>
        </NotificationContent>
      </StyledNotificationItem>
    );
  }), [notifications, markAsRead]);

  const itemCount = hasNextPage ? notifications.length + 1 : notifications.length;

  const loadMoreItems = loading ? () => {} : fetchNotifications;

  const isItemLoaded = (index) => !hasNextPage || index < notifications.length;

  return (
    <NotificationCenterWrapper>
      <Header>
        <Title>Notifications</Title>
        <div>
          {notifications.some(n => !n.isRead) && (
            <IconButton onClick={markAllAsRead} title="Mark all as read">
              <FaCheck />
            </IconButton>
          )}
          <IconButton onClick={() => { setNotifications([]); setPage(1); fetchNotifications(); }} title="Refresh" loading={loading}>
            <FaSync />
          </IconButton>
        </div>
      </Header>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      {!loading && notifications.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon />
          <EmptyStateText>No notifications yet</EmptyStateText>
        </EmptyState>
      ) : (
        <NotificationListWrapper>
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={itemCount}
                loadMoreItems={loadMoreItems}
              >
                {({ onItemsRendered, ref }) => (
                  <List
                    className="scrollable-content"
                    height={height}
                    itemCount={itemCount}
                    itemSize={100} // Adjust this value based on your notification item height
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    width={width}
                  >
                    {NotificationItem}
                  </List>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        </NotificationListWrapper>
      )}
    </NotificationCenterWrapper>
  );
};

export default NotificationCenter;