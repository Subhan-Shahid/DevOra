import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Button, useTheme, Grid } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { FaCode, FaGlobe, FaMobileAlt, FaArrowRight } from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdCloud, MdStar, MdCheckCircle } from 'react-icons/md';

// Optimized services data
const servicesData = [
  {
    slug: 'software-development',
    title: 'Software Development',
    description: 'Custom enterprise software solutions built with cutting-edge technologies. Scalable, secure, and maintainable applications.',
    icon: FaCode,
    colorKey: 'primary',
    features: ['Custom Solutions', 'Enterprise Grade', 'Cloud Ready'],
    price: 'Starting from 35k PKR',
    badge: 'Most Popular',
    projects: 50
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    description: 'Stunning, responsive websites that convert visitors into customers. Modern designs with exceptional performance.',
    icon: FaGlobe,
    colorKey: 'secondary',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
    price: 'Starting from 30k PKR',
    badge: 'Best Value',
    projects: 20
  },
  {
    slug: 'app-development',
    title: 'App Development',
    description: 'Native and cross-platform mobile apps that engage users and drive business growth on iOS and Android.',
    icon: FaMobileAlt,
    colorKey: 'tertiary',
    features: ['Cross Platform', 'Native Performance', 'App Store Ready'],
    price: 'Starting from 50k PKR',
    badge: 'Premium',
    projects: 10
  }
];

// 3D Flip Service card component
const ServiceCard3D = ({ service, index, theme }) => {
  const Icon = service.icon;
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const colors = useMemo(() => {
    const colorMap = {
      primary: {
        gradient: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)'
          : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        main: theme.palette.mode === 'dark' ? '#818cf8' : '#6366f1',
        light: theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.15)',
      },
      secondary: {
        gradient: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)'
          : 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
        main: theme.palette.mode === 'dark' ? '#f472b6' : '#ec4899',
        light: theme.palette.mode === 'dark' ? 'rgba(244, 114, 182, 0.2)' : 'rgba(236, 72, 153, 0.15)',
      },
      tertiary: {
        gradient: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
          : 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
        main: theme.palette.mode === 'dark' ? '#38bdf8' : '#0ea5e9',
        light: theme.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(14, 165, 233, 0.15)',
      }
    };
    return colorMap[service.colorKey] || colorMap.primary;
  }, [service.colorKey, theme.palette.mode]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100
      }}
      viewport={{ once: true, margin: '-50px' }}
      onHoverStart={() => !isMobile && setIsFlipped(true)}
      onHoverEnd={() => !isMobile && setIsFlipped(false)}
      style={{ perspective: '1000px', height: '100%' }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '380px', sm: '420px', md: '500px' },
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: 5,
            overflow: 'hidden',
            background: theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)`
              : `linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)`,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: `2px solid ${colors.light}`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${colors.light}`,
          }}
        >
          {/* Gradient overlay at top */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: colors.gradient,
              opacity: 0.15,
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            {/* Hexagon Icon Container */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { xs: 1.5, md: 3 }, mt: { xs: 1, sm: 3, md: 4 } }}>
              <Box
                sx={{
                  width: { xs: 100, sm: 150, md: 180 },
                  height: { xs: 100, sm: 150, md: 180 },
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Hexagon background */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${colors.light}, rgba(255,255,255,0.1))`,
                    backdropFilter: 'blur(40px)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    boxShadow: `0 20px 60px ${colors.light}, inset 0 0 60px rgba(255,255,255,0.1)`,
                  }}
                />
                {/* Icon */}
                <Icon style={{ 
                  color: colors.main, 
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  zIndex: 1,
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                }} />
              </Box>
            </Box>

            {/* Title and Description */}
            <Box sx={{ textAlign: 'center', px: { xs: 0.5, sm: 2 } }}>
              <Typography
                variant="h5"
                sx={{ 
                  fontWeight: 800, 
                  mb: { xs: 1, md: 2 }, 
                  color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                  fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.5rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                {service.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{ 
                  color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b', 
                  lineHeight: 1.5,
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.95rem' },
                  mb: { xs: 1.5, md: 3 },
                }}
              >
                {service.description.substring(0, 100)}...
              </Typography>

              {isMobile ? (
                <Button
                  onClick={() => setIsFlipped(!isFlipped)}
                  variant="contained"
                  sx={{
                    borderRadius: '25px',
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.25 },
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    textTransform: 'none',
                    background: colors.gradient,
                    color: '#fff',
                    boxShadow: `0 8px 24px ${colors.light}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 32px ${colors.light}`,
                    }
                  }}
                >
                  {isFlipped ? 'Show Less' : 'View Details'}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: '25px',
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.25 },
                    border: `2px solid ${colors.light}`,
                    color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    textTransform: 'none',
                    background: `linear-gradient(135deg, ${colors.light}, rgba(255,255,255,0.05))`,
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: colors.gradient,
                      borderColor: colors.main,
                      color: '#fff',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 24px ${colors.light}`,
                    }
                  }}
                >
                  Hover to see details
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        {/* BACK SIDE */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 5,
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${colors.main}15 0%, ${colors.main}05 100%)`,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: `2px solid ${colors.main}`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 60px ${colors.light}`,
          }}
        >
          {/* Gradient glow effect */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: colors.gradient,
              opacity: 0.3,
              filter: 'blur(60px)',
            }}
          />

          <Box sx={{ p: { xs: 2.5, sm: 3.5, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: { xs: 1.5, md: 3 },
                color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' },
                background: colors.gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                wordBreak: 'break-word',
              }}
            >
              {service.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
                mb: { xs: 1.5, md: 3 },
                lineHeight: 1.6,
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.95rem' },
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {service.description}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{
                color: colors.main,
                fontWeight: 700,
                mb: { xs: 1, md: 2 },
                fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                textTransform: 'uppercase',
                letterSpacing: { xs: 0.5, sm: 1 },
              }}
            >
              KEY FEATURES:
            </Typography>

            <Box sx={{ mb: { xs: 1.5, md: 3 }, flexGrow: 1 }}>
              {service.features.map((feature, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 0.75, sm: 1.5 },
                    mb: { xs: 0.75, sm: 1.5 },
                  }}
                >
                  <MdCheckCircle style={{ 
                    color: colors.main, 
                    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                    flexShrink: 0,
                  }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
                      fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                      fontWeight: 500,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 1.5, md: 3 }, gap: { xs: 1, sm: 2 } }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                  Projects
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                    background: colors.gradient,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {service.projects}+
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                  From
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                    color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                  }}
                >
                  {service.price.split(' ')[2]}
                </Typography>
              </Box>
            </Box>

