import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      setIsVisible(y > 300);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once to set initial state
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Zoom in={isVisible}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 1000
        }}
      >
        <Fab
          onClick={scrollToTop}
          size="medium"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
            width: { xs: 48, md: 56 },
            height: { xs: 48, md: 56 },
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
              transform: 'translateY(-3px)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          <FaArrowUp />
        </Fab>
      </motion.div>
    </Zoom>
  );
};

export default ScrollToTop;

