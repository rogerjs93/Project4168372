import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header, LeftSidebar, RightSidebar } from './components';
import { GlobalStyles, theme } from './styles';
import { AuthProvider, useAuth } from './AuthContext';
import Loading from './components/Loading';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Register = lazy(() => import('./components/Register'));
const Games = lazy(() => import('./pages/Games'));
const Community = lazy(() => import('./pages/Community'));
const Support = lazy(() => import('./pages/Support'));
const Watch = lazy(() => import('./pages/Watch'));
const MyGames = lazy(() => import('./pages/MyGames'));
const DiscoverGames = lazy(() => import('./pages/DiscoverGames'));
const GameChallenges = lazy(() => import('./pages/GameChallenges'));
const Leaderboards = lazy(() => import('./pages/Leaderboards'));
const GameTournaments = lazy(() => import('./pages/GameTournaments'));
const GameCommunities = lazy(() => import('./pages/GameCommunities'));
const GlobalChat = lazy(() => import('./pages/GlobalChat'));
const GameCollectibles = lazy(() => import('./pages/GameCollectibles'));
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));
const NewsFeed = lazy(() => import('./components/NewsFeed'));
const AISummarizer = lazy(() => import('./components/AISummarizer'));
const Friends = lazy(() => import('./pages/Friends'));
const Groups = lazy(() => import('./pages/Groups'));
const Events = lazy(() => import('./pages/Events'));
const Memories = lazy(() => import('./pages/Memories'));
const Saved = lazy(() => import('./pages/Saved'));
const NotificationCenter = lazy(() => import('./components/NotificationCenter'));

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const ContentWrapper = styled.main`
  flex: 1;
  margin-left: ${({ isLeftSidebarCollapsed }) => isLeftSidebarCollapsed ? '85px' : '250px'};
  margin-right: ${({ isRightSidebarCollapsed }) => isRightSidebarCollapsed ? '85px' : '250px'};
  transition: margin 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 100%;
`;

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <GlobalStyles />
          <Router>
            <AppWrapper>
              <Header />
              <MainWrapper>
                <LeftSidebar
                  isCollapsed={isLeftSidebarCollapsed}
                  onCollapse={setIsLeftSidebarCollapsed}
                />
                <ContentWrapper
                  isLeftSidebarCollapsed={isLeftSidebarCollapsed}
                  isRightSidebarCollapsed={isRightSidebarCollapsed}
                >
                  <ContentArea>
                    <Suspense fallback={<Loading />}>
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/feed" element={<ProtectedRoute><NewsFeed /></ProtectedRoute>} />
                        <Route path="/games" element={<ProtectedRoute><Games /></ProtectedRoute>} />
                        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
                        <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
                        <Route path="/notifications" element={<ProtectedRoute><NotificationCenter /></ProtectedRoute>} />
                        
                        {/* Left Sidebar Routes */}
                        <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
                        <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
                        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                        <Route path="/memories" element={<ProtectedRoute><Memories /></ProtectedRoute>} />
                        <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
                        <Route path="/ai-summarizer" element={<ProtectedRoute><AISummarizer /></ProtectedRoute>} />
                        <Route path="/watch" element={<ProtectedRoute><Watch /></ProtectedRoute>} />
                        
                        {/* Right Sidebar Routes */}
                        <Route path="/my-games" element={<ProtectedRoute><MyGames /></ProtectedRoute>} />
                        <Route path="/discover-games" element={<ProtectedRoute><DiscoverGames /></ProtectedRoute>} />
                        <Route path="/game-challenges" element={<ProtectedRoute><GameChallenges /></ProtectedRoute>} />
                        <Route path="/leaderboards" element={<ProtectedRoute><Leaderboards /></ProtectedRoute>} />
                        <Route path="/game-tournaments" element={<ProtectedRoute><GameTournaments /></ProtectedRoute>} />
                        <Route path="/game-communities" element={<ProtectedRoute><GameCommunities /></ProtectedRoute>} />
                        <Route path="/global-chat" element={<ProtectedRoute><GlobalChat /></ProtectedRoute>} />
                        <Route path="/game-collectibles" element={<ProtectedRoute><GameCollectibles /></ProtectedRoute>} />
                      </Routes>
                    </Suspense>
                  </ContentArea>
                </ContentWrapper>
                <RightSidebar
                  isCollapsed={isRightSidebarCollapsed}
                  onCollapse={setIsRightSidebarCollapsed}
                />
              </MainWrapper>
            </AppWrapper>
          </Router>
        </AuthProvider>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;