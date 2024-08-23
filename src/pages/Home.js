import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaGamepad, FaUsers, FaShare, FaArrowRight, FaPlay, FaStar, FaQuoteLeft, FaUser, FaChevronLeft, FaChevronRight, FaPuzzlePiece, FaChess, FaRocket, FaGlobe } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import backgroundImage from '../assets/people-playing-games.webp';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const HomeWrapper = styled.div`
  overflow-x: hidden;
`;

const MaxWidthContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.large};
`;

const Hero = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.surfaceLight};
  max-width: 800px;
  padding: ${({ theme }) => theme.spacing.large};
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  line-height: 1.5;
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xlarge};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.medium};
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme, primary }) => primary ? theme.colors.primary : 'transparent'};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.xlarge};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.large};
  transition: ${({ theme }) => theme.transitions.medium};
  border: 2px solid ${({ theme, primary }) => primary ? theme.colors.primary : theme.colors.surfaceLight};
  margin: ${({ theme }) => theme.spacing.small};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme, primary }) => primary ? theme.colors.secondary : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  svg {
    margin-left: ${({ theme }) => theme.spacing.small};
  }
`;

const ScrollDownIndicator = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.large};
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  cursor: pointer;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-30px) translateX(-50%); }
    60% { transform: translateY(-15px) translateX(-50%); }
  }

  &:hover {
    transform: translateY(5px) translateX(-50%);
  }
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxxlarge} ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme, alternate }) => alternate ? theme.colors.background : theme.colors.surfaceLight};
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  text-align: center;
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.medium};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xlarge};
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.xxlarge};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.large};
  transition: ${({ theme }) => theme.transitions.medium};
  text-align: center;
  animation: ${slideIn} 0.5s ease-out;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.boxShadow.xlarge};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.background};
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.large};
  transition: ${({ theme }) => theme.transitions.medium};

  ${FeatureCard}:hover & {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  line-height: 1.6;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xlarge};
`;

const GameCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: ${({ theme }) => theme.transitions.medium};
  animation: ${slideIn} 0.5s ease-out;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.xlarge};
  }
`;

const GameImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
`;

const IconContainer = styled.div`
  font-size: 5rem;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  transition: ${({ theme }) => theme.transitions.medium};

  ${GameCard}:hover & {
    transform: scale(1.1);
  }
`;

const GameCategory = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.small};
  left: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.tiny} ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  z-index: 1;
`;

const GameInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const GameTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const GameCreator = styled.p`
  margin: ${({ theme }) => theme.spacing.small} 0 0;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const GameMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const GameRating = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const PlayButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    animation: ${pulse} 0.3s ease-in-out;
  }
`;

const TestimonialsSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.background};
`;

const TestimonialWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

const TestimonialCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.large};
  position: relative;
  margin: 0 auto;
  max-width: 600px;
`;

const QuoteIcon = styled(FaQuoteLeft)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.medium};
  left: ${({ theme }) => theme.spacing.medium};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.2;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  line-height: 1.6;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.surfaceLight};
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0;
`;

const AuthorRole = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin: 0;
`;

const TestimonialButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  z-index: 1;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  ${({ left }) => left && `left: 0;`}
  ${({ right }) => right && `right: 0;`}
