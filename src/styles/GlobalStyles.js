import { createGlobalStyle, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%; // This makes 1rem = 10px
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    line-height: ${({ theme }) => theme.lineHeights.body};
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1 0 auto;
    padding: ${({ theme }) => theme.spacing.large} 0;
    margin-top: 60px; // Adjust based on your header height
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.headings};
    line-height: ${({ theme }) => theme.lineHeights.heading};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  h1 { font-size: ${({ theme }) => theme.fontSizes.xxxlarge}; font-weight: ${({ theme }) => theme.fontWeights.bold}; }
  h2 { font-size: ${({ theme }) => theme.fontSizes.xxlarge}; font-weight: ${({ theme }) => theme.fontWeights.semibold}; }
  h3 { font-size: ${({ theme }) => theme.fontSizes.xlarge}; font-weight: ${({ theme }) => theme.fontWeights.medium}; }
  h4 { font-size: ${({ theme }) => theme.fontSizes.large}; font-weight: ${({ theme }) => theme.fontWeights.medium}; }
  h5 { font-size: ${({ theme }) => theme.fontSizes.medium}; font-weight: ${({ theme }) => theme.fontWeights.semibold}; }
  h6 { font-size: ${({ theme }) => theme.fontSizes.small}; font-weight: ${({ theme }) => theme.fontWeights.semibold}; }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.linkHover};
    }
  }

  button {
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.fast};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.small};
    transition: ${({ theme }) => theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  // Custom scrollbar
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.textSecondary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textPrimary};
  }

  // Utility classes
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.medium};
  }

  .card {
    background-color: ${({ theme }) => theme.colors.surfaceLight};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
    padding: ${({ theme }) => theme.spacing.large};
    margin-bottom: ${({ theme }) => theme.spacing.large};
  }

  .btn {
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surfaceLight};
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    transition: ${({ theme }) => theme.transitions.medium};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      transform: translateY(-2px);
    }
  }

  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }

  .mb-1 { margin-bottom: ${({ theme }) => theme.spacing.small}; }
  .mb-2 { margin-bottom: ${({ theme }) => theme.spacing.medium}; }
  .mb-3 { margin-bottom: ${({ theme }) => theme.spacing.large}; }
  .mt-1 { margin-top: ${({ theme }) => theme.spacing.small}; }
  .mt-2 { margin-top: ${({ theme }) => theme.spacing.medium}; }
  .mt-3 { margin-top: ${({ theme }) => theme.spacing.large}; }

  .fadeIn { animation: ${fadeIn} 0.5s ease-in-out; }
  .slideIn { animation: ${slideIn} 0.5s ease-in-out; }

  // Responsive design
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    html {
      font-size: 56.25%; // This makes 1rem = 9px on tablets
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    html {
      font-size: 50%; // This makes 1rem = 8px on mobile
    }
  }
`;