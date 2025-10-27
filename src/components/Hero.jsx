import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Chip, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaCode, FaRocket, FaMobile, FaStar, FaHeart, FaLightbulb, FaGem, FaMagic } from 'react-icons/fa';
import { MdAutoAwesome, MdRocketLaunch, MdTrendingUp } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ParticleBackground from './ParticleBackground';
import { LayoutTextFlip } from './ui/layout-text-flip';

const FloatingIcon = React.memo(({ icon: Icon, delay, x, y, color = '#1976d2', disabled = false }) => (
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
        willChange: 'transform'
      }}
    >
      <Icon />
    </motion.div>
  )
));

const GlassmorphismCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ 
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3 }
    }}
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
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
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #0b0d12 0%, #0f172a 50%, #0a1323 100%)'
          : 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #60a5fa 100%)',
        transition: 'background 0.3s ease',
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
              radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 20% 80%, rgba(96, 165, 250, 0.35) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)
            `,
          zIndex: 1
        },
        // Removed mouse-follow background for performance
      }}
    >
      {/* Particle Background */}
      {!disableDecor && <ParticleBackground />}
      
      {/* Reduced/disabled decorative icons for performance */}
      <FloatingIcon icon={FaCode} delay={0} x={20} y={-15} color="#64b5f6" disabled={disableDecor} />
      <FloatingIcon icon={FaRocket} delay={1} x={-18} y={12} color="#22d3ee" disabled={disableDecor} />
      <FloatingIcon icon={FaMobile} delay={2} x={15} y={-18} color="#4fc3f7" disabled={disableDecor} />
      
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
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                py: { xs: 1, md: 2 },
                px: { xs: 2, md: 3 }
              }} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ marginBottom: '2rem' }}
          >
            <Box sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem', lg: '4rem' },
              fontWeight: 800,
              textAlign: 'center',
              width: '100%'
            }}>
              <LayoutTextFlip
                text="Transform Your "
                words={[
                  "Digital Dreams",
                  "Business Vision",
                  "Creative Ideas", 
                  "Tech Solutions",
                  "Future Goals"
                ]}
                duration={3000}
              />
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)', 
                mb: { xs: 3, md: 5 },
                maxWidth: { xs: '90%', sm: '80%', md: '600px' },
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
                px: { xs: 1, sm: 0 }
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
                    background: 'linear-gradient(45deg, #0ea5e9, #2563eb, #60a5fa)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 3s ease infinite',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.35)',
                    transition: 'all 0.3s ease',
                    minWidth: { xs: '140px', sm: 'auto' },
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 35px rgba(37, 99, 235, 0.5)'
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
                    borderColor: 'white',
                    color: 'white',
                    backdropFilter: 'blur(20px)',
                    bgcolor: 'rgba(255,255,255,0.15)',
                    transition: 'all 0.3s ease',
                    minWidth: { xs: '140px', sm: 'auto' },
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.25)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(255,255,255,0.3)',
                      borderColor: '#64b5f6'
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
            <Grid container spacing={3} sx={{ mt: { xs: 2, md: 4 }, maxWidth: '600px', mx: 'auto' }} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <GlassmorphismCard delay={0.9}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                    <AnimatedCounter end={100} suffix="+" />
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Projects
                  </Typography>
                </GlassmorphismCard>
              </Grid>
              <Grid item xs={12} sm={4}>
                <GlassmorphismCard delay={1.0}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                    <AnimatedCounter end={50} suffix="+" />
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Clients
                  </Typography>
                </GlassmorphismCard>
              </Grid>
              <Grid item xs={12} sm={4}>
                <GlassmorphismCard delay={1.1}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                    <AnimatedCounter end={99} suffix="%" />
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Success
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
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              zIndex: 1,
              willChange: 'transform'
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
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1))',
              zIndex: 1,
              willChange: 'transform'
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Hero;
