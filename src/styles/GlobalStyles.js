import { createGlobalStyle, css } from 'styled-components';

// Keyframes for animations
const fadeIn = css`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const slideIn = css`
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

// Font loading optimization
const fontFaceDeclarations = css`
  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/Montserrat-Regular.woff2') format('woff2'),
         url('/fonts/Montserrat-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto-Regular.woff2') format('woff2'),
         url('/fonts/Roboto-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  /* Add more font-face declarations for other weights and styles */
`;

export const GlobalStyles = createGlobalStyle`
  ${fontFaceDeclarations}
  ${fadeIn}
  ${slideIn}

  :root {
    /* CSS Custom Properties for easy theme switching */
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-primary-light: ${({ theme }) => theme.colors.primaryLight};
    --color-primary-dark: ${({ theme }) => theme.colors.primaryDark};
    --color-secondary: ${({ theme }) => theme.colors.secondary};
    --color-secondary-light: ${({ theme }) => theme.colors.secondaryLight};
    --color-secondary-dark: ${({ theme }) => theme.colors.secondaryDark};
    --color-accent: ${({ theme }) => theme.colors.accent};
    --color-background: ${({ theme }) => theme.colors.background};
    --color-surface-light: ${({ theme }) => theme.colors.surfaceLight};
    --color-surface-dark: ${({ theme }) => theme.colors.surfaceDark};
    --color-text-primary: ${({ theme }) => theme.colors.textPrimary};
    --color-text-secondary: ${({ theme }) => theme.colors.textSecondary};
    --color-border: ${({ theme }) => theme.colors.borderColor};
    --font-main: ${({ theme }) => theme.fonts.main};
    --font-headings: ${({ theme }) => theme.fonts.headings};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    font-family: var(--font-main);
    font-size: ${({ theme }) => theme.fontSizes.medium};
    line-height: ${({ theme }) => theme.lineHeights.body};
    color: var(--color-text-primary);
    background-color: var(--color-background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    min-height: 100%;
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
    font-family: var(--font-headings);
    line-height: ${({ theme }) => theme.lineHeights.heading};
    color: var(--color-text-primary);
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
    color: var(--color-primary);
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: var(--color-primary-dark);
    }
  }

  button {
    font-family: var(--font-main);
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.fast};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
    background-color: var(--color-primary);
    color: var(--color-surface-light);

    &:hover {
      background-color: var(--color-primary-dark);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--color-primary-light);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  input, textarea, select {
    font-family: var(--font-main);
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.small};
    transition: ${({ theme }) => theme.transitions.fast};
    background-color: var(--color-surface-light);

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-primary-light);
    }

    &::placeholder {
      color: var(--color-text-secondary);
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Utility classes */
  .container {
    width: 100%;
    max-width: 120rem;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.medium};
  }

  .fadeIn { animation: fadeIn 0.5s ease-in-out; }
  .slideIn { animation: slideIn 0.5s ease-in-out; }

  /* Improve focus styles for keyboard navigation */
  *:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Optimize animations */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Improve performance for fixed position elements */
  .fixed-element {
    will-change: transform;
  }

  /* Accessibility improvements */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Skip to main content link */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary);
    color: var(--color-surface-light);
    padding: 8px;
    z-index: 100;
    
    &:focus {
      top: 0;
    }
  }

  /* Print styles */
  @media print {
    body {
      background-color: white;
      color: black;
    }

    @page {
      margin: 2cm;
    }

    a[href^="http"]:after {
      content: " (" attr(href) ")";
    }
  }

/* Responsive design */
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

  /* Hide scrollbars */
  * {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      background: transparent; /* Chrome/Safari/Webkit */
    }
  }

  /* Custom scrollbar for browsers that support it */
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: var(--color-background);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--color-primary);
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--color-primary-dark);
    }
  }

  /* Additional utility classes */
  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .flex {
    display: flex;
  }

  .flex-column {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .w-full {
    width: 100%;
  }

  .h-full {
    height: 100%;
  }

  /* Color utility classes */
  .bg-primary {
    background-color: var(--color-primary);
  }

  .bg-secondary {
    background-color: var(--color-secondary);
  }

  .text-primary {
    color: var(--color-primary);
  }

  .text-secondary {
    color: var(--color-secondary);
  }

  /* Spacing utility classes */
  .m-0 { margin: 0; }
  .m-1 { margin: ${({ theme }) => theme.spacing.tiny}; }
  .m-2 { margin: ${({ theme }) => theme.spacing.small}; }
  .m-3 { margin: ${({ theme }) => theme.spacing.medium}; }
  .m-4 { margin: ${({ theme }) => theme.spacing.large}; }

  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: ${({ theme }) => theme.spacing.tiny}; }
  .mt-2 { margin-top: ${({ theme }) => theme.spacing.small}; }
  .mt-3 { margin-top: ${({ theme }) => theme.spacing.medium}; }
  .mt-4 { margin-top: ${({ theme }) => theme.spacing.large}; }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: ${({ theme }) => theme.spacing.tiny}; }
  .mb-2 { margin-bottom: ${({ theme }) => theme.spacing.small}; }
  .mb-3 { margin-bottom: ${({ theme }) => theme.spacing.medium}; }
  .mb-4 { margin-bottom: ${({ theme }) => theme.spacing.large}; }

  .p-0 { padding: 0; }
  .p-1 { padding: ${({ theme }) => theme.spacing.tiny}; }
  .p-2 { padding: ${({ theme }) => theme.spacing.small}; }
  .p-3 { padding: ${({ theme }) => theme.spacing.medium}; }
  .p-4 { padding: ${({ theme }) => theme.spacing.large}; }

  /* Responsive hide/show classes */
  .hide-on-mobile {
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: none !important;
    }
  }

  .hide-on-tablet {
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: none !important;
    }
  }

  .show-on-desktop {
    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
      display: none !important;
    }
  }

  /* Add more utility classes as needed for your project */
`;

export default GlobalStyles;