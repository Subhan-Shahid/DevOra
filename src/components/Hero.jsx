import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Chip, useTheme, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaCode, FaRocket, FaMobile, FaStar, FaHeart, FaLightbulb, FaGem, FaMagic } from 'react-icons/fa';
import { MdAutoAwesome, MdRocketLaunch, MdTrendingUp } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ParticleBackground from './ParticleBackground';

const FloatingIcon = React.memo(({ icon: Icon, delay, x, y, color = '#1976d2', disabled = false, position = {} }) => (
  disabled ? null : (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ 
        opacity: [0.4, 0.8, 0.4], 
        scale: [1, 1.3, 1],
        x: [0, x, 0],
        y: [0, y, 0],
        rotate: [0, 360, 0]
      }}
      transition={{ 
        duration: 8, 
        delay, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{
        scale: 1.5,
        rotate: 180,
        transition: { duration: 0.3 }
      }}
      style={{
        position: 'absolute',
        color,
        fontSize: '2.5rem',
        zIndex: 1,
        filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
        cursor: 'pointer',
        willChange: 'transform',
        ...position
      }}
    >
      <Icon />
    </motion.div>
  )
));

const GlassmorphismCard = ({ children, delay = 0, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ 
      scale: 1.08,
      y: -12,
      rotate: [0, -2, 2, 0],
      transition: { duration: 0.4 }
    }}
    style={{
      background: theme?.palette.mode === 'dark'
        ? 'rgba(30, 41, 59, 0.6)'
        : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
      contain: 'layout style paint',
      willChange: 'transform',
      borderRadius: '24px',
      border: theme?.palette.mode === 'dark'
        ? '2px solid rgba(129, 140, 248, 0.3)'
        : '2px solid rgba(99, 102, 241, 0.2)',
      padding: '24px',
      boxShadow: theme?.palette.mode === 'dark'
        ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(129, 140, 248, 0.1)'
        : '0 20px 60px rgba(99, 102, 241, 0.15), 0 8px 32px rgba(0, 0, 0, 0.08)'
    }}
  >
    {children}
  </motion.div>
);

const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {count}{suffix}
    </motion.span>
  );
};

