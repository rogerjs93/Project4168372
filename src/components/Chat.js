import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FaPaperPlane, FaTimes, FaArrowLeft, FaUser, FaCheck, FaCheckDouble, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ChatWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 260px;
  width: 380px;
  height: 600px;
  max-height: calc(100vh - 100px);
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.xlarge};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1002;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(to right, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatTitle = styled.h3`
  margin: 0;
  flex-grow: 1;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.surfaceLight};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.large};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 50%;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
`;

const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.small};
`;

const ChatItem = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  animation: ${slideIn} 0.3s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.surfaceLight};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const ChatItemContent = styled.div`
  flex: 1;
`;

const ChatItemName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.tiny};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ChatItemLastMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  animation: ${slideIn} 0.3s ease-out;
`;

const MessageContent = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.tiny};
`;

const MessageBubble = styled.div`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  max-width: 70%;
  ${({ isUser, theme }) => isUser
    ? `
      background-color: ${theme.colors.primary};
      color: ${theme.colors.surfaceLight};
      border-bottom-right-radius: 4px;
    `
    : `
      background-color: ${theme.colors.surfaceLight};
      color: ${theme.colors.textPrimary};
      border-bottom-left-radius: 4px;
    `
  }
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MessageTime = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.tiny};
`;

const MessageStatus = styled.span`
  margin-left: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
`;

const ChatInput = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  margin-right: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SendButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.medium};
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.05);
  }
`;

const TypingIndicator = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
`;

const Chat = ({ onClose }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchChats = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/chats');
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
      setError('Failed to load chats. Please try again.');
    }
  }, []);

  const fetchMessages = useCallback(async (chatId) => {
    try {
      const response = await axios.get(`http://localhost:3001/messages?chatId=${chatId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages. Please try again.');
    }
  }, []);

  const simulateMessageStatus = useCallback((messageId) => {
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === messageId ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === messageId ? { ...msg, status: 'read' } : msg
        )
      );
    }, 2000);
  }, []);

  const sendMessage = useCallback(async () => {
    if (inputMessage.trim() === '' || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      chatId: activeChat.id,
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toISOString(),
      status: 'sent',
      senderId: user.id
    };

    try {
      await axios.post('http://localhost:3001/messages', newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage('');
      simulateMessageStatus(newMessage.id);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }
  }, [inputMessage, activeChat, user.id, simulateMessageStatus]);

  const openChat = useCallback((chat) => {
    setActiveChat(chat);
    fetchMessages(chat.id);
  }, [fetchMessages]);

  const formatTime = useMemo(() => (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const handleInputChange = useCallback((e) => {
    setInputMessage(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  }, []);

  const renderMessageStatus = useMemo(() => (status) => {
    switch (status) {
      case 'sent':
        return <FaCheck aria-label="Message sent" />;
      case 'delivered':
        return <FaCheckDouble aria-label="Message delivered" />;
      case 'read':
        return <FaCheckDouble color="#4CAF50" aria-label="Message read" />;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeChat) {
        fetchMessages(activeChat.id);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeChat, fetchMessages]);

  return (
    <ChatWrapper>
      <ChatHeader>
        {activeChat ? (
          <>
            <HeaderButton onClick={() => setActiveChat(null)} aria-label="Back to chat list">
              <FaArrowLeft />
            </HeaderButton>
            <ChatTitle>{activeChat.name}</ChatTitle>
          </>
        ) : (
          <ChatTitle>Chats</ChatTitle>
        )}
        <HeaderButton onClick={onClose} aria-label="Close chat">
          <FaTimes />
        </HeaderButton>
      </ChatHeader>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      {activeChat ? (
        <>
          <ChatMessages>
            {messages.map((message) => (
              <MessageGroup key={message.id} isUser={message.senderId === user.id}>
                <MessageContent>
                  {message.senderId !== user.id && (
                    <Avatar>
                      <FaUser />
                    </Avatar>
                  )}
                  <MessageBubble isUser={message.senderId === user.id}>
                    {message.text}
                  </MessageBubble>
                  {message.senderId === user.id && (
                    <MessageStatus>{renderMessageStatus(message.status)}</MessageStatus>
                  )}
                </MessageContent>
                <MessageTime>{formatTime(message.timestamp)}</MessageTime>
              </MessageGroup>
            ))}
            {isTyping && <TypingIndicator>User is typing...</TypingIndicator>}
            <div ref={messagesEndRef} />
          </ChatMessages>
          <ChatInput>
            <Input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              aria-label="Type a message"
            />
            <SendButton onClick={sendMessage} aria-label="Send message">
              <FaPaperPlane />
            </SendButton>
          </ChatInput>
        </>
      ) : (
        <ChatList>
          {chats.map((chat) => (
            <ChatItem key={chat.id} onClick={() => openChat(chat)}>
              <Avatar><FaUser /></Avatar>
              <ChatItemContent>
                <ChatItemName>{chat.name}</ChatItemName>
                <ChatItemLastMessage>Last message preview...</ChatItemLastMessage>
              </ChatItemContent>
            </ChatItem>
          ))}
        </ChatList>
      )}
    </ChatWrapper>
  );
};

Chat.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Chat;