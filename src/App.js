import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline, Box } from '@mui/material';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';

// Pages
import Home from './pages/Home';
import Library from './pages/Library';
import Quiz from './pages/Quiz';
import Explore from './pages/Explore';
import Course from './pages/Course';
import Instructor from './pages/Instructor';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Login from './pages/Login';

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/signup"
            element={
              <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                <Signup />
              </Box>
            }
          />
          <Route
            path="/login"
            element={
              <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                <Login />
              </Box>
            }
          />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/course/:id" element={<Course />} />
                  <Route path="/instructor/:name" element={<Instructor />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;