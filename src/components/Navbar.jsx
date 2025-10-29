import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useMediaQuery, useTheme, Divider, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { CgMenu, CgClose } from 'react-icons/cg';
import { MdHome, MdBusiness, MdContactMail } from 'react-icons/md';

const NavButton = ({ to, children, icon: Icon, isActive, mode }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Button
      component={Link}
      to={to}
      startIcon={Icon && <Icon />}
      sx={{
        color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
        mx: 1,
        px: 3,
        py: 1.2,
        borderRadius: '30px',
        position: 'relative',
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: isActive 
          ? (mode === 'dark' ? 'rgba(129, 140, 248, 0.15)' : 'rgba(99, 102, 241, 0.1)')
          : 'transparent',
        backdropFilter: isActive ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isActive ? 'blur(20px)' : 'none',
        border: isActive 
          ? (mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.3)' : '1px solid rgba(99, 102, 241, 0.2)')
          : '1px solid transparent',
        boxShadow: isActive 
          ? (mode === 'dark' ? '0 8px 32px rgba(129, 140, 248, 0.2)' : '0 8px 32px rgba(99, 102, 241, 0.15)')
          : 'none',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transition: 'left 0.5s ease',
        },
        '&:hover': {
          background: mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.15)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.4)' : '1px solid rgba(99, 102, 241, 0.3)',
          boxShadow: mode === 'dark' ? '0 12px 40px rgba(129, 140, 248, 0.25)' : '0 12px 40px rgba(99, 102, 241, 0.2)',
          '&::before': {
            left: '100%'
          }
        }
      }}
    >
      {children}
    </Button>
  </motion.div>
);

