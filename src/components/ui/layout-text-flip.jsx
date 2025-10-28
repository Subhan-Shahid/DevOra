import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '@mui/material/styles';

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      width: '100%'
    }}>
      <span style={{
        fontSize: 'inherit',
        fontWeight: 'bold',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%)'
          : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: theme.palette.mode === 'dark' 
          ? '0 0 30px rgba(241, 245, 249, 0.2)'
          : '0 0 30px rgba(30, 41, 59, 0.15)',
      }}>
        {text}
      </span>

      <motion.div
        style={{
          position: 'relative',
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          borderRadius: '16px',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)'
            : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          border: theme.palette.mode === 'dark'
            ? '2px solid rgba(129, 140, 248, 0.3)'
            : '2px solid rgba(99, 102, 241, 0.2)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 12px 40px rgba(129, 140, 248, 0.4)'
            : '0 12px 40px rgba(99, 102, 241, 0.3)',
          minWidth: '200px',
          textAlign: 'center',
          fontSize: 'inherit',
          fontWeight: 'bold'
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'block',
              color: 'white',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              whiteSpace: 'nowrap'
            }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