const Hero = () => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isSmall = typeof window !== 'undefined' ? window.innerWidth < 600 : false;
  const disableDecor = prefersReducedMotion || isSmall;
  useEffect(() => {
    if (!disableDecor) {
      AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
      });
    }
    return () => {};
  }, [disableDecor]);

  return (
    <Box 
      sx={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 8, md: 10 },
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 30%, #e0e7ff 70%, #fae8ff 100%)',
        transition: 'background 0.5s ease',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'dark' 
            ? `
              radial-gradient(circle at 20% 80%, rgba(129, 140, 248, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(244, 114, 182, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 60%)
            `
            : `
              radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 60%)
            `,
          zIndex: 1,
          animation: 'gradientShift 15s ease infinite'
        },
      }}
    >
      {/* Particle Background */}
      {!disableDecor && <ParticleBackground />}
      
      {/* Decorative floating icons with proper positioning */}
      <FloatingIcon 
        icon={FaCode} 
        delay={0} 
        x={20} 
        y={-15} 
        color="#64b5f6" 
        disabled={disableDecor}
        position={{ top: '15%', left: '8%' }}
      />
      <FloatingIcon 
        icon={FaRocket} 
        delay={1} 
        x={-18} 
        y={12} 
        color="#22d3ee" 
        disabled={disableDecor}
        position={{ top: '25%', right: '10%' }}
      />
      <FloatingIcon 
        icon={FaMobile} 
        delay={2} 
        x={15} 
        y={-18} 
        color="#4fc3f7" 
        disabled={disableDecor}
        position={{ bottom: '20%', left: '12%' }}
      />
      {/* Additional icons - hidden on mobile via disabled prop */}
      <FloatingIcon 
        icon={FaLightbulb} 
        delay={1.5} 
        x={-20} 
        y={15} 
        color="#fbbf24" 
        disabled={disableDecor || window.innerWidth < 900}
        position={{ bottom: '25%', right: '8%' }}
      />
      <FloatingIcon 
        icon={FaStar} 
        delay={0.5} 
        x={12} 
        y={-20} 
        color="#f472b6" 
        disabled={disableDecor || window.innerWidth < 900}
        position={{ top: '40%', right: '15%' }}
      />
      <FloatingIcon 
        icon={FaGem} 
        delay={2.5} 
        x={-15} 
        y={18} 
        color="#a78bfa" 
        disabled={disableDecor || window.innerWidth < 900}
        position={{ top: '50%', left: '5%' }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3 } }}>
        <Box textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Chip 
              label="🚀 Welcome to the Future of Development" 
              sx={{ 
                mb: { xs: 2, md: 3 }, 
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(129, 140, 248, 0.2), rgba(244, 114, 182, 0.2))'
                  : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))',
                color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                contain: 'layout style paint',
                border: theme.palette.mode === 'dark' ? '1px solid rgba(129, 140, 248, 0.3)' : '1px solid rgba(99, 102, 241, 0.2)',
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                py: { xs: 1, md: 2 },
                px: { xs: 2, md: 3 },
                fontWeight: 600,
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 8px 32px rgba(129, 140, 248, 0.2)'
                  : '0 8px 32px rgba(99, 102, 241, 0.15)'
              }} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginBottom: '2rem' }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem', lg: '4rem' },
                fontWeight: 800,
                textAlign: 'center',
                width: '100%',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #a5b4fc, #f9a8d4, #7dd3fc)'
                  : 'linear-gradient(135deg, #6366f1, #ec4899, #0ea5e9)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: theme.palette.mode === 'dark'
                  ? '0 0 40px rgba(129, 140, 248, 0.3)'
                  : '0 0 40px rgba(99, 102, 241, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              Transform Your Digital Dreams
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#334155', 
                mb: { xs: 3, md: 5 },
                maxWidth: { xs: '90%', sm: '80%', md: '600px' },
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                px: { xs: 1, sm: 0 },
                fontWeight: 500,
                textShadow: theme.palette.mode === 'dark' 
                  ? '0 2px 8px rgba(0, 0, 0, 0.3)'
                  : '0 2px 8px rgba(255, 255, 255, 0.5)'
              }}
            >
              We craft exceptional digital experiences through cutting-edge software, 
              stunning websites, and innovative mobile applications.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 2, md: 3 }, 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              px: { xs: 2, sm: 0 },
              mb: { xs: 4, md: 6 }
            }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="contained" 
                  size="large"
                  component={Link}
                  to="/contact"
                  startIcon={<MdRocketLaunch />}
                  sx={{ 
                    px: { xs: 3, md: 4 }, 
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    borderRadius: '50px',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #818cf8, #6366f1, #8b5cf6)'
                      : 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 4s ease infinite',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 10px 40px rgba(129, 140, 248, 0.4)'
                      : '0 10px 40px rgba(99, 102, 241, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: { xs: '140px', sm: 'auto' },
                    position: 'relative',
                    overflow: 'hidden',
                    fontWeight: 600,
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 15px 50px rgba(129, 140, 248, 0.5)'
                        : '0 15px 50px rgba(99, 102, 241, 0.4)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%'
                    }
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outlined" 
                  size="large"
                  component={Link}
                  to="/services"
                  startIcon={<MdAutoAwesome />}
                  sx={{ 
                    px: { xs: 3, md: 4 }, 
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    borderRadius: '50px',
                    borderWidth: '2px',
                    borderColor: theme.palette.mode === 'dark' ? '#818cf8' : '#6366f1',
                    color: theme.palette.mode === 'dark' ? '#e0e7ff' : '#4f46e5',
                    backdropFilter: 'blur(8px)',
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'rgba(129, 140, 248, 0.1)'
                      : 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: { xs: '140px', sm: 'auto' },
                    position: 'relative',
                    overflow: 'hidden',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(129, 140, 248, 0.2)'
                        : 'rgba(99, 102, 241, 0.15)',
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 12px 40px rgba(129, 140, 248, 0.3)'
                        : '0 12px 40px rgba(99, 102, 241, 0.25)',
                      borderColor: theme.palette.mode === 'dark' ? '#a5b4fc' : '#8b5cf6'
                    }
                  }}
                >
                  Explore Services
                </Button>
              </motion.div>
            </Box>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Grid container spacing={{ xs: 3, md: 5 }} sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 6, md: 10 }, maxWidth: '800px', mx: 'auto' }} justifyContent="center">
              <Grid xs={12} sm={4}>
                <GlassmorphismCard delay={0.9} theme={theme}>
                  <Typography variant="h4" sx={{ 
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #a5b4fc, #818cf8)'
                      : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold', 
                    mb: 1 
                  }}>
                    <AnimatedCounter end={100} suffix="+" />
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
                    fontWeight: 600
                  }}>
                    Projects
                  </Typography>
                </GlassmorphismCard>
              </Grid>
              <Grid xs={12} sm={4}>
                <GlassmorphismCard delay={1.0} theme={theme}>
                  <Typography variant="h4" sx={{ 
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #f9a8d4, #f472b6)'
                      : 'linear-gradient(135deg, #ec4899, #f43f5e)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold', 
                    mb: 1 
                  }}>
                    <AnimatedCounter end={50} suffix="+" />
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
                    fontWeight: 600
                  }}>
                    Clients
                  </Typography>
                </GlassmorphismCard>
              </Grid>
              <Grid xs={12} sm={4}>
                <GlassmorphismCard delay={1.1} theme={theme}>
                  <Typography variant="h4" sx={{ 
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #7dd3fc, #38bdf8)'
                      : 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold', 
                    mb: 1 
                  }}>
                    <AnimatedCounter end={100} suffix="%" />
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
                    fontWeight: 600
                  }}>
                    Satisfaction
                  </Typography>
                </GlassmorphismCard>
              </Grid>
            </Grid>
          </motion.div>
        </Box>
      </Container>

      {/* Animated Background Elements */}
      {!disableDecor && (
        <>
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, rgba(129, 140, 248, 0.15), rgba(244, 114, 182, 0.1))'
                : 'linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.08))',
              zIndex: 1,
              willChange: 'transform',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 0 60px rgba(129, 140, 248, 0.2)'
                : '0 0 60px rgba(99, 102, 241, 0.15)'
            }}
          />
          
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.08, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '5%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, rgba(56, 189, 248, 0.1), rgba(129, 140, 248, 0.15))'
                : 'linear-gradient(45deg, rgba(14, 165, 233, 0.08), rgba(99, 102, 241, 0.1))',
              zIndex: 1,
              willChange: 'transform',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 0 80px rgba(56, 189, 248, 0.2)'
                : '0 0 80px rgba(14, 165, 233, 0.15)'
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Hero;
