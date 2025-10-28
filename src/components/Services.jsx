import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Button, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useReducedMotion } from 'framer-motion';
import { FaCode, FaGlobe, FaMobileAlt, FaArrowRight } from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdCloud, MdStar, MdCheckCircle } from 'react-icons/md';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

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

// 3D Service card component
const ServiceCard3D = ({ service, index, theme }) => {
  const Icon = service.icon;
  
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
    >
      <CardContainer containerClassName="py-0">
        <CardBody className="w-full h-auto">
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 5,
              overflow: 'hidden',
              position: 'relative',
              background: theme.palette.mode === 'dark' 
                ? 'rgba(30, 41, 59, 0.7)'
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: theme.palette.mode === 'dark'
                ? `2px solid ${colors.light}`
                : `2px solid ${colors.light}`,
              boxShadow: theme.palette.mode === 'dark' 
                ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${colors.light}`
                : `0 20px 60px ${colors.light}, 0 8px 32px rgba(0,0,0,0.08)`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: theme.palette.mode === 'dark'
                  ? `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${colors.light}`
                  : `0 30px 80px ${colors.light}, 0 12px 40px rgba(0,0,0,0.12)`,
              }
            }}
          >
            <CardItem translateZ={5}>
              <Box
                sx={{
                  height: '6px',
                  background: colors.gradient,
                  boxShadow: `0 4px 12px ${colors.light}`,
                }}
              />
            </CardItem>

            <Box sx={{ p: 3, flexGrow: 1, position: 'relative' }}>
              {service.badge && (
                <CardItem translateZ={20}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: 16,
                      px: 2.5,
                      py: 0.75,
                      borderRadius: '16px',
                      background: colors.gradient,
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.8,
                      boxShadow: `0 8px 24px ${colors.light}`,
                      display: 'flex',
                      alignItems: 'center',
                      animation: 'energyPulse 2s ease-in-out infinite',
                    }}
                  >
                    <MdStar style={{ marginRight: 4, fontSize: '0.9rem' }} />
                    {service.badge}
                  </Box>
                </CardItem>
              )}

              <CardItem translateZ={30}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '20px',
                    background: colors.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                    boxShadow: `0 12px 32px ${colors.light}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(5deg) scale(1.1)',
                      boxShadow: `0 16px 40px ${colors.light}`,
                    }
                  }}
                >
                  <Icon style={{ 
                    color: '#fff', 
                    fontSize: '2rem',
                  }} />
                </Box>
              </CardItem>

              <CardItem translateZ={20}>
                <Typography
                  variant="h6"
                  sx={{ 
                    fontWeight: 800, 
                    mb: 1.5, 
                    color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                    fontSize: '1.35rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {service.title}
                </Typography>
              </CardItem>

              <CardItem translateZ={15}>
                <Typography
                  variant="body2"
                  sx={{ 
                    color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569', 
                    mb: 2.5, 
                    lineHeight: 1.7,
                    fontSize: '0.9rem',
                  }}
                >
                  {service.description}
                </Typography>
              </CardItem>

              <CardItem translateZ={10}>
                <Box sx={{ mb: 2 }}>
                  {service.features.map((feature, i) => (
                    <Box 
                      key={i}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <MdCheckCircle style={{ 
                        color: colors.main, 
                        fontSize: '1rem' 
                      }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
                          fontSize: '0.85rem',
                        }}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardItem>

              <CardItem translateZ={25}>
                <Box 
                  sx={{ 
                    mb: 2.5,
                    p: 2,
                    borderRadius: '16px',
                    background: theme.palette.mode === 'dark' 
                      ? `linear-gradient(135deg, ${colors.light}, rgba(255,255,255,0.03))` 
                      : `linear-gradient(135deg, ${colors.light}, rgba(255,255,255,0.5))`,
                    border: theme.palette.mode === 'dark'
                      ? `1px solid ${colors.light}`
                      : `1px solid ${colors.light}`,
                  }}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 900,
                      background: colors.gradient,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 0.5,
                    }}
                  >
                    {service.projects}+
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1.2,
                      fontSize: '0.75rem',
                    }}
                  >
                    projects done
                  </Typography>
                </Box>
              </CardItem>

              <CardItem translateZ={15}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 2.5,
                    color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                    fontSize: '1.1rem',
                  }}
                >
                  {service.price}
                </Typography>
              </CardItem>

              <CardItem translateZ={35}>
                <Button
                  component={Link}
                  to={`/services/${service.slug}`}
                  variant="contained"
                  fullWidth
                  endIcon={<FaArrowRight />}
                  sx={{ 
                    borderRadius: '16px', 
                    py: 1.5, 
                    textTransform: 'none', 
                    fontWeight: 700,
                    fontSize: '1rem',
                    background: colors.gradient,
                    boxShadow: `0 12px 32px ${colors.light}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
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
                    '&:hover': {
                      boxShadow: `0 16px 48px ${colors.light}`,
                      transform: 'translateY(-3px) scale(1.02)',
                    },
                    '&:hover::before': {
                      left: '100%'
                    }
                  }}
                >
                  Get Started
                </Button>
              </CardItem>
            </Box>
          </Box>
        </CardBody>
      </CardContainer>
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
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
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
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800, 
                fontSize: { xs: '0.95rem', md: '1.15rem' },
                letterSpacing: 3,
                mb: 2,
                display: 'block'
              }}
            >
              ✨ WHAT WE OFFER ✨
            </Typography>
            
            <Typography 
              variant="h1" 
              component="h2"
              sx={{ 
                fontWeight: 900, 
                color: theme.palette.text.primary,
                mb: { xs: 3, md: 4 },
                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                lineHeight: 1.1
              }}
            >
              Our{' '}
              <span style={{ 
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #818cf8 0%, #f472b6 50%, #38bdf8 100%)'
                  : 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #0ea5e9 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Services
              </span>
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569', 
                maxWidth: '700px', 
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                fontWeight: 400
              }}
            >
              🚀 Transforming ideas into powerful digital solutions with cutting-edge technology and innovative design
            </Typography>
          </Box>
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {servicesData.map((service, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
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
                <Grid item key={idx} xs={12} sm={6} md={4}>
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
