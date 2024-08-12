import React, { useState } from 'react';
import styled from 'styled-components';
import { FaComments, FaPaperPlane } from 'react-icons/fa';

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

const ChatMessage = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const MessageSender = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
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
`;

const GlobalChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'User1', content: 'Hello everyone!' },
    { id: 2, sender: 'User2', content: "Hi there! How's it going?" },
    { id: 3, sender: 'User3', content: 'Anyone up for a game?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, sender: 'You', content: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <ChatWrapper>
      <Header>
        <FaComments />
        Global Chat
      </Header>
      <ChatBox>
        {messages.map((message) => (
          <ChatMessage key={message.id}>
            <MessageSender>{message.sender}: </MessageSender>
            {message.content}
          </ChatMessage>
        ))}
      </ChatBox>
      <ChatInput>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <SendButton onClick={handleSendMessage}>
          <FaPaperPlane /> Send
        </SendButton>
      </ChatInput>
    </ChatWrapper>
  );
};

export default GlobalChat;