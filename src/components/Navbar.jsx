import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Container, Box, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Button, Divider, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { CgMenu, CgClose } from 'react-icons/cg';
import { HiHome, HiCube, HiUser, HiSparkles } from 'react-icons/hi';

// Floating Pill NavItem
const PillNavItem = ({ to, label, icon: Icon, isActive, mode }) => {
  return (
    <Box
      component={Link}
      to={to}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        px: 3,
        py: 1.5,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        outline: 'none',
        border: 'none',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
        '&:focus': {
          outline: 'none',
        }
      }}
    >
      {/* Icon with circular background when active */}
      <Box
        component={motion.div}
        animate={{
          scale: isActive ? 1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 0.5,
          background: isActive
            ? (mode === 'dark'
              ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
              : 'linear-gradient(135deg, #2563eb, #1e40af)')
            : 'transparent',
          boxShadow: isActive
            ? (mode === 'dark'
              ? '0 8px 32px rgba(59, 130, 246, 0.5)'
              : '0 8px 32px rgba(30, 64, 175, 0.4)')
            : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Box
          sx={{
            fontSize: '1.5rem',
            color: isActive
              ? '#ffffff'
              : (mode === 'dark' ? '#94a3b8' : '#64748b'),
            transition: 'color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon />
        </Box>
      </Box>

      {/* Label */}
      <Box
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: isActive
            ? (mode === 'dark' ? '#60a5fa' : '#2563eb')
            : (mode === 'dark' ? '#94a3b8' : '#64748b'),
          transition: 'color 0.3s ease',
          textTransform: 'capitalize',
        }}
      >
        {label}
      </Box>
    </Box>
  );
};

