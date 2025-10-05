import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useMediaQuery, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaBars, FaTimes } from 'react-icons/fa';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { MdHome, MdBusiness, MdContactMail } from 'react-icons/md';

const NavButton = ({ to, children, icon: Icon, isActive }) => (
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
        color: 'white',
        mx: 1,
        px: 3,
        py: 1.2,
        borderRadius: '30px',
        position: 'relative',
        fontWeight: 700,
        fontSize: '1rem',
        textTransform: 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: isActive ? 'rgba(255,255,255,0.25)' : 'transparent',
        backdropFilter: isActive ? 'blur(20px)' : 'none',
        border: isActive ? '1px solid rgba(255,255,255,0.4)' : '1px solid transparent',
        boxShadow: isActive ? '0 8px 32px rgba(0,0,0,0.1)' : 'none',
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
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.4)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
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

const MobileNavItem = ({ to, children, icon: Icon, onClick }) => (
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
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
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
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
            background: scrolled 
              ? 'rgba(15, 15, 20, 0.8)'
              : 'rgba(15, 15, 20, 0.6)',
            backdropFilter: 'saturate(130%) blur(10px)',
            boxShadow: scrolled 
              ? '0 6px 18px rgba(0,0,0,0.25)'
              : '0 4px 14px rgba(0,0,0,0.18)',
            border: '1px solid rgba(255,255,255,0.06)',
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
                <FaRocket 
                  style={{ 
                    fontSize: '2rem', 
                    marginRight: '12px', 
                    color: '#ffd700',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }} 
                />
                <Typography 
                  variant="h5" 
                  component={Link}
                  to="/"
                  sx={{ 
                    fontWeight: 800,
                    color: '#ffffff',
                    textDecoration: 'none',
                    textShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    fontSize: { xs: '1.15rem', sm: '1.25rem', md: '1.35rem' },
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  DevSolutions
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
                    >
                      {item.label}
                    </NavButton>
                  ))}
                  {/* Theme toggle */}
                  <IconButton
                    onClick={onToggleTheme}
                    sx={{
                      ml: 0.5,
                      color: 'white',
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      '&:hover': { background: 'rgba(255,255,255,0.2)' }
                    }}
                    aria-label="Toggle light/dark mode"
                    title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {mode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
                  </IconButton>
                </Box>
              )}

              {isMobile && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.2)',
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
                        {mobileOpen ? <FaTimes /> : <FaBars />}
                      </motion.div>
                    </AnimatePresence>
                  </IconButton>
                </motion.div>
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
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            background: 'linear-gradient(180deg, #0f1320 0%, #141a2a 100%)',
            borderLeft: '1px solid rgba(102, 126, 234, 0.15)',
            color: 'rgba(255,255,255,0.9)'
          },
        }}
      >
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <FaRocket style={{ fontSize: '1.5rem', marginRight: '8px', color: '#ffd700' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.95)' }}>
                DevSolutions
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Digital Innovation Hub
            </Typography>
          </Box>
          
          <List sx={{ pt: 2 }}>
            {navItems.map((item) => (
              <MobileNavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                onClick={handleDrawerToggle}
              >
                {item.label}
              </MobileNavItem>
            ))}
          </List>

          <Box sx={{ p: 3, mt: 'auto', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                }
              }}
            >
              Get Started
            </Button>
          </Box>
        </motion.div>
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;
