import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Button, useTheme, Grid } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { FaCode, FaGlobe, FaMobileAlt, FaArrowRight } from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdCloud, MdStar, MdCheckCircle } from 'react-icons/md';

// Optimized services data
const servicesData = [
  {
    slug: 'software-development',
    title: 'Software Development',
    description: '💎 Transform your vision into reality with enterprise-grade software that scales effortlessly. We craft intelligent, future-proof solutions using cutting-edge tech stacks that drive real business results.',
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
    description: '🚀 Launch stunning websites that captivate visitors and convert them into loyal customers. Lightning-fast performance meets jaw-dropping design—your digital presence, elevated to perfection.',
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
    description: '📱 Build powerful mobile experiences that users love and can\'t put down. From iOS to Android, we deliver native-quality apps that engage, delight, and accelerate your business growth exponentially.',
    icon: FaMobileAlt,
    colorKey: 'tertiary',
    features: ['Cross Platform', 'Native Performance', 'App Store Ready'],
    price: 'Starting from 50k PKR',
    badge: 'Premium',
    projects: 10
  }
];

// Simple Service card component with hover overlay
const ServiceCard3D = ({ service, index, theme }) => {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      const touchCapable = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      const narrow = typeof window !== 'undefined' && window.innerWidth < 1024;
      const noHover = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches;
      setIsMobile(Boolean(noHover || (touchCapable && narrow)));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const colors = useMemo(() => {
    const isDark = theme.palette.mode === 'dark';
    const colorMap = {
      primary: {
        gradient: isDark ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        main: isDark ? '#3b82f6' : '#1e40af',
        light: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(30, 64, 175, 0.1)',
      },
      secondary: {
        gradient: isDark ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)' : 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
        main: isDark ? '#94a3b8' : '#475569',
        light: isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(71, 85, 105, 0.1)',
      },
      tertiary: {
        gradient: isDark ? 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)' : 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
        main: isDark ? '#2dd4bf' : '#0f766e',
        light: isDark ? 'rgba(45, 212, 191, 0.15)' : 'rgba(13, 148, 136, 0.1)',
      }
    };
    return colorMap[service.colorKey] || colorMap.primary;
  }, [service.colorKey, theme.palette.mode]);


  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={isMobile ? {} : { y: -18, rotateX: 10, rotateY: -8 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.9, delay: index * 0.06 }}
      sx={{
        height: isHovered ? { xs: 'auto', sm: 'auto', md: '720px' } : { xs: 'auto', sm: '420px', md: '500px' },
        position: 'relative',
        borderRadius: 5,
        overflow: 'visible',
        background: 'transparent',
        perspective: '1400px',
        transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      data-animate="true"
    >
      {/* Back stacked layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: 5,
          transform: 'translateY(26px) scale(0.94)',
          opacity: theme.palette.mode === 'dark' ? 0.7 : 0.8,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 64, 175, 0.9))'
            : 'linear-gradient(135deg, rgba(219, 234, 254, 0.95), rgba(221, 214, 254, 0.95))',
          border: `1px solid ${colors.light}`,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 30px 80px rgba(15, 23, 42, 0.9)'
            : '0 30px 80px rgba(15, 23, 42, 0.45)',
          zIndex: 0,
        }}
      />

      {/* Middle stacked layer */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: 5,
          transform: 'translateY(12px) scale(0.97)',
          opacity: theme.palette.mode === 'dark' ? 0.9 : 0.95,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 64, 175, 0.98))'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(239, 246, 255, 0.98))',
          border: `1px solid ${colors.light}`,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 22px 60px rgba(15, 23, 42, 0.9)'
            : '0 22px 60px rgba(15, 23, 42, 0.35)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          height: '100%',
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)`
            : `linear-gradient(135deg, rgba(255, 255, 255, 0.99) 0%, rgba(248, 250, 252, 0.99) 100%)`,
          border: `1px solid ${colors.main}30`,
          boxShadow: theme.palette.mode === 'dark'
            ? `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${colors.main}20, inset 0 1px 0 rgba(255,255,255,0.05)`
            : `0 20px 40px rgba(15, 23, 42, 0.08), 0 0 0 1px ${colors.main}15, inset 0 1px 0 rgba(255,255,255,0.8)`,
          transformStyle: 'preserve-3d',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: colors.gradient,
            opacity: 0.08,
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 50% 0%, ${colors.main}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <Box
          sx={{
            p: { xs: 2.5, sm: 3.5, md: 4 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1,
          }}
        >
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
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${colors.light}, rgba(255,255,255,0.1))`,
                  borderRadius: '50%',
                  boxShadow: `0 8px 24px ${colors.light}`,
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              <Icon
                style={{
                  color: colors.main,
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  zIndex: 1,
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: { xs: 'left', md: 'center' },
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: { xs: 1, md: 1.5 },
              px: { xs: 0.5, sm: 2 },
              flexGrow: 1,
              justifyContent: 'flex-start',
              pb: { xs: 2, md: 3 },
            }}
          >
            <Box sx={{ flexGrow: 1, width: '100%', minHeight: { xs: 'auto', md: 210 } }}>
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
                  display: '-webkit-box',
                  WebkitLineClamp: { xs: 3, md: 3 },
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {service.description}
              </Typography>
            </Box>

            {/* Expanded content on hover */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0,
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              sx={{
                overflow: 'hidden',
                width: '100%',
              }}
            >
              {/* Badge */}
              {service.badge && (
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 2,
                    py: 0.5,
                    mb: 2,
                    mt: 2,
                    borderRadius: '20px',
                    background: colors.gradient,
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: `0 4px 12px ${colors.light}`,
                  }}
                >
                  ⭐ {service.badge}
                </Box>
              )}

              {/* Features List */}
              <Box sx={{ mb: 2 }}>
                {service.features.map((feature, idx) => (
                  <Box
                    key={idx}
                    component={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : -20,
                    }}
                    transition={{ delay: 0.1 + idx * 0.1, duration: 0.3 }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: colors.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MdCheckCircle style={{ color: '#fff', fontSize: '0.75rem' }} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#334155',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Price */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2.5,
                  py: 1,
                  borderRadius: '25px',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.03)',
                  border: `1.5px solid ${colors.light}`,
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.main,
                    fontSize: '1rem',
                    fontWeight: 800,
                  }}
                >
                  {service.price}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 1.5, display: { xs: 'flex', md: 'none' }, gap: 1.5, alignSelf: { xs: 'flex-start', md: 'center' }, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to={`/services/${service.slug}`}
                variant="contained"
                size="medium"
                endIcon={<FaArrowRight />}
                sx={{
                  borderRadius: '25px',
                  px: 3.5,
                  py: 1.25,
                  mt: 1,
                  textTransform: 'none',
                  fontWeight: 800,
                  background: colors.gradient,
                  boxShadow: `0 10px 20px ${colors.light}`,
                  border: `2px solid ${colors.main}`,
                  '&:hover': {
                    boxShadow: `0 14px 28px ${colors.light}`,
                  }
                }}
              >
                Get Started
              </Button>
              <Button
                onClick={() => setIsHovered(!isHovered)}
                variant="outlined"
                size="medium"
                sx={{
                  borderRadius: '25px',
                  px: 3.5,
                  py: 1.25,
                  mt: 1,
                  textTransform: 'none',
                  fontWeight: 700,
                  border: `2px solid ${colors.main}`,
                  color: colors.main,
                  background: isHovered ? `${colors.main}15` : 'transparent',
                  '&:hover': {
                    background: `${colors.main}20`,
                    border: `2px solid ${colors.main}`,
                  }
                }}
              >
                {isHovered ? 'Less Info' : 'More Info'}
              </Button>
            </Box>
          </Box>

          <Button
            component={Link}
            to={`/services/${service.slug}`}
            variant="outlined"
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              borderRadius: '25px',
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.25 },
              fontWeight: 600,
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              textTransform: 'none',
              border: `2px solid ${colors.main}`,
              color: colors.main,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
              background: isHovered ? `${colors.main}20` : 'transparent',
              boxShadow: isHovered ? `0 8px 20px ${colors.light}` : 'none',
              alignSelf: 'center',
              mt: 'auto',
              '&:hover': {
                background: `${colors.main}25`,
                transform: 'translateY(-3px) scale(1.08)',
                boxShadow: `0 12px 24px ${colors.light}`,
              }
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Box>
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
          ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
          : 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        light: theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(30, 64, 175, 0.1)',
      },
      secondary: {
        gradient: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
          : 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
        light: theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.15)' : 'rgba(71, 85, 105, 0.1)',
      },
      tertiary: {
        gradient: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)'
          : 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
        light: theme.palette.mode === 'dark' ? 'rgba(45, 212, 191, 0.15)' : 'rgba(13, 148, 136, 0.1)',
      }
    };
    return colorMap[feature.colorKey] || colorMap.primary;
  }, [feature.colorKey, theme.palette.mode]);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            ? 'rgba(30, 41, 59, 0.9)'
            : 'rgba(255, 255, 255, 0.98)',
          contain: 'layout style paint',
          willChange: 'transform',
          border: theme.palette.mode === 'dark'
            ? `2px solid ${colors.light}`
            : `2px solid ${colors.light}`,
          boxShadow: isHovered
            ? (theme.palette.mode === 'dark'
              ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${colors.light}`
              : `0 20px 40px ${colors.light}, 0 8px 24px rgba(0,0,0,0.1)`)
            : (theme.palette.mode === 'dark'
              ? `0 10px 30px rgba(0,0,0,0.3), 0 0 20px ${colors.light}`
              : `0 10px 30px ${colors.light}, 0 4px 16px rgba(0,0,0,0.06)`),
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
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
          {/* Icon or GIF */}
          {feature.isSpecial && feature.gifUrl ? (
            <Box
              sx={{
                width: '100%',
                height: 200,
                borderRadius: '16px',
                overflow: 'hidden',
                mx: 'auto',
                mb: 3,
                boxShadow: `0 12px 32px ${colors.light}`,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                background: colors.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src={feature.gifUrl}
                alt={feature.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ) : (
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
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
            >
              <IconComponent style={{
                color: '#fff',
                fontSize: '2.2rem',
              }} />
            </Box>
          )}

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
    </Box>
  );
};


const Services = React.memo(() => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box sx={{
      py: { xs: 10, md: 14 },
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 70%, #e2e8f0 100%)',
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
              radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(13, 148, 136, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(30, 64, 175, 0.03) 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(13, 148, 136, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.02) 0%, transparent 50%)
            `,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header Section */}
        <Box>
          <Box textAlign="center" sx={{ mb: { xs: 8, md: 10 } }}>
            <Typography
              variant="overline"
              sx={{
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #60a5fa, #2dd4bf)'
                  : 'linear-gradient(135deg, #2563eb, #0d9488)',
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
                    ? 'linear-gradient(135deg, #60a5fa 0%, #2dd4bf 100%)'
                    : 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)',
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
              🚀 Transforming ideas into powerful digital solutions with enterprise-grade technology and trusted expertise
            </Typography>
          </Box>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }} justifyContent="center">
          {servicesData.map((service, index) => (
            <Grid key={service.slug} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <ServiceCard3D service={service} index={index} theme={theme} />
            </Grid>
          ))}
        </Grid>

        {/* Why Choose Us Section */}
        <Box>
          <Box sx={{ mt: { xs: 12, md: 16 }, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #60a5fa 0%, #2dd4bf 100%)'
                  : 'linear-gradient(135deg, #2563eb 0%, #0d9488 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Why Choose <span style={{ color: theme.palette.mode === 'dark' ? '#60a5fa' : '#2563eb' }}>D</span>ev<span style={{ color: theme.palette.mode === 'dark' ? '#60a5fa' : '#2563eb' }}>O</span>ra?
            </Typography>

            {/* Interactive Dashboards Showcase */}
            <Box sx={{ mb: 6, mt: 4 }}>
              <Grid container spacing={4} alignItems="center">
                {/* Content Section - Shows first on mobile */}
                <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
                  <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        mb: 2,
                        color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        letterSpacing: '-0.02em',
                      }}
                    >
                      📊 Interactive Dashboards
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
                        mb: 3,
                        lineHeight: 1.7,
                        fontSize: { xs: '1rem', md: '1.15rem' },
                        fontWeight: 500,
                      }}
                    >
                      Modern UI/UX with Real-Time Data Visualization
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      {[
                        'Intuitive & responsive design',
                        'Real-time data updates',
                        'Interactive charts & graphs',
                        'Seamless user experience',
                        'Mobile-optimized interfaces'
                      ].map((feature, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 1.5,
                            justifyContent: { xs: 'center', md: 'flex-start' }
                          }}
                        >
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, #818cf8, #6366f1)'
                                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <MdCheckCircle style={{ color: '#fff', fontSize: '1rem' }} />
                          </Box>
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#334155',
                              fontSize: '1rem',
                              fontWeight: 500,
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Grid>

                {/* GIFs Section - Shows second on mobile */}
                <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box
                        sx={{
                          borderRadius: 4,
                          overflow: 'hidden',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(129,140,248,0.2)'
                            : '0 25px 60px rgba(99,102,241,0.3), 0 8px 24px rgba(0,0,0,0.1)',
                          border: theme.palette.mode === 'dark'
                            ? '2px solid rgba(129,140,248,0.3)'
                            : '2px solid rgba(99,102,241,0.2)',
                          background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))',
                          width: { xs: '85%', sm: '100%' },
                          mx: 'auto',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: theme.palette.mode === 'dark'
                              ? '0 30px 70px rgba(0,0,0,0.6), 0 0 50px rgba(129,140,248,0.3)'
                              : '0 30px 70px rgba(99,102,241,0.4), 0 12px 32px rgba(0,0,0,0.15)',
                          }
                        }}
                      >
                        <Box
                          component="img"
                          src="/Multiple-Bar-Chart.gif"
                          alt="Interactive Bar Chart"
                          sx={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            transform: 'scale(2)',
                            transformOrigin: 'center center',
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box
                        sx={{
                          borderRadius: 4,
                          overflow: 'hidden',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(244,114,182,0.2)'
                            : '0 25px 60px rgba(236,72,153,0.3), 0 8px 24px rgba(0,0,0,0.1)',
                          border: theme.palette.mode === 'dark'
                            ? '2px solid rgba(244,114,182,0.3)'
                            : '2px solid rgba(236,72,153,0.2)',
                          background: theme.palette.mode === 'dark'
                            ? 'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))',
                          width: { xs: '85%', sm: '100%' },
                          mx: 'auto',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: theme.palette.mode === 'dark'
                              ? '0 30px 70px rgba(0,0,0,0.6), 0 0 50px rgba(244,114,182,0.3)'
                              : '0 30px 70px rgba(236,72,153,0.4), 0 12px 32px rgba(0,0,0,0.15)',
                          }
                        }}
                      >
                        <Box
                          component="img"
                          src="/Stacked-Donut-Chart.gif"
                          alt="Interactive Donut Chart"
                          sx={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            transform: 'scale(1.5)',
                            transformOrigin: 'center center',
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

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
        </Box>
      </Container>
    </Box>
  );
});

export default Services;
