import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => theme.animations.fadeIn}
  ${({ theme }) => theme.animations.slideIn}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    line-height: ${({ theme }) => theme.lineHeights.body};
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-top: 60px;
  }

  main {
    flex: 1 0 auto;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.headings};
    line-height: ${({ theme }) => theme.lineHeights.heading};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.xxlarge};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xlarge};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.large};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      text-decoration: underline;
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
  }

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

  .fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }

  .slideIn {
    animation: slideIn 0.5s ease-in-out;
  }
`;