import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaHeart, FaComment, FaShare, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const FeedWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const Post = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
`;

const PostAuthor = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const PostContent = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  line-height: 1.5;
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
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
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

const NewPostForm = styled.form`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const NewPostInput = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  resize: vertical;
  min-height: 100px;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-top: ${({ theme }) => theme.spacing.small};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const CommentsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
  padding-top: ${({ theme }) => theme.spacing.medium};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const Comment = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const observer = useRef();
  const { user } = useAuth();
  const postsPerPage = 5;

  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3001/posts?_page=${page}&_limit=${postsPerPage}&_sort=timestamp&_order=desc`);
      setPosts(prevPosts => [...prevPosts, ...response.data]);
      setHasMore(response.data.length === postsPerPage);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again.');
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleLike = async (postId) => {
    try {
      const post = posts.find(p => p.id === postId);
      const updatedPost = { ...post, likes: post.likes + 1 };
      await axios.put(`http://localhost:3001/posts/${postId}`, updatedPost);
      setPosts(posts.map(p => p.id === postId ? updatedPost : p));
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Failed to like post. Please try again.');
    }
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      const newPost = {
        userId: user.id,
        content: newPostContent,
        likes: 0,
        comments: [],
        timestamp: new Date().toISOString()
      };
      const response = await axios.post('http://localhost:3001/posts', newPost);
      setPosts(prevPosts => [response.data, ...prevPosts]);
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating new post:', error);
      setError('Failed to create new post. Please try again.');
    }
  };

  return (
    <FeedWrapper>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <NewPostForm onSubmit={handleNewPost}>
        <NewPostInput
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <SubmitButton type="submit" disabled={!newPostContent.trim()}>
          Post
        </SubmitButton>
      </NewPostForm>
      {posts.map((post, index) => (
        <Post key={post.id} ref={posts.length === index + 1 ? lastPostElementRef : null}>
          <PostAuthor>{post.userId}</PostAuthor>
          <PostContent>{post.content}</PostContent>
          <PostActions>
            <ActionButton onClick={() => handleLike(post.id)} aria-label="Like post">
              <FaHeart /> {post.likes} Likes
            </ActionButton>
            <ActionButton aria-label="Comment on post">
              <FaComment /> {post.comments.length} Comments
            </ActionButton>
            <ActionButton aria-label="Share post">
              <FaShare /> Share
            </ActionButton>
          </PostActions>
          <CommentsSection>
            {post.comments.map((comment, index) => (
              <Comment key={index}>
                <CommentAuthor>{comment.userId}: </CommentAuthor>
                {comment.content}
              </Comment>
            ))}
          </CommentsSection>
        </Post>
      ))}
      {loading && <LoadingSpinner />}
    </FeedWrapper>
  );
};

export default NewsFeed;