{isMobile ? (
              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, flexWrap: 'wrap' }}>
                <Button
                  onClick={() => setIsFlipped(false)}
                  variant="outlined"
                  sx={{
                    flex: '0 0 auto',
                    minWidth: { xs: '80px', sm: '100px' },
                    borderRadius: '16px',
                    py: { xs: 1.25, sm: 1.75 },
                    px: { xs: 2, sm: 3 },
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                    border: `2px solid ${colors.main}`,
                    color: colors.main,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: `${colors.main}15`,
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Back
                </Button>
                <Button
                  component={Link}
                  to={`/services/${service.slug}`}
                  variant="contained"
                  endIcon={<FaArrowRight />}
                  sx={{
                    flex: 1,
                    borderRadius: '16px',
                    py: { xs: 1.25, sm: 1.75 },
                    px: { xs: 2, sm: 3 },
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: { xs: '0.85rem', sm: '0.95rem' },
                    background: colors.gradient,
                    boxShadow: `0 12px 32px ${colors.light}`,
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      boxShadow: `0 16px 48px ${colors.light}`,
                      transform: 'translateY(-3px)',
                    }
                  }}
                >
                  Get Started
                </Button>
              </Box>
            ) : (
              <Button
                component={Link}
                to={`/services/${service.slug}`}
                variant="contained"
                fullWidth
                endIcon={<FaArrowRight />}
                sx={{
                  borderRadius: '16px',
                  py: { xs: 1.5, sm: 1.75 },
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                  background: colors.gradient,
                  boxShadow: `0 12px 32px ${colors.light}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 16px 48px ${colors.light}`,
                    transform: 'translateY(-3px)',
                  }
                }}
              >
                Get Started Now
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

// Why Choose Us features data
const whyChooseFeatures = [
  {
    icon: MdSpeed,
    title: 'Lightning Fast',
    description: 'Optimized performance and quick delivery times for all projects.',
    colorKey: 'primary'
  },
  {
    icon: MdSecurity,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and 99.9% uptime guarantee.',
    colorKey: 'secondary'
  },
  {
    icon: MdCloud,
    title: 'Cloud Ready',
    description: 'Scalable cloud solutions built for modern businesses.',
    colorKey: 'tertiary'
  }
];