// Mobile NavItem - matches desktop style
const MobileNavItem = ({ to, label, icon: Icon, onClick, isActive = false, mode }) => (
  <Box
    component={Link}
    to={to}
    onClick={onClick}
    sx={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      flex: 1,
      py: 1.5,
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      outline: 'none',
      border: 'none',
      '&:focus': {
        outline: 'none',
      }
    }}
  >
    {/* Icon with circular background when active */}
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 0.5,
        background: isActive
          ? (mode === 'dark'
            ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
            : 'linear-gradient(135deg, #6366f1, #8b5cf6)')
          : 'transparent',
        boxShadow: isActive
          ? (mode === 'dark'
            ? '0 8px 32px rgba(139, 92, 246, 0.5)'
            : '0 8px 32px rgba(99, 102, 241, 0.4)')
          : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Box
        sx={{
          fontSize: '1.3rem',
          color: isActive
            ? '#ffffff'
            : (mode === 'dark' ? '#94a3b8' : '#64748b'),
          transition: 'color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon />
      </Box>
    </Box>

    {/* Label */}
    <Box
      sx={{
        fontSize: '0.7rem',
        fontWeight: 600,
        color: isActive
          ? (mode === 'dark' ? '#a78bfa' : '#8b5cf6')
          : (mode === 'dark' ? '#94a3b8' : '#64748b'),
        transition: 'color 0.3s ease',
        textTransform: 'capitalize',
      }}
    >
      {label}
    </Box>
  </Box>
);

const Navbar = ({ mode = 'light', onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(prev => (prev !== isScrolled ? isScrolled : prev));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { to: '/', label: 'Home', icon: HiHome },
    { to: '/#showcase', label: 'Showcase', icon: HiSparkles },
    { to: '/#tech', label: 'Tech', icon: HiSparkles },
    { to: '/#services', label: 'Overview', icon: HiCube },
    { to: '/services', label: 'Services', icon: HiCube },
    { to: '/contact', label: 'Contact', icon: HiUser }
  ];

  const isNavActive = (to) => {
    if (to === '/') {
      return location.pathname === '/' && !location.hash;
    }

    if (to.startsWith('/#')) {
      const expectedHash = to.slice(1);
      return location.pathname === '/' && location.hash === expectedHash;
    }

    if (to === '/services') {
      return location.pathname.startsWith('/services');
    }

    return location.pathname === to;
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: { xs: 0, md: 24 },
          left: { xs: 0, md: '50%' },
          right: { xs: 0, md: 'auto' },
          transform: { xs: 'none', md: 'translateX(-50%)' },
          width: { xs: '100%', md: '90%', lg: '1200px' },
          maxWidth: '100%',
          zIndex: 1300,
          background: 'transparent',
          boxShadow: 'none',
          px: { xs: 2, md: 0 },
          py: { xs: 1.5, md: 0 },
        }}
      >
        <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', px: 0 }}>
          {!isMobile ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: mode === 'dark'
                  ? 'rgba(30, 41, 59, 0.9)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '24px',
                padding: '12px 32px',
                boxShadow: mode === 'dark'
                  ? '0 10px 40px rgba(0, 0, 0, 0.4)'
                  : '0 10px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                border: mode === 'dark'
                  ? '1px solid rgba(148, 163, 184, 0.1)'
                  : '1px solid rgba(226, 232, 240, 0.8)',
              }}
            >
              {/* Logo */}
              {/* Logo */}
              <Box
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  mr: 4,
                  display: 'flex',
                  alignItems: 'center',
                  color: mode === 'dark' ? '#f8fafc' : '#0f172a',
                }}
              >
                <span style={{ color: mode === 'dark' ? '#3b82f6' : '#2563eb' }}>D</span>
                ev
                <span style={{ color: mode === 'dark' ? '#3b82f6' : '#2563eb' }}>O</span>
                ra
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <PillNavItem
                    key={item.to}
                    to={item.to}
                    label={item.label}
                    icon={item.icon}
                    isActive={isNavActive(item.to)}
                    mode={mode}
                  />
                ))}
              </Box>

              {/* Theme Toggle */}
              <Box sx={{ ml: 1, pl: 1, borderLeft: mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid rgba(148, 163, 184, 0.15)' }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    onClick={onToggleTheme}
                    sx={{
                      color: mode === 'dark' ? '#94a3b8' : '#64748b',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: mode === 'dark' ? '#f8fafc' : '#0f172a',
                        background: mode === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                      }
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={mode}
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {mode === 'dark' ? <BsSun size={20} /> : <BsMoon size={20} />}
                      </motion.div>
                    </AnimatePresence>
                  </IconButton>
                </motion.div>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: mode === 'dark'
                  ? 'rgba(30, 41, 59, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderRadius: '50px',
                padding: '12px 20px',
                boxShadow: mode === 'dark'
                  ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                  : '0 8px 32px rgba(0, 0, 0, 0.12)',
              }}
            >
              <Box sx={{ fontWeight: 900, fontSize: '1.2rem', color: mode === 'dark' ? '#f8fafc' : '#0f172a' }}>
                <span style={{ color: mode === 'dark' ? '#3b82f6' : '#2563eb' }}>D</span>
                ev
                <span style={{ color: mode === 'dark' ? '#3b82f6' : '#2563eb' }}>O</span>
                ra
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={onToggleTheme} sx={{ color: mode === 'dark' ? '#94a3b8' : '#64748b' }}>
                  {mode === 'dark' ? <BsSun size={20} /> : <BsMoon size={20} />}
                </IconButton>
                <IconButton onClick={handleDrawerToggle} sx={{ color: mode === 'dark' ? '#94a3b8' : '#64748b' }}>
                  {mobileOpen ? <CgClose size={22} /> : <CgMenu size={22} />}
                </IconButton>
              </Box>
            </Box>
          )}
        </Container>
      </AppBar>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: 80,
              left: 16,
              right: 16,
              zIndex: 1200,
            }}
          >
            <Box
              sx={{
                background: mode === 'dark'
                  ? 'rgba(30, 41, 59, 0.98)'
                  : 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                borderRadius: '24px',
                padding: '16px',
                boxShadow: mode === 'dark'
                  ? '0 20px 60px rgba(0, 0, 0, 0.6)'
                  : '0 20px 60px rgba(0, 0, 0, 0.15)',
                border: mode === 'dark'
                  ? '1px solid rgba(148, 163, 184, 0.1)'
                  : '1px solid rgba(148, 163, 184, 0.1)',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 2,
                }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <MobileNavItem
                      to={item.to}
                      label={item.label}
                      icon={item.icon}
                      onClick={handleDrawerToggle}
                      isActive={isNavActive(item.to)}
                      mode={mode}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <Box sx={{ height: { xs: 80, md: 100 } }} />
    </>
  );
};

export default Navbar;
