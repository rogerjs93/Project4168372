import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';

const FeedWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Post = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const PostAuthor = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const PostContent = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PostActions = styled.div`
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

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const post = posts.find(p => p.id === postId);
      const updatedPost = { ...post, likes: post.likes + 1 };
      await axios.put(`http://localhost:3001/posts/${postId}`, updatedPost);
      setPosts(posts.map(p => p.id === postId ? updatedPost : p));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <FeedWrapper>
      {posts.map(post => (
        <Post key={post.id}>
          <PostAuthor>{post.userId}</PostAuthor>
          <PostContent>{post.content}</PostContent>
          <PostActions>
            <ActionButton onClick={() => handleLike(post.id)}>
              <FaHeart /> {post.likes} Likes
            </ActionButton>
            <ActionButton>
              <FaComment /> {post.comments.length} Comments
            </ActionButton>
            <ActionButton>
              <FaShare /> Share
            </ActionButton>
          </PostActions>
        </Post>
      ))}
    </FeedWrapper>
  );
};

export default NewsFeed;