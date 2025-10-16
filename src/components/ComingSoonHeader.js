import React, { useState } from 'react';
import { Box, Typography, Container, Chip, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MdRocket, MdNotifications } from 'react-icons/md';

const ComingSoonHeader = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Box
            sx={{
              position: 'relative',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              color: '#fff',
              py: { xs: 2, md: 3 },
              overflow: 'hidden',
              zIndex: 1000,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                animation: 'shimmer 3s ease-in-out infinite',
              }
            }}
          >
            <Container maxWidth="lg">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {/* Main message */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <MdRocket style={{ fontSize: '2rem', color: '#fff' }} />
                  </motion.div>
                  
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        mb: 0.5,
                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      🚀 We Are Coming Soon!
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.9,
                        fontSize: { xs: '0.85rem', md: '1rem' },
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                      }}
                    >
                      Get ready for an amazing digital experience
                    </Typography>
                  </Box>
                </Box>

                {/* Right side - Action items */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    icon={<MdNotifications />}
                    label="Notify Me"
                    variant="outlined"
                    clickable
                    sx={{
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.5)',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.2)',
                        borderColor: '#fff',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                      fontWeight: 600
                    }}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      fontSize: '1.2rem',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ×
                  </motion.button>
                </Box>
              </Box>

            </Container>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComingSoonHeader;
