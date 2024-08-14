import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaHeart, FaComment, FaShare, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const { user } = useAuth();

  // NOTE: For future server integration, uncomment the following lines
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);
  // const ITEMS_PER_PAGE = 10;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // NOTE: For future server integration, replace this with a paginated API call
      const response = await axios.get(`http://localhost:3001/posts?_sort=timestamp&_order=desc`);
      setPosts(response.data);
      
      // NOTE: For future server integration, uncomment the following lines
      // setPosts(prevPosts => [...prevPosts, ...response.data]);
      // setHasMore(response.data.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleLike = useCallback(async (postId) => {
    try {
      const post = posts.find(p => p.id === postId);
      const updatedPost = { ...post, likes: post.likes + 1 };
      await axios.put(`http://localhost:3001/posts/${postId}`, updatedPost);
      setPosts(prevPosts => prevPosts.map(p => p.id === postId ? updatedPost : p));
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Failed to like post. Please try again.');
    }
  }, [posts]);

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

  const MemoizedPost = useMemo(() => React.memo(({ post }) => (
    <Post>
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
  )), [handleLike]);

  const Row = ({ index, style }) => (
    <div style={style}>
      <MemoizedPost post={posts[index]} />
    </div>
  );

  // NOTE: For future server integration, implement this function
  // const loadMorePosts = () => {
  //   if (!loading && hasMore) {
  //     setPage(prevPage => prevPage + 1);
  //   }
  // };

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
      {loading && posts.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={posts.length}
              itemSize={250} // Adjust this value based on your average post height
              width={width}
              // NOTE: For future server integration, add this prop
              // onItemsRendered={({ visibleStopIndex }) => {
              //   if (visibleStopIndex === posts.length - 1) {
              //     loadMorePosts();
              //   }
              // }}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      )}
      {loading && posts.length > 0 && <LoadingSpinner />}
    </FeedWrapper>
  );
};

export default React.memo(NewsFeed);