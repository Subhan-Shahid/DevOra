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
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        main: '#667eea',
        light: 'rgba(102, 126, 234, 0.15)',
      },
      secondary: {
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        main: '#f093fb',
        light: 'rgba(240, 147, 251, 0.15)',
      },
      tertiary: {
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        main: '#4facfe',
        light: 'rgba(79, 172, 254, 0.15)',
      }
    };
    return colorMap[service.colorKey] || colorMap.primary;
  }, [service.colorKey]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <CardContainer containerClassName="py-0">
        <CardBody className="w-full h-auto">
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              background: theme.palette.mode === 'dark' 
                ? 'rgba(20,24,35,0.8)'
                : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid rgba(0,0,0,0.08)',
              boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <CardItem translateZ={5}>
              <Box
                sx={{
                  height: '4px',
                  background: colors.gradient,
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
                      px: 2,
                      py: 0.5,
                      borderRadius: '12px',
                      background: colors.gradient,
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      boxShadow: `0 4px 12px ${colors.light}`,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <MdStar style={{ marginRight: 4, fontSize: '0.8rem' }} />
                    {service.badge}
                  </Box>
                </CardItem>
              )}

              <CardItem translateZ={30}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '16px',
                    background: colors.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    boxShadow: `0 8px 24px ${colors.light}`,
                  }}
                >
                  <Icon style={{ 
                    color: '#fff', 
                    fontSize: '1.8rem',
                  }} />
                </Box>
              </CardItem>

              <CardItem translateZ={20}>
                <Typography
                  variant="h6"
                  sx={{ 
                    fontWeight: 800, 
                    mb: 1.5, 
                    color: theme.palette.text.primary,
                    fontSize: '1.25rem',
                  }}
                >
                  {service.title}
                </Typography>
              </CardItem>

              <CardItem translateZ={15}>
                <Typography
                  variant="body2"
                  sx={{ 
                    color: theme.palette.text.secondary, 
                    mb: 2, 
                    lineHeight: 1.6,
                    fontSize: '0.85rem',
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
                          color: theme.palette.text.secondary, 
                          fontWeight: 500,
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
                    mb: 2,
                    p: 1.5,
                    borderRadius: '12px',
                    background: theme.palette.mode === 'dark' 
                      ? 'rgba(255,255,255,0.05)' 
                      : 'rgba(0,0,0,0.03)',
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 800,
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
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
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
                    fontWeight: 700, 
                    mb: 2,
                    color: theme.palette.text.primary,
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
                    borderRadius: '12px', 
                    py: 1.2, 
                    textTransform: 'none', 
                    fontWeight: 600,
                    background: colors.gradient,
                    boxShadow: `0 8px 24px ${colors.light}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 12px 32px ${colors.light}`,
                      transform: 'translateY(-2px)',
                    },
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
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: MdSecurity,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security and 99.9% uptime guarantee.',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: MdCloud,
    title: 'Cloud Ready',
    description: 'Scalable cloud solutions built for modern businesses.',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }
];

// Simple feature card component
const FeatureCard = ({ feature, index, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          background: theme.palette.mode === 'dark' 
            ? 'rgba(20,24,35,0.8)'
            : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(0,0,0,0.08)',
          boxShadow: isHovered
            ? (theme.palette.mode === 'dark' ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.15)')
            : (theme.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.1)'),
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
      >
        {/* Gradient accent bar at top */}
        <Box
          sx={{
            height: '4px',
            background: feature.color,
            opacity: isHovered ? 1 : 0.8,
            transition: 'opacity 0.3s ease',
          }}
        />

        <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, textAlign: 'center' }}>
          {/* Icon */}
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: '18px',
              background: feature.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: `0 8px 24px rgba(0,0,0,0.1)`,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease',
            }}
          >
            <IconComponent style={{ 
              color: '#fff', 
              fontSize: '1.8rem',
            }} />
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              background: feature.color,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.4rem', md: '1.5rem' }
            }}
          >
            {feature.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{ 
              color: theme.palette.text.secondary,
              lineHeight: 1.7,
              fontSize: '0.95rem'
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
      py: { xs: 8, md: 12 }, 
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(180deg, #0b0d12 0%, #1a1d29 50%, #0f1320 100%)'
        : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
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
            ? 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none'
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
                background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700, 
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                letterSpacing: 2,
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
                color: theme.palette.text.secondary, 
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
                fontWeight: 800, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Why Choose <span style={{ color: '#2563eb' }}>D</span>ev<span style={{ color: '#2563eb' }}>O</span>ra?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary, 
                mb: 8,
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Experience the difference with our cutting-edge approach to digital excellence
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
