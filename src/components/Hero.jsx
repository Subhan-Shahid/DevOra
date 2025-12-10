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
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        position: 'absolute',
        color,
        fontSize: '2.5rem',
        zIndex: 1,
        filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.2))',
        cursor: 'pointer',
        willChange: 'opacity',
        ...position
      }}
      data-animate="true"
    >
      <Icon />
    </motion.div>
  )
));

const GlassmorphismCard = ({ children, delay = 0, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    whileHover={{
      y: -5,
      transition: { duration: 0.3 }
    }}
    style={{
      background: theme?.palette.mode === 'dark'
        ? 'rgba(30, 41, 59, 0.7)'
        : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      contain: 'layout style paint',
      willChange: 'transform',
      borderRadius: '16px',
      border: theme?.palette.mode === 'dark'
        ? '1px solid rgba(148, 163, 184, 0.2)'
        : '1px solid rgba(226, 232, 240, 0.8)',
      padding: '24px',
      boxShadow: theme?.palette.mode === 'dark'
        ? '0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(15, 23, 42, 0.2)'
        : '0 10px 40px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)'
    }}
    data-animate="true"
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
    return () => { };
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
          ? 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 60%, #e2e8f0 100%)',
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
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(13, 148, 136, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(30, 64, 175, 0.05) 0%, transparent 60%)
            `
            : `
              radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(13, 148, 136, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 60%)
            `,
          zIndex: 1,
          animation: 'gradientShift 20s ease infinite'
        },
      }}
    >
      {/* Particle Background */}
      {!disableDecor && <ParticleBackground />}

      {/* Decorative floating icons with professional colors */}
      <FloatingIcon
        icon={FaCode}
        delay={0}
        x={20}
        y={-15}
        color="#3b82f6"
        disabled={disableDecor}
        position={{ top: '15%', left: '8%' }}
      />
      <FloatingIcon
        icon={FaRocket}
        delay={1}
        x={-18}
        y={12}
        color="#0d9488"
        disabled={disableDecor}
        position={{ top: '25%', right: '10%' }}
      />
      <FloatingIcon
        icon={FaMobile}
        delay={2}
        x={15}
        y={-18}
        color="#64748b"
        disabled={disableDecor}
        position={{ bottom: '20%', left: '12%' }}
      />
      {/* Additional icons - hidden on mobile via disabled prop */}
      <FloatingIcon
        icon={FaLightbulb}
        delay={1.5}
        x={-20}
        y={15}
        color="#ca8a04"
        disabled={disableDecor || window.innerWidth < 900}
        position={{ bottom: '25%', right: '8%' }}
      />
      <FloatingIcon
        icon={FaStar}
        delay={0.5}
        x={12}
        y={-20}
        color="#94a3b8"
        disabled={disableDecor || window.innerWidth < 900}
        position={{ top: '40%', right: '15%' }}
      />
      <FloatingIcon
        icon={FaGem}
        delay={2.5}
        x={-15}
        y={18}
        color="#4f46e5"
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
              label="🚀  Welcome to the Future of Development"
              sx={{
                fontWeight: 600,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.8)',
                color: theme.palette.text.primary,
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(203, 213, 225, 0.5)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                  : '0 4px 12px rgba(0, 0, 0, 0.05)'
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
                  ? 'linear-gradient(135deg, #e2e8f0, #94a3b8)'
                  : 'linear-gradient(135deg, #1e293b, #334155, #475569)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: theme.palette.mode === 'dark'
                  ? '0 0 30px rgba(255, 255, 255, 0.1)'
                  : '0 0 30px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                mt: 2
              }}
            >
              Transform Your Digital Vision
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
                color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                mb: { xs: 3, md: 5 },
                maxWidth: { xs: '90%', sm: '80%', md: '600px' },
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                px: { xs: 1, sm: 0 },
                fontWeight: 500,
              }}
            >
              We craft exceptional digital experiences through enterprise-grade software,
              modern websites, and innovative mobile applications tailored for your success.
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                    borderRadius: '8px',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #2563eb, #1d4ed8)'
                      : 'linear-gradient(135deg, #1e40af, #1e3a8a)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 4px 14px rgba(37, 99, 235, 0.4)'
                      : '0 4px 14px rgba(30, 58, 138, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: { xs: '140px', sm: 'auto' },
                    position: 'relative',
                    overflow: 'hidden',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 6px 20px rgba(37, 99, 235, 0.5)'
                        : '0 6px 20px rgba(30, 58, 138, 0.4)'
                    }
                  }}
                >
                  Get Started
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                    borderRadius: '8px',
                    borderWidth: '2px',
                    borderColor: theme.palette.mode === 'dark' ? '#475569' : '#cbd5e1',
                    color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#334155',
                    backdropFilter: 'blur(4px)',
                    bgcolor: 'transparent',
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: { xs: '140px', sm: 'auto' },
                    position: 'relative',
                    overflow: 'hidden',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(71, 85, 105, 0.3)'
                        : 'rgba(241, 245, 249, 0.8)',
                      transform: 'translateY(-2px)',
                      borderColor: theme.palette.mode === 'dark' ? '#94a3b8' : '#94a3b8'
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
              <Grid size={{ xs: 12, sm: 4 }}>
                <GlassmorphismCard delay={0.9} theme={theme}>
                  <Typography variant="h4" sx={{
                    color: theme.palette.mode === 'dark' ? '#60a5fa' : '#2563eb',
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
              <Grid size={{ xs: 12, sm: 4 }}>
                <GlassmorphismCard delay={1.0} theme={theme}>
                  <Typography variant="h4" sx={{
                    color: theme.palette.mode === 'dark' ? '#2dd4bf' : '#0d9488',
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
              <Grid size={{ xs: 12, sm: 4 }}>
                <GlassmorphismCard delay={1.1} theme={theme}>
                  <Typography variant="h4" sx={{
                    color: theme.palette.mode === 'dark' ? '#818cf8' : '#4f46e5',
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

      {/* Animated Background Elements - Professional & Subtle */}
      {!disableDecor && (
        <>
          <motion.div
            animate={{
              rotate: 360,
              y: [0, -10, 0]
            }}
            transition={{
              duration: 30,
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
                ? 'linear-gradient(45deg, rgba(30, 58, 138, 0.1), rgba(30, 64, 175, 0.1))'
                : 'linear-gradient(45deg, rgba(219, 234, 254, 0.4), rgba(191, 219, 254, 0.3))',
              zIndex: 1,
              willChange: 'transform',
            }}
          />

          <motion.div
            animate={{
              rotate: -360,
              y: [0, 15, 0]
            }}
            transition={{
              duration: 35,
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
                ? 'linear-gradient(45deg, rgba(15, 23, 42, 0.1), rgba(30, 41, 59, 0.1))'
                : 'linear-gradient(45deg, rgba(241, 245, 249, 0.4), rgba(226, 232, 240, 0.3))',
              zIndex: 1,
              willChange: 'transform',
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Hero;
