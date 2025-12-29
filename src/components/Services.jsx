import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Button, useTheme, Grid } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { FaCode, FaGlobe, FaMobileAlt, FaArrowRight } from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdCloud, MdStar, MdCheckCircle } from 'react-icons/md';
import { AnimatedDashboardShowcase } from './AnimatedDashboardShowcase';

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

// Modern Glassmorphism Service Card
const ServiceCard3D = ({ service, index, theme }) => {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const colors = useMemo(() => {
    const isDark = theme.palette.mode === 'dark';
    // Skyblue Theme Integration
    return {
      gradient: isDark
        ? 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)' // Darker skyblue/blue
        : 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', // Very light skyblue
      main: isDark ? '#38bdf8' : '#0284c7', // Sky-400 : Sky-600
      light: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(14, 165, 233, 0.08)',
      border: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.15)',
      shadow: isDark ? 'rgba(14, 165, 233, 0.25)' : 'rgba(2, 132, 199, 0.15)',
      iconBg: isDark ? 'rgba(56, 189, 248, 0.1)' : '#ffffff',
    };
  }, [theme.palette.mode]);

  return (
    <Box
      component={motion.div}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        bounce: 0.4,
        layout: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: 'auto',
        minHeight: '100%',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          height: '100%',
          p: { xs: 3, sm: 4 },
          borderRadius: '24px',
          background: theme.palette.mode === 'dark'
            ? 'rgba(15, 23, 42, 0.6)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.border}`,
          boxShadow: isHovered
            ? `0 20px 40px -10px ${colors.shadow}, 0 0 0 1px ${colors.border}`
            : `0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 0 0 1px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
          transition: 'box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Glow Effect */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: `radial-gradient(circle at 50% -20%, ${colors.main}20, transparent 70%)`,
            opacity: isHovered ? 1 : 0.5,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Badge */}
        {service.badge && (
          <Box
            sx={{
              position: 'absolute',
              top: 24,
              right: 24,
              px: 1.5,
              py: 0.5,
              borderRadius: '20px',
              background: colors.gradient,
              border: `1px solid ${colors.border}`,
              color: theme.palette.mode === 'dark' ? '#fff' : '#0284c7',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              zIndex: 2,
            }}
          >
            {service.badge}
          </Box>
        )}

        {/* Icon Container */}
        <Box
          sx={{
            width: { xs: 64, sm: 80 },
            height: { xs: 64, sm: 80 },
            borderRadius: '20px',
            background: colors.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            boxShadow: theme.palette.mode === 'dark'
              ? 'none'
              : '0 10px 20px -5px rgba(0,0,0,0.05)',
            border: `1px solid ${colors.border}`,
            position: 'relative',
            zIndex: 1,
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          <Icon size={36} color={colors.main} />
        </Box>

        {/* Content */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 2,
            textAlign: 'center',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            color: theme.palette.mode === 'dark' ? '#f8fafc' : '#0f172a',
          }}
        >
          {service.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
            lineHeight: 1.6,
            textAlign: 'center',
            mb: 3,
            fontSize: { xs: '0.875rem', sm: '0.95rem' },
          }}
        >
          {service.description}
        </Typography>

        {/* Expandable Content Section */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ overflow: 'hidden', width: '100%' }}
        >
          <Box sx={{ width: '100%', mb: 3, pl: 1, pt: 1, borderTop: `1px dashed ${colors.border}` }}>
            <Typography variant="subtitle2" sx={{ mb: 2, mt: 2, fontWeight: 700, color: colors.main, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>
              What's Included
            </Typography>
            {service.features.map((feature, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <MdCheckCircle size={18} color={colors.main} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569' }}>
                  {feature}
                </Typography>
              </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, p: 2, borderRadius: '12px', background: colors.light }}>
              <Box>
                <Typography variant="caption" sx={{ display: 'block', color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Starting at
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: colors.main }}>
                  {service.price}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ display: 'block', color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b' }}>
                  Completed
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b' }}>
                  {service.projects}+
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, width: '100%', mt: 'auto', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: '14px',
              py: 1.25,
              textTransform: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              borderColor: colors.border,
              color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#334155',
              borderWidth: '1.5px',
              '&:hover': {
                borderColor: colors.main,
                background: colors.light,
                borderWidth: '1.5px',
              },
            }}
          >
            {isExpanded ? 'Less Info' : 'More Info'}
          </Button>
          <Button
            component={Link}
            to={`/services/${service.slug}`}
            fullWidth
            variant="contained"
            sx={{
              borderRadius: '14px',
              py: 1.25,
              textTransform: 'none',
              fontSize: '0.9rem',
              fontWeight: 700,
              background: theme.palette.mode === 'dark' ? '#38bdf8' : '#0284c7',
              color: '#fff',
              boxShadow: 'none',
              '&:hover': {
                background: theme.palette.mode === 'dark' ? '#0ea5e9' : '#0369a1',
                boxShadow: `0 10px 20px -10px ${colors.shadow}`,
              },
            }}
          >
            View Details
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
    <Box component="section" id="services" sx={{
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
              radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(30, 64, 175, 0.03) 0%, transparent 50%)
            `
            : `
              radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.03) 0%, transparent 50%),
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
                  ? 'linear-gradient(135deg, #38bdf8, #bae6fd)'
                  : 'linear-gradient(135deg, #0284c7, #0ea5e9)',
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
                    ? 'linear-gradient(135deg, #38bdf8 0%, #bae6fd 100%)'
                    : 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
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
            <Grid key={service.slug} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
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
                  ? 'linear-gradient(135deg, #38bdf8 0%, #bae6fd 100%)'
                  : 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2.2rem', md: '2.8rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Why Choose <span style={{ color: theme.palette.mode === 'dark' ? '#38bdf8' : '#0284c7' }}>D</span>ev<span style={{ color: theme.palette.mode === 'dark' ? '#38bdf8' : '#0284c7' }}>O</span>ra?
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

                {/* Animated Dashboard Showcases - Shows second on mobile */}
                <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
                  <AnimatedDashboardShowcase theme={theme} />
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
      </Container >
    </Box >
  );
});

export default Services;
