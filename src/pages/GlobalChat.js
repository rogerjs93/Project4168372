import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaComments, FaPaperPlane, FaExclamationCircle, FaSpinner, FaSmile, FaImage } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import EmojiPicker from 'emoji-picker-react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ChatWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ChatBox = styled.div`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const MessageGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  animation: ${fadeIn} 0.3s ease-out;
`;

const ChatMessage = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  display: flex;
  flex-direction: column;
  align-items: ${({ isCurrentUser }) => isCurrentUser ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div`
  background-color: ${({ theme, isCurrentUser }) => isCurrentUser ? theme.colors.primary : theme.colors.background};
  color: ${({ theme, isCurrentUser }) => isCurrentUser ? theme.colors.textOnPrimary : theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  max-width: 70%;
  word-wrap: break-word;
`;

const MessageSender = styled.span`
  font-weight: bold;
  color: ${({ theme, isCurrentUser }) => isCurrentUser ? theme.colors.secondary : theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.tiny};
`;

const MessageTime = styled.small`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  margin-top: ${({ theme }) => theme.spacing.tiny};
`;

const ChatInput = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small};
  position: relative;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.small};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const SendButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.errorLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmojiPickerWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  z-index: 1000;
`;

const EmojiPickerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatBoxRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const { user } = useAuth();

  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3001/messages?_sort=timestamp&_order=desc&_limit=50');
      setMessages(response.data.reverse());
      setError('');
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (newMessage.trim() === '') return;

    const messageToSend = {
      sender: user.username,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      setIsLoading(true);
      await axios.post('http://localhost:3001/messages', messageToSend);
      setMessages(prevMessages => [...prevMessages, messageToSend]);
      setNewMessage('');
      setError('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [newMessage, user.username]);

  const formatTimestamp = useMemo(() => (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const groupedMessages = useMemo(() => {
    return messages.reduce((groups, message) => {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.sender === message.sender) {
        lastGroup.messages.push(message);
      } else {
        groups.push({ sender: message.sender, messages: [message] });
      }
      return groups;
    }, []);
  }, [messages]);

  const handleEmojiClick = (event, emojiObject) => {
    setNewMessage(prevMessage => prevMessage + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

  return (
    <ChatWrapper>
      <Header>
        <FaComments />
        Global Chat
      </Header>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <ChatBox ref={chatBoxRef}>
        {isLoading && messages.length === 0 ? (
          <LoadingIndicator>
            <SpinnerIcon /> Loading messages...
          </LoadingIndicator>
        ) : (
          groupedMessages.map((group, groupIndex) => (
            <MessageGroup key={groupIndex}>
              <MessageSender isCurrentUser={group.sender === user.username}>
                {group.sender}
              </MessageSender>
              {group.messages.map((message, messageIndex) => (
                <ChatMessage key={messageIndex} isCurrentUser={group.sender === user.username}>
                  <MessageBubble isCurrentUser={group.sender === user.username}>
                    {message.content}
                  </MessageBubble>
                  <MessageTime>{formatTimestamp(message.timestamp)}</MessageTime>
                </ChatMessage>
              ))}
            </MessageGroup>
          ))
        )}
      </ChatBox>
      <ChatInput>
        <IconButton onClick={toggleEmojiPicker} aria-label="Open emoji picker">
          <FaSmile />
        </IconButton>
        {showEmojiPicker && (
          <EmojiPickerWrapper ref={emojiPickerRef}>
            <EmojiPickerOverlay onClick={() => setShowEmojiPicker(false)} />
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </EmojiPickerWrapper>
        )}
        <IconButton aria-label="Upload image">
          <FaImage />
        </IconButton>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
          aria-label="Type a message"
        />
        <SendButton onClick={handleSendMessage} disabled={isLoading || newMessage.trim() === ''} aria-label="Send message">
          {isLoading ? <SpinnerIcon /> : <FaPaperPlane />}
        </SendButton>
      </ChatInput>
    </ChatWrapper>
  );
};

export default GlobalChat;