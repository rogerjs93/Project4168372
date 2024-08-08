import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const LoadingSpinner = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const postsPerPage = 2; // Adjust this to control how many posts are "loaded" at a time

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

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // In a real server implementation, you would use page and postsPerPage in the API call
        // For the mock server, we'll fetch all posts and manually paginate
        const response = await axios.get('http://localhost:3001/posts');
        const allPosts = response.data;
        const paginatedPosts = allPosts.slice(0, page * postsPerPage);
        setPosts(paginatedPosts);
        setHasMore(paginatedPosts.length < allPosts.length);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

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
      {posts.map((post, index) => (
        <Post key={post.id} ref={posts.length === index + 1 ? lastPostElementRef : null}>
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
      {loading && <LoadingSpinner>Loading...</LoadingSpinner>}
    </FeedWrapper>
  );
};

export default NewsFeed;