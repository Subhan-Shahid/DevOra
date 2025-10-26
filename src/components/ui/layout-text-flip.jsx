import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        color: 'white',
        textShadow: '0 0 30px rgba(255,255,255,0.3)',
        background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {text}
      </span>

      <motion.div
        style={{
          position: 'relative',
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
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
