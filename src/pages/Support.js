import React from 'react';
import styled from 'styled-components';

const SupportWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const SupportTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const FAQList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FAQItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

export const Support = () => {
  const mockFAQs = [
    { id: 1, question: "How do I create a game?", answer: "Navigate to your dashboard and click on 'Create New Game' to start the game creation process." },
    { id: 2, question: "Can I monetize my games?", answer: "Yes, Naama offers various monetization options for game creators. Check out our monetization guide for more information." },
    { id: 3, question: "How do I report a bug?", answer: "You can report bugs through our bug reporting system accessible from your user settings or by contacting our support team." },
  ];

  return (
    <SupportWrapper>
      <SupportTitle>Support</SupportTitle>
      <h2>Frequently Asked Questions</h2>
      <FAQList>
        {mockFAQs.map(faq => (
          <FAQItem key={faq.id}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </FAQItem>
        ))}
      </FAQList>
    </SupportWrapper>
  );
};