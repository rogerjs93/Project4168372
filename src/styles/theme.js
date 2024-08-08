export const theme = {
  colors: {
    primary: '#6200EA',       // Deep purple
    secondary: '#03DAC6',     // Teal
    accent: '#FF6B6B',        // Coral (kept from original)
    background: '#F4F5FA',    // Light grayish blue
    surfaceLight: '#FFFFFF',  // White
    surfaceDark: '#2C2F33',   // Dark gray (kept from original)
    textPrimary: '#333333',   // Dark gray for primary text
    textSecondary: '#757575', // Medium gray for secondary text
    borderColor: '#E0E0E0',   // Light gray for borders
    link: '#3700B3',          // Darker purple for links
    success: '#00C853',       // Green
    warning: '#FFD600',       // Yellow
    error: '#B00020',         // Red
    lightGrey: '#F5F5F5',     // Very light gray
    darkGrey: '#424242',      // Darker gray
    gradient: 'linear-gradient(45deg, #6200EA, #03DAC6)',
  },
  fonts: {
    main: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    headings: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  fontSizes: {
    tiny: '0.75rem',
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
    xxxlarge: '2.5rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  spacing: {
    tiny: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
    xxlarge: '3rem',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    largeDesktop: '1200px',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    full: '9999px',
  },
  boxShadow: {
    small: '0 1px 2px rgba(0, 0, 0, 0.1)',
    medium: '0 2px 4px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
    xlarge: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  transitions: {
    fast: 'all 0.1s ease-in-out',
    medium: 'all 0.2s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },
  animations: {
    fadeIn: '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }',
    slideIn: '@keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }',
  },
};