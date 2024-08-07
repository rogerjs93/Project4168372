import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header, Footer, Sidebar } from './components';
import { Home, About, Services, Contact, Register } from './pages';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { GlobalStyles, theme } from './styles';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainWrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

const ContentWrapper = styled.main`
  flex: 1;
  margin-left: ${({ isSidebarCollapsed }) => isSidebarCollapsed ? '50px' : '250px'};
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px); // Adjust this value based on your header height
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.large};
  overflow-y: auto;
`;

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <GlobalStyles />
        <Router>
          <AppWrapper>
            <Header />
            <MainWrapper>
              <Sidebar
                isCollapsed={isSidebarCollapsed}
                onCollapse={setIsSidebarCollapsed}
              />
              <ContentWrapper isSidebarCollapsed={isSidebarCollapsed}>
                <ContentArea>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </ContentArea>
              </ContentWrapper>
            </MainWrapper>
            <Footer />
          </AppWrapper>
        </Router>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;