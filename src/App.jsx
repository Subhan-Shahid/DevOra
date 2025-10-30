import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
// framer-motion no longer needed for splash presence
import { initScrollOptimization } from './utils/scrollPerformance';

// Import critical components (above the fold)
import Navbar from './components/Navbar';
import VideoLoader from './components/VideoLoader';

// Lazy load components for code splitting
const Hero = lazy(() => import('./components/Hero'));
const ContinuousSlider = lazy(() => import('./components/ContinuousSlider'));
const Services = lazy(() => import('./components/Services'));
const ContactForm = lazy(() => import('./components/ContactForm'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ThankYou = lazy(() => import('./pages/ThankYou'));

// Import loading skeletons
import { 
  HeroSkeleton, 
  ServicesSkeleton, 
  ContactFormSkeleton, 
  ServiceDetailSkeleton 
} from './components/LoadingSkeletons';

// Theme factory honoring light/dark mode
const createAppTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#818cf8' : '#6366f1',
      light: '#a5b4fc',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: mode === 'dark' ? '#f472b6' : '#ec4899',
      light: '#f9a8d4',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: mode === 'dark' ? '#38bdf8' : '#0ea5e9',
      light: '#7dd3fc',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    background: mode === 'dark'
      ? { default: '#0f172a', paper: '#1e293b' }
      : { default: '#ffffff', paper: '#f8fafc' },
    text: {
      primary: mode === 'dark' ? '#f1f5f9' : '#1e293b',
      secondary: mode === 'dark' ? '#cbd5e1' : '#64748b',
    },
    gradient: {
      primary: mode === 'dark' 
        ? 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)'
        : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      secondary: mode === 'dark'
        ? 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)'
        : 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      tertiary: mode === 'dark'
        ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
        : 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
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
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          contain: 'layout style paint',
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
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
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

// Loading fallback component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      flexDirection: 'column',
      gap: 2
    }}
  >
    <CircularProgress size={50} />
    <Box sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>Loading...</Box>
  </Box>
);

function Home() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></div>}>
        <ContinuousSlider />
      </Suspense>
      <Suspense fallback={<ServicesSkeleton />}>
        <Services />
      </Suspense>
    </>
  );
}

function App() {
  const [mode, setMode] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Hide loader after 5s or when video ends
    return () => clearTimeout(timer);
  }, []);

  // Update body data-theme attribute when mode changes
  useEffect(() => {
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  // Initialize scroll performance optimization
  useEffect(() => {
    const cleanup = initScrollOptimization();
    return cleanup;
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading && <VideoLoader />}
      <div className={`${isLoading ? 'overflow-hidden h-screen' : ''}`}>
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100dvh',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' 
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0e7ff 100%)',
              transition: 'background 0.3s ease',
            }}
          >
            <Navbar mode={mode} onToggleTheme={toggleColorMode} />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/services" 
                  element={
                    <Suspense fallback={<ServicesSkeleton />}>
                      <Services />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/services/:slug" 
                  element={
                    <Suspense fallback={<ServiceDetailSkeleton />}>
                      <ServiceDetail />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <Suspense fallback={<ContactFormSkeleton />}>
                      <ContactForm />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/thank-you" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <ThankYou />
                    </Suspense>
                  } 
                />
                <Route 
                  path="/not-found" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <NotFound />
                    </Suspense>
                  } 
                />
                <Route 
                  path="*" 
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <NotFound />
                    </Suspense>
                  } 
                />
              </Routes>
            </Box>
            <Suspense fallback={null}>
              <Footer />
              <ScrollToTop />
            </Suspense>
          </Box>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