const MobileNavItem = ({ to, children, icon: Icon, onClick, isActive = false, mode }) => (
  <motion.div
    whileHover={{ x: 10 }}
    whileTap={{ scale: 0.95 }}
  >
    <ListItem disablePadding sx={{ mx: 2, mb: 1 }}>
      <ListItemButton 
        component={Link} 
        to={to} 
        onClick={onClick}
        sx={{
          borderRadius: '14px',
          transition: 'all 0.25s ease',
          color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
          background: isActive 
            ? (mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(99, 102, 241, 0.15))'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))')
            : 'transparent',
          border: isActive 
            ? (mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.35)' : '1px solid rgba(99, 102, 241, 0.25)')
            : '1px solid transparent',
          boxShadow: isActive 
            ? (mode === 'dark' ? '0 8px 24px rgba(129, 140, 248, 0.25)' : '0 8px 24px rgba(99, 102, 241, 0.2)')
            : 'none',
          '&:hover': {
            background: mode === 'dark'
              ? 'linear-gradient(135deg, rgba(129, 140, 248, 0.2), rgba(99, 102, 241, 0.2))'
              : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
            color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
            transform: 'translateX(8px)'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Icon style={{ marginRight: '16px', fontSize: '1.2rem' }} />
          <ListItemText 
            primary={children} 
            primaryTypographyProps={{ 
              fontWeight: 600,
              fontSize: '1.1rem'
            }} 
          />
        </Box>
      </ListItemButton>
    </ListItem>
  </motion.div>
);

const Navbar = ({ mode = 'light', onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  // Collapse navbar to mobile a bit earlier for better responsiveness on mid-size screens
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const isScrolled = window.scrollY > 50;
      // Avoid unnecessary re-renders
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
    // Initialize once on mount
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { to: '/', label: 'Home', icon: MdHome },
    { to: '/services', label: 'Services', icon: MdBusiness },
    { to: '/contact', label: 'Contact', icon: MdContactMail }
  ];

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AppBar 
          position="fixed" 
          sx={{ 
            background: mode === 'dark'
              ? (scrolled ? 'rgba(15, 23, 42, 0.85)' : 'rgba(15, 23, 42, 0.7)')
              : (scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)'),
            backdropFilter: 'saturate(130%) blur(10px)',
            WebkitBackdropFilter: 'saturate(130%) blur(10px)',
            boxShadow: scrolled 
              ? (mode === 'dark' ? '0 6px 18px rgba(0,0,0,0.3)' : '0 6px 18px rgba(0,0,0,0.08)')
              : (mode === 'dark' ? '0 4px 14px rgba(0,0,0,0.2)' : '0 4px 14px rgba(0,0,0,0.05)'),
            border: mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.1)' : '1px solid rgba(99, 102, 241, 0.1)',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
            py: { xs: 0.25, md: 0.75 },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
              opacity: scrolled ? 0.8 : 0.5,
              transition: 'opacity 0.3s ease'
            }
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ py: { xs: 0.5, md: 1 }, px: 2 }}>
              <motion.div
                style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
              >
                <Typography 
                  variant="h5" 
                  component={Link}
                  to="/"
                  sx={{ 
                    fontWeight: 800,
                    color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
                    textDecoration: 'none',
                    textShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.35rem' },
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  <span style={{ color: mode === 'dark' ? '#818cf8' : '#6366f1' }}>D</span>ev<span style={{ color: mode === 'dark' ? '#818cf8' : '#6366f1' }}>O</span>ra
                </Typography>
              </motion.div>

              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {navItems.map((item) => (
                    <NavButton
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      isActive={location.pathname === item.to}
                      mode={mode}
                    >
                      {item.label}
                    </NavButton>
                  ))}
                  {/* Theme toggle */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={onToggleTheme}
                      sx={{
                        ml: 0.5,
                        color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
                        background: mode === 'dark' ? 'rgba(129, 140, 248, 0.15)' : 'rgba(99, 102, 241, 0.1)',
                        border: mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.3)' : '1px solid rgba(99, 102, 241, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          background: mode === 'dark' ? 'rgba(129, 140, 248, 0.25)' : 'rgba(99, 102, 241, 0.2)',
                          transform: 'rotate(180deg)'
                        }
                      }}
                      aria-label="Toggle light/dark mode"
                      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={mode}
                          initial={{ rotate: -180, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 180, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {mode === 'dark' ? <BsSun size={22} /> : <BsMoon size={22} />}
                        </motion.div>
                      </AnimatePresence>
                    </IconButton>
                  </motion.div>
                </Box>
              )}

              {isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} placement="bottom" enterDelay={300} arrow>
                      <IconButton
                        onClick={onToggleTheme}
                        sx={{
                          color: 'white',
                          background: 'rgba(255,255,255,0.12)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(6px)',
                          WebkitBackdropFilter: 'blur(6px)',
                          '&:hover': { 
                            background: 'rgba(255,255,255,0.2)',
                            transform: 'rotate(180deg)'
                          }
                        }}
                        aria-label="Toggle light/dark mode"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={mode}
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 180, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {mode === 'dark' ? <BsSun size={22} /> : <BsMoon size={22} />}
                          </motion.div>
                        </AnimatePresence>
                      </IconButton>
                    </Tooltip>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{
                        color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
                        background: mode === 'dark' ? 'rgba(129, 140, 248, 0.15)' : 'rgba(99, 102, 241, 0.1)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        border: mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.3)' : '1px solid rgba(99, 102, 241, 0.2)',
                        '&:hover': {
                          background: mode === 'dark' ? 'rgba(129, 140, 248, 0.25)' : 'rgba(99, 102, 241, 0.2)',
                          transform: 'rotate(90deg)'
                        }
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={mobileOpen ? 'close' : 'open'}
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {mobileOpen ? <CgClose size={22} /> : <CgMenu size={22} />}
                        </motion.div>
                      </AnimatePresence>
                    </IconButton>
                  </motion.div>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            sx: {
              background: 'rgba(2, 6, 23, 0.6)',
              backdropFilter: 'blur(3px)',
              WebkitBackdropFilter: 'blur(3px)'
            }
          }
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 320,
            background: mode === 'dark'
              ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
              : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            color: mode === 'dark' ? '#f1f5f9' : '#1e293b',
            borderLeft: mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.25)' : '1px solid rgba(99, 102, 241, 0.15)',
            boxShadow: mode === 'dark' ? '0 10px 40px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            contain: 'layout style paint'
          },
        }}
      >
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Box sx={{ p: 2.5, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.1)' : '1px solid rgba(99, 102, 241, 0.1)', position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`/DevOra.png`}
                alt="DevOra logo"
                style={{ height: '28px', width: '28px', marginRight: '10px', borderRadius: '6px' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, color: mode === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                <span style={{ color: mode === 'dark' ? '#818cf8' : '#6366f1' }}>D</span>ev<span style={{ color: mode === 'dark' ? '#818cf8' : '#6366f1' }}>O</span>ra
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ 
                  color: mode === 'dark' ? '#f1f5f9' : '#1e293b', 
                  background: mode === 'dark' ? 'rgba(129, 140, 248, 0.1)' : 'rgba(99, 102, 241, 0.08)', 
                  '&:hover': { 
                    background: mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.15)', 
                    transform: 'rotate(90deg)' 
                  } 
                }}
                aria-label="Close menu"
              >
                <CgClose size={22} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ px: 3, py: 2, color: mode === 'dark' ? '#cbd5e1' : '#64748b' }}>
            <Typography variant="body2">Digital Innovation Hub</Typography>
          </Box>
          <Divider sx={{ opacity: 0.12, borderColor: mode === 'dark' ? 'rgba(129, 140, 248, 0.15)' : 'rgba(99, 102, 241, 0.1)' }} />
          
          <List sx={{ pt: 1 }}>
            {navItems.map((item) => (
              <MobileNavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                onClick={handleDrawerToggle}
                isActive={location.pathname === item.to}
                mode={mode}
              >
                {item.label}
              </MobileNavItem>
            ))}
          </List>

          <Box sx={{ p: 3, mt: 'auto', textAlign: 'center' }}>
            
            <Typography variant="body2" sx={{ color: mode === 'dark' ? '#cbd5e1' : '#64748b', mb: 2 }}>
              Ready to start your project?
            </Typography>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: '25px',
                px: 4,
                py: 1.5,
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)'
                  : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 28px rgba(37, 99, 235, 0.45)'
                }
              }}
            >
              Get Started
            </Button>
            <Divider sx={{ my: 3, opacity: 0.12, borderColor: mode === 'dark' ? 'rgba(129, 140, 248, 0.15)' : 'rgba(99, 102, 241, 0.1)' }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
              <IconButton 
                href={import.meta.env.VITE_FACEBOOK_URL || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  color: mode === 'dark' ? '#f1f5f9' : '#1e293b', 
                  bgcolor: mode === 'dark' ? 'rgba(129, 140, 248, 0.1)' : 'rgba(99, 102, 241, 0.08)', 
                  '&:hover': { bgcolor: mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.15)' } 
                }} 
                aria-label="Facebook">
                <FaFacebookF />
              </IconButton>
              <IconButton 
                href={import.meta.env.VITE_TWITTER_URL || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  color: mode === 'dark' ? '#f1f5f9' : '#1e293b', 
                  bgcolor: mode === 'dark' ? 'rgba(129, 140, 248, 0.1)' : 'rgba(99, 102, 241, 0.08)', 
                  '&:hover': { bgcolor: mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.15)' } 
                }} 
                aria-label="Twitter">
                <FaTwitter />
              </IconButton>
              <IconButton 
                href={import.meta.env.VITE_LINKEDIN_URL || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  color: mode === 'dark' ? '#f1f5f9' : '#1e293b', 
                  bgcolor: mode === 'dark' ? 'rgba(129, 140, 248, 0.1)' : 'rgba(99, 102, 241, 0.08)', 
                  '&:hover': { bgcolor: mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.15)' } 
                }} 
                aria-label="LinkedIn">
                <FaLinkedinIn />
              </IconButton>
              <IconButton 
                href={import.meta.env.VITE_INSTAGRAM_URL || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  color: mode === 'dark' ? '#f1f5f9' : '#1e293b', 
                  bgcolor: mode === 'dark' ? 'rgba(129, 140, 248, 0.1)' : 'rgba(99, 102, 241, 0.08)', 
                  '&:hover': { bgcolor: mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.15)' } 
                }} 
                aria-label="Instagram">
                <FaInstagram />
              </IconButton>
              <IconButton 
                href={import.meta.env.VITE_GITHUB_URL || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  color: mode === 'dark' ? '#f1f5f9' : '#1e293b', 
                  bgcolor: mode === 'dark' ? 'rgba(129, 140, 248, 0.1)' : 'rgba(99, 102, 241, 0.08)', 
                  '&:hover': { bgcolor: mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.15)' } 
                }} 
                aria-label="GitHub">
                <FaGithub />
              </IconButton>
            </Box>
          </Box>
        </motion.div>
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;
