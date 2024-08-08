import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaSteam, FaPlaystation, FaXbox, FaTwitch } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.surfaceDark};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.large} 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.large};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const FooterTitle = styled.h3`
  color: ${({ theme }) => theme.colors.surfaceLight};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.surfaceLight};
  text-decoration: none;
  transition: ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.fontSizes.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const IconRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.surfaceLight};
  font-size: ${({ theme }) => theme.fontSizes.large};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

const NewsletterInput = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const NewsletterButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.fontSizes.medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Copyright = styled.p`
  margin: ${({ theme }) => theme.spacing.medium} 0 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;
`;

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Game Categories</FooterTitle>
          <FooterLinks>
            <FooterLink to="/games/action">Action Games</FooterLink>
            <FooterLink to="/games/puzzle">Puzzle Games</FooterLink>
            <FooterLink to="/games/strategy">Strategy Games</FooterLink>
            <FooterLink to="/games/rpg">RPG Games</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Connect With Us</FooterTitle>
          <SocialLinks>
            <IconRow>
              <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialLink>
            </IconRow>
            <IconRow>
              <SocialLink href="https://store.steampowered.com" target="_blank" rel="noopener noreferrer" aria-label="Steam">
                <FaSteam />
              </SocialLink>
              <SocialLink href="https://www.playstation.com" target="_blank" rel="noopener noreferrer" aria-label="PlayStation">
                <FaPlaystation />
              </SocialLink>
              <SocialLink href="https://www.xbox.com" target="_blank" rel="noopener noreferrer" aria-label="Xbox">
                <FaXbox />
              </SocialLink>
              <SocialLink href="https://www.twitch.tv" target="_blank" rel="noopener noreferrer" aria-label="Twitch">
                <FaTwitch />
              </SocialLink>
            </IconRow>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Subscribe to Our Newsletter</FooterTitle>
          <NewsletterForm onSubmit={handleSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <NewsletterButton type="submit">
              <FaEnvelope />
            </NewsletterButton>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>
      <Copyright>&copy; {new Date().getFullYear()} Naama.online. All rights reserved.</Copyright>
    </FooterWrapper>
  );
};