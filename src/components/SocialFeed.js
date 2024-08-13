import React from 'react';
import styled from 'styled-components';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';

const SocialFeedItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const SocialFeedAuthor = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const SocialFeedContent = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SocialFeedActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialFeed = ({ posts, onLike }) => {
  return (
    <>
      {posts.map(post => (
        <SocialFeedItem key={post.id}>
          <SocialFeedAuthor>{post.userId}</SocialFeedAuthor>
          <SocialFeedContent>{post.content}</SocialFeedContent>
          <SocialFeedActions>
            <ActionButton onClick={() => onLike(post.id)}>
              <FaHeart /> {post.likes} Likes
            </ActionButton>
            <ActionButton>
              <FaComment /> {post.comments.length} Comments
            </ActionButton>
            <ActionButton>
              <FaShare /> Share
            </ActionButton>
          </SocialFeedActions>
        </SocialFeedItem>
      ))}
    </>
  );
};

export default SocialFeed;