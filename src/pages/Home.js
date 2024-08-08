import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGamepad, FaUsers, FaShare } from 'react-icons/fa';

const HomeWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
  overflow-x: hidden;
`;

const Hero = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.xxlarge} ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  text-align: center;
  background-image: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxxlarge};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: ${({ theme }) => theme.transitions.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

const FeatureSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.xlarge};
  margin-bottom: ${({ theme }) => theme.spacing.xxlarge};
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: ${({ theme }) => theme.transitions.medium};
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TrendingGamesSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxlarge};
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const GameCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: ${({ theme }) => theme.transitions.medium};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const GameInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const GameTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const GameCreator = styled.p`
  margin: ${({ theme }) => theme.spacing.small} 0 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TestimonialsSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxlarge};
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const TestimonialCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TestimonialAuthor = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Home = () => (
  <HomeWrapper>
    <Hero>
      <HeroTitle>Welcome to Naama Online</HeroTitle>
      <HeroSubtitle>Create, Play, and Share Amazing Games</HeroSubtitle>
      <Button to="/register">Get Started</Button>
    </Hero>
    
    <FeatureSection>
      <FeatureCard>
        <FeatureIcon><FaGamepad /></FeatureIcon>
        <FeatureTitle>Create Games</FeatureTitle>
        <FeatureDescription>Design and build your own games with our easy-to-use tools.</FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureIcon><FaUsers /></FeatureIcon>
        <FeatureTitle>Play Together</FeatureTitle>
        <FeatureDescription>Enjoy multiplayer games with friends and meet new people.</FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureIcon><FaShare /></FeatureIcon>
        <FeatureTitle>Share & Discover</FeatureTitle>
        <FeatureDescription>Share your creations and discover games made by the community.</FeatureDescription>
      </FeatureCard>
    </FeatureSection>

    <TrendingGamesSection>
      <SectionTitle>Trending Games</SectionTitle>
      <GameGrid>
        {[1, 2, 3, 4].map((game) => (
          <GameCard key={game}>
            <GameImage src={`https://source.unsplash.com/random/200x150?game=${game}`} alt="Game thumbnail" />
            <GameInfo>
              <GameTitle>Awesome Game {game}</GameTitle>
              <GameCreator>by Creator {game}</GameCreator>
            </GameInfo>
          </GameCard>
        ))}
      </GameGrid>
    </TrendingGamesSection>

    <TestimonialsSection>
      <SectionTitle>What Our Users Say</SectionTitle>
      <TestimonialGrid>
        <TestimonialCard>
          <TestimonialText>"Naama Online has revolutionized the way I create and share games. It's an incredible platform!"</TestimonialText>
          <TestimonialAuthor>- Sarah J., Game Developer</TestimonialAuthor>
        </TestimonialCard>
        <TestimonialCard>
          <TestimonialText>"I've met so many amazing people through the games on Naama. It's not just a platform, it's a community."</TestimonialText>
          <TestimonialAuthor>- Mike T., Gamer</TestimonialAuthor>
        </TestimonialCard>
        <TestimonialCard>
          <TestimonialText>"The tools provided by Naama Online make game creation accessible to everyone. I'm hooked!"</TestimonialText>
          <TestimonialAuthor>- Emma L., Hobbyist Creator</TestimonialAuthor>
        </TestimonialCard>
      </TestimonialGrid>
    </TestimonialsSection>
  </HomeWrapper>
);