`;

const FadeInSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-50px 0px',
  });

  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
      {children}
    </div>
  );
};

export const Home = () => {
  const [animateHero, setAnimateHero] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setAnimateHero(true);
  }, []);

  const gameCategories = useMemo(() => ['Action', 'Puzzle', 'Strategy', 'Adventure'], []);

  const testimonials = [
    {
      text: "Naama Online has revolutionized the way I create and share games. The platform's intuitive tools and supportive community have helped me grow as a developer.",
      author: "Sarah J.",
      role: "Game Developer"
    },
    {
      text: "I've discovered so many unique and creative games on Naama. It's not just a platform, it's a thriving ecosystem of innovative ideas and passionate creators.",
      author: "Mike T.",
      role: "Avid Gamer"
    },
    {
      text: "As a hobbyist, Naama Online has made game creation accessible and enjoyable. I've learned so much and connected with amazing people in the process.",
      author: "Emma L.",
      role: "Hobbyist Creator"
    }
  ];

  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderGameCard = useCallback((game) => {
    const getIconForCategory = (category) => {
      switch (category) {
        case 'Action': return <FaGamepad />;
        case 'Puzzle': return <FaPuzzlePiece />;
        case 'Strategy': return <FaChess />;
        case 'Adventure': return <FaGlobe />;
        default: return <FaRocket />;
      }
    };

    return (
      <GameCard key={game}>
        <GameImageWrapper>
          <IconContainer>
            {getIconForCategory(gameCategories[game - 1])}
          </IconContainer>
          <GameCategory>{gameCategories[game - 1]}</GameCategory>
        </GameImageWrapper>
        <GameInfo>
          <GameTitle>Awesome Game {game}</GameTitle>
          <GameCreator>by Creator {game}</GameCreator>
          <GameMeta>
            <GameRating>
              <FaStar aria-hidden="true" /> 4.{game} (1{game}0 ratings)
            </GameRating>
            <PlayButton to={`/games/${game}`}>
              <FaPlay aria-hidden="true" /> Play
            </PlayButton>
          </GameMeta>
        </GameInfo>
      </GameCard>
    );
  }, [gameCategories]);

  const heroVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.5 }
    }
  };

  return (
    <>
      <GlobalStyle />
      <HomeWrapper>
        <Hero ref={heroRef}>
          <HeroBackground
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          />
          <HeroContent
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroTitle>Welcome to Naama Online</HeroTitle>
            <HeroSubtitle>Create, Play, and Share Amazing Games in a Thriving Community</HeroSubtitle>
            <ButtonGroup>
              <Button to="/register" primary>
                Get Started <FaArrowRight aria-hidden="true" />
              </Button>
              <Button to="/games">
                Explore Games <FaPlay aria-hidden="true" />
              </Button>
            </ButtonGroup>
          </HeroContent>
          <ScrollDownIndicator onClick={scrollToFeatures}>
            <FaArrowRight style={{ transform: 'rotate(90deg)' }} aria-hidden="true" />
          </ScrollDownIndicator>
        </Hero>
        
        <FadeInSection>
          <Section id="features">
            <SectionContent>
              <SectionTitle>Why Choose Naama</SectionTitle>
              <FeatureGrid>
                <FeatureCard>
                  <FeatureIcon><FaGamepad aria-hidden="true" /></FeatureIcon>
                  <FeatureTitle>Create Games</FeatureTitle>
                  <FeatureDescription>Design and build your own games with our intuitive tools and powerful engine. Bring your ideas to life effortlessly.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><FaUsers aria-hidden="true" /></FeatureIcon>
                  <FeatureTitle>Play Together</FeatureTitle>
                  <FeatureDescription>Enjoy multiplayer games with friends, challenge players worldwide, and experience the thrill of competition.</FeatureDescription>
                </FeatureCard>
                <FeatureCard>
                  <FeatureIcon><FaShare aria-hidden="true" /></FeatureIcon>
                  <FeatureTitle>Share & Discover</FeatureTitle>
                  <FeatureDescription>Showcase your creations to a global audience and explore a vast library of unique games made by the community.</FeatureDescription>
                </FeatureCard>
              </FeatureGrid>
            </SectionContent>
          </Section>
        </FadeInSection>

        <FadeInSection>
          <Section alternate>
            <SectionContent>
              <SectionTitle>Trending Games</SectionTitle>
              <GameGrid>
                {[1, 2, 3, 4].map(renderGameCard)}
              </GameGrid>
            </SectionContent>
          </Section>
        </FadeInSection>

        <FadeInSection>
          <TestimonialsSection>
            <SectionContent>
              <SectionTitle>What Our Users Say</SectionTitle>
              <TestimonialWrapper>
                <AnimatePresence initial={false} custom={direction}>
                  <TestimonialCard
                    key={currentTestimonial}
                    custom={direction}
                    variants={testimonialVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <QuoteIcon aria-hidden="true" />
                    <TestimonialText>{testimonials[currentTestimonial].text}</TestimonialText>
                    <TestimonialAuthor>
                      <AuthorAvatar>
                        <FaUser aria-hidden="true" />
                      </AuthorAvatar>
                      <AuthorInfo>
                        <AuthorName>{testimonials[currentTestimonial].author}</AuthorName>
                        <AuthorRole>{testimonials[currentTestimonial].role}</AuthorRole>
                      </AuthorInfo>
                    </TestimonialAuthor>
                  </TestimonialCard>
                </AnimatePresence>
                <TestimonialButton left onClick={prevTestimonial}>
                  <FaChevronLeft aria-hidden="true" />
                </TestimonialButton>
                <TestimonialButton right onClick={nextTestimonial}>
                  <FaChevronRight aria-hidden="true" />
                </TestimonialButton>
              </TestimonialWrapper>
            </SectionContent>
          </TestimonialsSection>
        </FadeInSection>
      </HomeWrapper>
    </>
  );
};

export default React.memo(Home);