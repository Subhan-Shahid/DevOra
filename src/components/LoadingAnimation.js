import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingAnimation = ({ isVisible }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 }
    }
  };

  const logoVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const ringSpinSlow = {
    animate: {
      rotate: 360,
      transition: { duration: 3.5, ease: 'linear', repeat: Infinity }
    }
  };

  const ringSpinFast = {
    animate: {
      rotate: -360,
      transition: { duration: 2.2, ease: 'linear', repeat: Infinity }
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
        background: 'linear-gradient(135deg, #0f1320 0%, #141a2a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        flexDirection: 'column'
      }}
    >
      {/* Logo + animated rings (increased size to 340px) */}
      <motion.div variants={logoVariants} style={{ position: 'relative', width: 340, height: 340, marginBottom: 22 }}>
        {/* Outer rotating ring */}
        <motion.div
          variants={ringSpinSlow}
          animate="animate"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            borderTop: '4px solid rgba(255,255,255,0.85)',
            borderRight: '4px solid rgba(255,255,255,0.15)',
            borderBottom: '4px solid rgba(255,255,255,0.15)',
            borderLeft: '4px solid rgba(255,255,255,0.15)',
            boxShadow: '0 0 60px rgba(102,126,234,0.25)'
          }}
        />

        {/* Inner rotating ring */}
        <motion.div
          variants={ringSpinFast}
          animate="animate"
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            borderRadius: '50%',
            borderTop: '3px solid rgba(240,147,251,0.8)',
            borderRight: '3px solid rgba(255,255,255,0.08)',
            borderBottom: '3px solid rgba(255,255,255,0.08)',
            borderLeft: '3px solid rgba(79,172,254,0.8)',
            filter: 'drop-shadow(0 0 16px rgba(79,172,254,0.3))'
          }}
        />

        {/* Center logo */}
        <motion.img
          src={`${process.env.PUBLIC_URL}/DevOra.png`}
          alt="DevOra logo"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 220,
            height: 220,
            objectFit: 'cover',
            borderRadius: 16,
            boxShadow: '0 14px 40px rgba(0,0,0,0.35), 0 0 40px rgba(102,126,234,0.35)'
          }}
          initial={{ scale: 0.95, opacity: 0.9 }}
          animate={{
            scale: [0.95, 1, 0.98, 1],
            opacity: [0.9, 1, 1, 0.95],
            transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
      </motion.div>

      {/* Branding text */}
      <motion.div
        variants={logoVariants}
        animate={{
          y: [0, -2, 0],
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'rgba(255,255,255,0.95)',
            fontWeight: 800,
            letterSpacing: 1,
            textShadow: '0 2px 10px rgba(0,0,0,0.35)',
            fontSize: { xs: 28, sm: 32, md: 40 }
          }}
        >
          <span style={{ color: '#2563eb' }}>D</span>
          <span>ev</span>
          <span style={{ color: '#2563eb' }}>O</span>
          <span>ra</span>
        </Typography>
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation;
