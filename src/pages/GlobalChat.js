import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { FaComments, FaPaperPlane, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const ChatWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ChatBox = styled.div`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  overflow-y: auto;
`;

const MessageGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ChatMessage = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const MessageSender = styled.span`
  font-weight: bold;
  color: ${({ theme, isCurrentUser }) => isCurrentUser ? theme.colors.secondary : theme.colors.primary};
`;

const MessageContent = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const MessageTime = styled.small`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.spacing.small};
`;

const ChatInput = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Input = styled.input`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
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
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
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
            <FaSpinner /> Loading messages...
          </LoadingIndicator>
        ) : (
          groupedMessages.map((group, groupIndex) => (
            <MessageGroup key={groupIndex}>
              <MessageSender isCurrentUser={group.sender === user.username}>
                {group.sender}
              </MessageSender>
              {group.messages.map((message, messageIndex) => (
                <ChatMessage key={messageIndex}>
                  <MessageContent>{message.content}</MessageContent>
                  <MessageTime>({formatTimestamp(message.timestamp)})</MessageTime>
                </ChatMessage>
              ))}
            </MessageGroup>
          ))
        )}
      </ChatBox>
      <ChatInput>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
          aria-label="Type a message"
        />
        <SendButton onClick={handleSendMessage} disabled={isLoading || newMessage.trim() === ''}>
          {isLoading ? <FaSpinner /> : <FaPaperPlane />} Send
        </SendButton>
      </ChatInput>
    </ChatWrapper>
  );
};

export default GlobalChat;