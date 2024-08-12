import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from './components';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import {
  Home, About, Services, Contact, Register, Games, Community, Support,
  Watch, MyGames, DiscoverGames, GameChallenges, Leaderboards,
  GameTournaments, GameCommunities, GlobalChat, GameCollectibles
} from './pages';
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
                      <Route path="/my-games" element={<MyGames />} />
                      <Route path="/discover-games" element={<DiscoverGames />} />
                      <Route path="/game-challenges" element={<GameChallenges />} />
                      <Route path="/leaderboards" element={<Leaderboards />} />
                      <Route path="/game-tournaments" element={<GameTournaments />} />
                      <Route path="/game-communities" element={<GameCommunities />} />
                      <Route path="/global-chat" element={<GlobalChat />} />
                      <Route path="/game-collectibles" element={<GameCollectibles />} />
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