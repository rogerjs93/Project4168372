import { readableColor, darken, lighten } from 'polished';

const createTheme = (baseTheme) => ({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    textOnPrimary: readableColor(baseTheme.colors.primary),
    textOnSecondary: readableColor(baseTheme.colors.secondary),
    textOnAccent: readableColor(baseTheme.colors.accent),
    textOnSuccess: readableColor(baseTheme.colors.success),
    textOnWarning: readableColor(baseTheme.colors.warning),
    textOnError: readableColor(baseTheme.colors.error),
    primaryHover: darken(0.1, baseTheme.colors.primary),
    secondaryHover: darken(0.1, baseTheme.colors.secondary),
    accentHover: darken(0.1, baseTheme.colors.accent),
  },
});

export const lightTheme = createTheme({
  colors: {
    primary: '#4A148C', // Deep Purple
    primaryLight: '#7C43BD',
    primaryDark: '#12005E',
    secondary: '#00BFA5', // Teal
    secondaryLight: '#5DF2D6',
    secondaryDark: '#008E76',
    accent: '#FF4081', // Pink
    background: '#F5F5F5',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#2C2F33',
    textPrimary: '#212121',
    textSecondary: '#757575',
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#000000',
    borderColor: '#E0E0E0',
    link: '#3700B3',
    linkHover: '#4A148C',
    success: '#00C853',
    successLight: '#69F0AE',
    warning: '#FFD600',
    warningLight: '#FFE57F',
    error: '#D50000',
    errorLight: '#FF8A80',
    lightGrey: '#F5F5F5',
    darkGrey: '#424242',
    gradient: 'linear-gradient(45deg, #4A148C, #00BFA5)',
  },
  fonts: {
    main: "'Roboto', 'Segoe UI', 'Helvetica Neue', sans-serif",
    headings: "'Montserrat', 'Segoe UI', 'Helvetica Neue', sans-serif",
  },
  fontSizes: {
    tiny: '1.2rem',
    small: '1.4rem',
    medium: '1.6rem',
    large: '1.8rem',
    xlarge: '2.4rem',
    xxlarge: '3.2rem',
    xxxlarge: '4.8rem',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
    tight: 1.1,
    loose: 1.8,
  },
  spacing: {
    tiny: '0.4rem',
    small: '0.8rem',
    medium: '1.6rem',
    large: '2.4rem',
    xlarge: '3.2rem',
    xxlarge: '4.8rem',
  },
  breakpoints: {
    mobile: '36em',  // 576px
    tablet: '48em',  // 768px
    desktop: '62em', // 992px
    largeDesktop: '75em', // 1200px
  },
  borderRadius: {
    small: '0.4rem',
    medium: '0.8rem',
    large: '1.2rem',
    full: '9999px',
  },
  boxShadow: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    large: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
    xlarge: '0 15px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05)',
  },
  transitions: {
    fast: 'all 0.1s ease-in-out',
    medium: 'all 0.2s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },
  zIndex: {
    base: 1,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#B39DDB', // Light Purple
    primaryLight: lighten(0.1, '#B39DDB'),
    primaryDark: darken(0.1, '#B39DDB'),
    secondary: '#4DB6AC', // Light Teal
    background: '#121212',
    surfaceLight: '#1E1E1E',
    surfaceDark: '#2C2F33',
    textPrimary: '#E0E0E0',
    textSecondary: '#A0A0A0',
    borderColor: '#333333',
  },
});

export const theme = lightTheme;