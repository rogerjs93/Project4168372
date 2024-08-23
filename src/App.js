import React, { useState, lazy, Suspense, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header, LeftSidebar, RightSidebar } from './components';
import { AuthProvider } from './AuthContext';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './hooks/useAuth';
import { ThemeProvider } from './components/ThemeProvider';
import ToastNotification from './components/ToastNotification';
import { ToastProvider } from './components/ToastProvider';
import { ProfileSettings } from './components';

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
  outline: none;
  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }
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

const LazyRoute = ({ component: Component, ...rest }) => (
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <Component {...rest} />
    </Suspense>
  </ErrorBoundary>
);

export const ToastContext = React.createContext();

function App() {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
    setTimeout(() => removeToast(id), 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, isClosing: true } : toast
      )
    );
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <ToastProvider value={{ addToast, removeToast }}>
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
                    tabIndex="-1"
                    aria-label="Main content"
                  >
                    <ContentArea>
                      <ErrorBoundary>
                        <Routes>
                          {/* Public Routes */}
                          <Route path="/" element={<LazyRoute component={Home} />} />
                          <Route path="/about" element={<LazyRoute component={About} />} />
                          <Route path="/services" element={<LazyRoute component={Services} />} />
                          <Route path="/contact" element={<LazyRoute component={Contact} />} />
                          <Route path="/login" element={<LazyRoute component={Login} />} />
                          <Route path="/register" element={<LazyRoute component={Register} />} />

                          {/* Protected Routes */}
                          <Route path="/dashboard" element={<ProtectedRoute><LazyRoute component={Dashboard} /></ProtectedRoute>} />
                          <Route path="/profile" element={<ProtectedRoute><LazyRoute component={Profile} /></ProtectedRoute>} />
                          <Route path="/settings" element={<ProtectedRoute><LazyRoute component={ProfileSettings} /></ProtectedRoute>} />
                          <Route path="/feed" element={<ProtectedRoute><LazyRoute component={NewsFeed} /></ProtectedRoute>} />
                          <Route path="/games" element={<ProtectedRoute><LazyRoute component={Games} /></ProtectedRoute>} />
                          <Route path="/community" element={<ProtectedRoute><LazyRoute component={Community} /></ProtectedRoute>} />
                          <Route path="/support" element={<ProtectedRoute><LazyRoute component={Support} /></ProtectedRoute>} />
                          <Route path="/notifications" element={<ProtectedRoute><LazyRoute component={NotificationCenter} /></ProtectedRoute>} />
                          
                          {/* Left Sidebar Routes */}
                          <Route path="/friends" element={<ProtectedRoute><LazyRoute component={Friends} /></ProtectedRoute>} />
                          <Route path="/groups" element={<ProtectedRoute><LazyRoute component={Groups} /></ProtectedRoute>} />
                          <Route path="/events" element={<ProtectedRoute><LazyRoute component={Events} /></ProtectedRoute>} />
                          <Route path="/memories" element={<ProtectedRoute><LazyRoute component={Memories} /></ProtectedRoute>} />
                          <Route path="/saved" element={<ProtectedRoute><LazyRoute component={Saved} /></ProtectedRoute>} />
                          <Route path="/ai-summarizer" element={<ProtectedRoute><LazyRoute component={AISummarizer} /></ProtectedRoute>} />
                          <Route path="/watch" element={<ProtectedRoute><LazyRoute component={Watch} /></ProtectedRoute>} />
                          
                          {/* Right Sidebar Routes */}
                          <Route path="/my-games" element={<ProtectedRoute><LazyRoute component={MyGames} /></ProtectedRoute>} />
                          <Route path="/discover-games" element={<ProtectedRoute><LazyRoute component={DiscoverGames} /></ProtectedRoute>} />
                          <Route path="/game-challenges" element={<ProtectedRoute><LazyRoute component={GameChallenges} /></ProtectedRoute>} />
                          <Route path="/leaderboards" element={<ProtectedRoute><LazyRoute component={Leaderboards} /></ProtectedRoute>} />
                          <Route path="/game-tournaments" element={<ProtectedRoute><LazyRoute component={GameTournaments} /></ProtectedRoute>} />
                          <Route path="/game-communities" element={<ProtectedRoute><LazyRoute component={GameCommunities} /></ProtectedRoute>} />
                          <Route path="/global-chat" element={<ProtectedRoute><LazyRoute component={GlobalChat} /></ProtectedRoute>} />
                          <Route path="/game-collectibles" element={<ProtectedRoute><LazyRoute component={GameCollectibles} /></ProtectedRoute>} />
                        </Routes>
                      </ErrorBoundary>
                    </ContentArea>
                  </ContentWrapper>
                  <RightSidebar
                    isCollapsed={isRightSidebarCollapsed}
                    onCollapse={setIsRightSidebarCollapsed}
                  />
                </MainWrapper>
                <ToastNotification toasts={toasts} removeToast={removeToast} />
              </AppWrapper>
            </Router>
          </ToastProvider>
        </AuthProvider>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;