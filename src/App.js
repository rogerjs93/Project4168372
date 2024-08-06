import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/services" component={Services} />
                <Route path="/contact" component={Contact} />
              </Switch>
            </ContentArea>
          </MainContent>
          <Footer />
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;