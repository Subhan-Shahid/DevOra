import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaMobile } from 'react-icons/fa';

const LoadingAnimation = ({ isVisible }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 }
    }
  };

  const iconVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          mb: 4,
          alignItems: 'center'
        }}
      >
        <motion.div variants={iconVariants} animate="pulse" custom={pulseVariants}>
          <FaCode size={40} color="white" />
        </motion.div>
        <motion.div 
          variants={iconVariants} 
          animate="pulse" 
          custom={pulseVariants}
          style={{ animationDelay: '0.3s' }}
        >
          <FaRocket size={40} color="white" />
        </motion.div>
        <motion.div 
          variants={iconVariants} 
          animate="pulse" 
          custom={pulseVariants}
          style={{ animationDelay: '0.6s' }}
        >
          <FaMobile size={40} color="white" />
        </motion.div>
      </Box>

      <motion.div
        variants={iconVariants}
        animate={{
          scale: [1, 1.05, 1],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            background: 'linear-gradient(45deg, #fff, #f0f0f0)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Loading Amazing Experience...
        </Typography>
      </motion.div>

      {/* Loading bar */}
      <Box
        sx={{
          width: '200px',
          height: '4px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '2px',
          mt: 3,
          overflow: 'hidden'
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #fff, #f0f0f0)',
            borderRadius: '2px'
          }}
          animate={{
            x: ['-100%', '100%'],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      </Box>
    </motion.div>
  );
};

export default LoadingAnimation;
