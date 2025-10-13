import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { AnimatePresence } from 'framer-motion';

// Import components
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SplashScreen from './components/SplashScreen';
import ServiceDetail from './pages/ServiceDetail';
import NotFound from './pages/NotFound';
import ThankYou from './pages/ThankYou';

// Theme factory honoring light/dark mode
const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#667eea',
      light: '#8fa7f3',
      dark: '#4a56cc',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f093fb',
      light: '#f3a9fc',
      dark: '#e066f0',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#4facfe',
      light: '#7bc8fe',
      dark: '#2196f3',
      contrastText: '#ffffff',
    },
    background: mode === 'dark'
      ? { default: '#0b0d12', paper: '#121520' }
      : { default: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', paper: 'rgba(255, 255, 255, 0.9)' },
    text: {
      primary: mode === 'dark' ? '#e8eefc' : '#2c3e50',
      secondary: mode === 'dark' ? '#b6c2e2' : '#64748b',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      tertiary: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      lineHeight: 1.6,
    },
    body2: {
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 30,
          padding: '12px 28px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 3s ease infinite',
          '&:hover': {
            background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 45px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 15,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.15)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
            },
          },
        },
      },
    },
  },
});

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Team />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('light');
  const [mounted, setMounted] = useState(false);

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  useEffect(() => {
    // Load saved theme from localStorage
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    }
    // mark mounted to prevent hydration mismatch
    setMounted(true);
  }, []);

  // Update body data-theme attribute when mode changes
  useEffect(() => {
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence mode="wait">
        {loading && (
          <SplashScreen key="splash" onFinish={() => setLoading(false)} />
        )}
        {!loading && (
          <Router key="app">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(135deg, #0b0d12 0%, #1a1d29 50%, #0f1320 100%)' 
                  : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                transition: 'background 0.3s ease',
              }}
            >
              <Navbar mode={mode} onToggleTheme={toggleColorMode} />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/contact" element={<ContactForm />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  <Route path="/not-found" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
              <Footer />
              <ChatWidget />
              <ScrollToTop />
            </Box>
          </Router>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
