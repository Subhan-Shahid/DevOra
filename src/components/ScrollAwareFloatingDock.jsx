import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedFloatingDock from './EnhancedFloatingDock';

const ScrollAwareFloatingDock = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show dock when scrolling up or at top, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.3 
          }}
          style={{
            position: 'fixed',
            bottom: 20,
            left: 0,
            right: 0,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
          className="w-full"
        >
          <div style={{ pointerEvents: 'auto' }}>
            <EnhancedFloatingDock />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollAwareFloatingDock;
