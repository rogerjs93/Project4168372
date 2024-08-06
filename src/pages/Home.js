// pages/Home.js
import React from 'react';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  h1 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FeatureSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Home = () => (
  <HomeWrapper>
    <h1>Welcome to naama.online1</h1>
    <p>Discover our amazing services and solutions.</p>
    
    <FeatureSection>
      <FeatureCard>
        <h3>Feature 1</h3>
        <p>Description of feature 1</p>
      </FeatureCard>
      <FeatureCard>
        <h3>Feature 2</h3>
        <p>Description of feature 2</p>
      </FeatureCard>
      <FeatureCard>
        <h3>Feature 3</h3>
        <p>Description of feature 3</p>
      </FeatureCard>
    </FeatureSection>
  </HomeWrapper>
);