import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box, useMediaQuery, useTheme, Divider, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { CgMenu, CgClose } from 'react-icons/cg';
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

const MobileNavItem = ({ to, children, icon: Icon, onClick, isActive = false }) => (
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
          background: isActive ? 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(37,99,235,0.15))' : 'transparent',
          border: isActive ? '1px solid rgba(59,130,246,0.35)' : '1px solid transparent',
          boxShadow: isActive ? '0 8px 24px rgba(37,99,235,0.25)' : 'none',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(14,165,233,0.18), rgba(37,99,235,0.18))',
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
                <img
                  src={`${process.env.PUBLIC_URL}/DevOra.png`}
                  alt="DevOra logo"
                  style={{
                    height: '32px',
                    width: '32px',
                    marginRight: '12px',
                    borderRadius: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
                  DevOra
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
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      onClick={onToggleTheme}
                      sx={{
                        ml: 0.5,
                        color: 'white',
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          background: 'rgba(255,255,255,0.2)',
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
              backdropFilter: 'blur(4px)'
            }
          }
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 320,
            background: 'linear-gradient(180deg, #0b1220 0%, #0e1a2f 100%)',
            color: 'rgba(255,255,255,0.9)',
            borderLeft: '1px solid rgba(37, 99, 235, 0.25)',
            boxShadow: '0 10px 40px rgba(2,6,23,0.5)',
            backdropFilter: 'blur(8px)'
          },
        }}
      >
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Box sx={{ p: 2.5, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`${process.env.PUBLIC_URL}/DevOra.png`}
                alt="DevOra logo"
                style={{ height: '28px', width: '28px', marginRight: '10px', borderRadius: '6px' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'rgba(255,255,255,0.95)' }}>
                DevOra
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.08)', '&:hover': { background: 'rgba(255,255,255,0.15)', transform: 'rotate(90deg)' } }}
                aria-label="Close menu"
              >
                <CgClose size={22} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ px: 3, py: 2, color: 'rgba(255,255,255,0.75)' }}>
            <Typography variant="body2">Digital Innovation Hub</Typography>
          </Box>
          <Divider sx={{ opacity: 0.12, borderColor: 'rgba(255,255,255,0.12)' }} />
          
          <List sx={{ pt: 1 }}>
            {navItems.map((item) => (
              <MobileNavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                onClick={handleDrawerToggle}
                isActive={location.pathname === item.to}
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
                background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 28px rgba(37, 99, 235, 0.45)'
                }
              }}
            >
              Get Started
            </Button>
            <Divider sx={{ my: 3, opacity: 0.12, borderColor: 'rgba(255,255,255,0.12)' }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
              <IconButton href={process.env.REACT_APP_FACEBOOK_URL || '#'} target="_blank" rel="noopener noreferrer" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }} aria-label="Facebook">
                <FaFacebookF />
              </IconButton>
              <IconButton href={process.env.REACT_APP_TWITTER_URL || '#'} target="_blank" rel="noopener noreferrer" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }} aria-label="Twitter">
                <FaTwitter />
              </IconButton>
              <IconButton href={process.env.REACT_APP_LINKEDIN_URL || '#'} target="_blank" rel="noopener noreferrer" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }} aria-label="LinkedIn">
                <FaLinkedinIn />
              </IconButton>
              <IconButton href={process.env.REACT_APP_INSTAGRAM_URL || '#'} target="_blank" rel="noopener noreferrer" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }} aria-label="Instagram">
                <FaInstagram />
              </IconButton>
              <IconButton href={process.env.REACT_APP_GITHUB_URL || '#'} target="_blank" rel="noopener noreferrer" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }} aria-label="GitHub">
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