// Simple feature card component
const FeatureCard = ({ feature, index, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = feature.icon;

  const colors = useMemo(() => {
    const colorMap = {
      primary: {
        gradient: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)'
          : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        light: theme.palette.mode === 'dark' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(99, 102, 241, 0.15)',
      },
      secondary: {
        gradient: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)'
          : 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
        light: theme.palette.mode === 'dark' ? 'rgba(244, 114, 182, 0.2)' : 'rgba(236, 72, 153, 0.15)',
      },
      tertiary: {
        gradient: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)'
          : 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
        light: theme.palette.mode === 'dark' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(14, 165, 233, 0.15)',
      }
    };
    return colorMap[feature.colorKey] || colorMap.primary;
  }, [feature.colorKey, theme.palette.mode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.12,
        type: 'spring',
        stiffness: 120
      }}
      viewport={{ once: true, margin: '-30px' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          background: theme.palette.mode === 'dark' 
            ? 'rgba(30, 41, 59, 0.7)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          contain: 'layout style paint',
          willChange: 'transform',
          border: theme.palette.mode === 'dark'
            ? `2px solid ${colors.light}`
            : `2px solid ${colors.light}`,
          boxShadow: isHovered
            ? (theme.palette.mode === 'dark' 
                ? `0 30px 60px rgba(0,0,0,0.5), 0 0 50px ${colors.light}`
                : `0 30px 60px ${colors.light}, 0 12px 40px rgba(0,0,0,0.12)`)
            : (theme.palette.mode === 'dark' 
                ? `0 15px 40px rgba(0,0,0,0.4), 0 0 30px ${colors.light}`
                : `0 15px 40px ${colors.light}, 0 8px 24px rgba(0,0,0,0.08)`),
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Gradient accent bar at top */}
        <Box
          sx={{
            height: '6px',
            background: colors.gradient,
            opacity: isHovered ? 1 : 0.9,
            transition: 'all 0.3s ease',
            boxShadow: isHovered ? `0 4px 12px ${colors.light}` : 'none',
          }}
        />

        <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, textAlign: 'center' }}>
          {/* Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '24px',
              background: colors.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: `0 12px 32px ${colors.light}`,
              transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <IconComponent style={{ 
              color: '#fff', 
              fontSize: '2.2rem',
            }} />
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: 900, 
              mb: 2,
              color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
              fontSize: { xs: '1.5rem', md: '1.6rem' },
              letterSpacing: '-0.02em',
            }}
          >
            {feature.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{ 
              color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
              lineHeight: 1.8,
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            {feature.description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};


const Services = () => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box sx={{ 
      py: { xs: 10, md: 14 }, 
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        : 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 30%, #e0e7ff 70%, #fae8ff 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Simplified background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'dark'
            ? `
              radial-gradient(circle at 20% 50%, rgba(129, 140, 248, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(244, 114, 182, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(56, 189, 248, 0.06) 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(14, 165, 233, 0.05) 0%, transparent 50%)
            `,
          pointerEvents: 'none',
          animation: 'gradientShift 20s ease infinite',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box textAlign="center" sx={{ mb: { xs: 8, md: 10 } }}>
            <Typography 
              variant="overline" 
              sx={{ 
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #818cf8, #f472b6, #38bdf8)'
                  : 'linear-gradient(135deg, #6366f1, #ec4899, #0ea5e9)',
                backgroundClip: 'text',
                WebkitBackdropFilter: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800, 
                fontSize: { xs: '0.95rem', md: '1.15rem' },
                letterSpacing: 3,
                mb: 2,
                display: 'block',
                transition: 'all 0.3s ease'
              }}
            >
              ✨ WHAT WE OFFER ✨
            </Typography>
            
            <Typography 
              variant="h1" 
              component="h2"
              sx={{ 
                fontWeight: 900, 
                color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                mb: { xs: 3, md: 4 },
                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                lineHeight: 1.1,
                transition: 'color 0.3s ease'
              }}
            >
              Our{' '}
              <Box
                component="span"
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #818cf8 0%, #f472b6 50%, #38bdf8 100%)'
                    : 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #0ea5e9 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
              >
                Services
              </Box>
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569', 
                maxWidth: '700px', 
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                fontWeight: 400,
                transition: 'color 0.3s ease'
              }}
            >
              🚀 Transforming ideas into powerful digital solutions with cutting-edge technology and innovative design
            </Typography>
          </Box>
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {servicesData.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <ServiceCard3D service={service} index={index} theme={theme} />
            </Grid>
          ))}
        </Grid>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Box sx={{ mt: { xs: 12, md: 16 }, textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 900, 
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #818cf8 0%, #f472b6 50%, #38bdf8 100%)'
                  : 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #0ea5e9 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Why Choose <span style={{ color: theme.palette.mode === 'dark' ? '#818cf8' : '#6366f1' }}>D</span>ev<span style={{ color: theme.palette.mode === 'dark' ? '#818cf8' : '#6366f1' }}>O</span>ra?
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569', 
                mb: { xs: 4, md: 6 },
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Discover the perfect solution for your digital transformation journey
            </Typography>
            
            <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
              {whyChooseFeatures.map((feature, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                  <FeatureCard feature={feature} index={idx} theme={theme} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Services;
