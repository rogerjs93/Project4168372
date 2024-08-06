import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Header, Footer, Sidebar } from './components';
import { Home, About, Services, Contact } from './pages';
import { GlobalStyles, theme } from './styles';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppWrapper>
          <Header />
          <MainContent>
            <Sidebar />
            <ContentArea>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </ContentArea>
          </MainContent>
          <Footer />
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;