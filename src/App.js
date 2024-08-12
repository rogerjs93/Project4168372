import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from './components';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { Home, About, Services, Contact, Register, Games, Community, Support } from './pages';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import NewsFeed from './components/NewsFeed';
import AISummarizer from './components/AISummarizer';
import Friends from './pages/Friends';
import Groups from './pages/Groups';
import Events from './pages/Events';
import Memories from './pages/Memories';
import Saved from './pages/Saved';
import Watch from './pages/Watch';
import { GlobalStyles, theme } from './styles';
import { AuthProvider } from './AuthContext';
import NotificationCenter from './components/NotificationCenter';

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
  min-height: calc(100vh - 60px); // Adjust this value based on your header height
  overflow-y: auto;
  overflow-x: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 100%;
`;

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
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/feed" element={<NewsFeed />} />
                      <Route path="/games" element={<Games />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/notifications" element={<NotificationCenter />} />
                      
                      {/* Left Sidebar Routes */}
                      <Route path="/friends" element={<Friends />} />
                      <Route path="/groups" element={<Groups />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/memories" element={<Memories />} />
                      <Route path="/saved" element={<Saved />} />
                      <Route path="/ai-summarizer" element={<AISummarizer />} />
                      <Route path="/watch" element={<Watch />} />
                      
                      {/* Right Sidebar Routes */}
                      <Route path="/my-games" element={<div>My Games Page</div>} />
                      <Route path="/discover-games" element={<div>Discover Games Page</div>} />
                      <Route path="/game-challenges" element={<div>Game Challenges Page</div>} />
                      <Route path="/leaderboards" element={<div>Leaderboards Page</div>} />
                      <Route path="/game-tournaments" element={<div>Game Tournaments Page</div>} />
                      <Route path="/game-communities" element={<div>Game Communities Page</div>} />
                      <Route path="/global-chat" element={<div>Global Chat Page</div>} />
                      <Route path="/game-collectibles" element={<div>Game Collectibles Page</div>} />
                    </Routes>
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