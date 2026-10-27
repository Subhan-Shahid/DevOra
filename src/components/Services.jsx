import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Button, useTheme, Grid } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { FaCode, FaGlobe, FaMobileAlt, FaArrowRight, FaBolt, FaCrown, FaGem } from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdCloud, MdStar, MdCheckCircle } from 'react-icons/md';
import { AnimatedDashboardShowcase } from './AnimatedDashboardShowcase';

// Optimized services data
const servicesData = [
  {
    slug: 'software-development',
    title: 'Software Development',
    description: 'Transform your vision into reality with enterprise-grade software that scales effortlessly. We craft intelligent, future-proof solutions using cutting-edge tech stacks that drive real business results.',
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
    description: 'Launch stunning websites that captivate visitors and convert them into loyal customers. Lightning-fast performance meets jaw-dropping design—your digital presence, elevated to perfection.',
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
    description: 'Build powerful mobile experiences that users love and can\'t put down. From iOS to Android, we deliver native-quality apps that engage, delight, and accelerate your business growth exponentially.',
    icon: FaMobileAlt,
    colorKey: 'tertiary',
    features: ['Cross Platform', 'Native Performance', 'App Store Ready'],
    price: 'Starting from 50k PKR',
    badge: 'Premium',
    projects: 10
  }
];

// Modern Professional Service Card (Cohesive Enterprise Theme)
const ServiceCard = ({ service, theme }) => {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isDark = theme.palette.mode === 'dark';

  // Cohesive Stackora Blue Enterprise Palette (No funky colors)
  const colors = useMemo(() => {
    return {
      primary: isDark ? '#38bdf8' : '#0284c7',
      primaryHover: isDark ? '#0ea5e9' : '#0369a1',
      accent: '#0ea5e9',
      gradient: isDark
        ? 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)'
        : 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
      cardBg: isDark
        ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.75) 100%)'
        : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.94) 100%)',
      border: isDark
        ? '1px solid rgba(56, 189, 248, 0.2)'
        : '1px solid rgba(2, 132, 199, 0.18)',
      borderHover: isDark
        ? '1px solid rgba(56, 189, 248, 0.5)'
        : '1px solid rgba(2, 132, 199, 0.45)',
      glow: isDark ? 'rgba(56, 189, 248, 0.25)' : 'rgba(2, 132, 199, 0.15)',
      badgeBg: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.08)',
      badgeBorder: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.25)',
      iconBg: isDark ? 'rgba(15, 23, 42, 0.9)' : '#f8fafc',
    };
  }, [isDark]);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        minHeight: '100%',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: '24px',
          background: colors.cardBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isHovered ? colors.borderHover : colors.border,
          boxShadow: isHovered
            ? isDark
              ? `0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 25px ${colors.glow}`
              : `0 20px 40px -10px rgba(15, 23, 42, 0.15), 0 0 20px ${colors.glow}`
            : isDark
            ? '0 8px 24px -5px rgba(0, 0, 0, 0.4)'
            : '0 8px 20px -5px rgba(15, 23, 42, 0.06)',
          p: { xs: 3, sm: 3.5 },
          overflow: 'hidden',
          transition: 'border 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Sleek Top Shimmer Bar */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: colors.gradient,
            boxShadow: `0 1px 8px ${colors.glow}`,
          }}
        />

        {/* Ambient Top Light Sheen */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(circle at 50% -10%, ${colors.primary}12, transparent 65%)`,
            opacity: isHovered ? 1 : 0.4,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Header Row: Badge */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 1, minHeight: 26 }}>
          {service.badge && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.6,
                px: 1.4,
                py: 0.4,
                borderRadius: '20px',
                background: colors.badgeBg,
                border: `1px solid ${colors.badgeBorder}`,
                color: colors.primary,
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: colors.primary,
                  boxShadow: `0 0 6px ${colors.primary}`,
                }}
              />
              {service.badge}
            </Box>
          )}
        </Box>

        {/* Icon Pod (Clean, Anodized Tech Surface) */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '20px',
              background: colors.iconBg,
              border: colors.border,
              boxShadow: isHovered
                ? `0 12px 28px -6px ${colors.glow}`
                : `0 6px 18px -4px rgba(0, 0, 0, 0.1)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'transform 0.3s ease, border 0.3s ease',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <Icon size={34} color={colors.primary} />
          </Box>
        </Box>

        {/* Service Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 1.5,
            textAlign: 'center',
            fontSize: { xs: '1.25rem', sm: '1.4rem' },
            color: isDark ? '#f8fafc' : '#0f172a',
            letterSpacing: '-0.02em',
          }}
        >
          {service.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: isDark ? '#94a3b8' : '#475569',
            lineHeight: 1.65,
            textAlign: 'center',
            mb: 3,
            fontSize: { xs: '0.88rem', sm: '0.94rem' },
            flexGrow: 1,
          }}
        >
          {service.description}
        </Typography>

        {/* Feature Pills */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.8,
            justifyContent: 'center',
            mb: 2.5,
          }}
        >
          {service.features.map((feat, i) => (
            <Box
              key={i}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.6,
                px: 1.2,
                py: 0.4,
                borderRadius: '10px',
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <MdCheckCircle size={13} color={colors.primary} />
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: isDark ? '#cbd5e1' : '#334155' }}>
                {feat}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Expandable Section */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden', width: '100%' }}
        >
          <Box sx={{ width: '100%', mb: 2.5, pt: 1.5, borderTop: `1px dashed ${isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.2)'}` }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1.8,
                borderRadius: '14px',
                background: isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                border: colors.border,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '0.62rem', color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Starting at
                </Typography>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: colors.primary }}>
                  {service.price}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontSize: '0.62rem', color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Delivered
                </Typography>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: isDark ? '#f1f5f9' : '#0f172a' }}>
                  {service.projects}+ Projects
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Action Buttons (Guaranteed Clickable & Functional) */}
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            width: '100%',
            mt: 'auto',
            position: 'relative',
            zIndex: 25,
            pointerEvents: 'auto',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            fullWidth
            variant="outlined"
            sx={{
              borderRadius: '12px',
              py: 1.2,
              textTransform: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              borderColor: isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(203, 213, 225, 0.9)',
              color: isDark ? '#e2e8f0' : '#334155',
              borderWidth: '1.5px',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: colors.primary,
                background: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.05)',
                borderWidth: '1.5px',
              },
            }}
          >
            {isExpanded ? 'Less Info' : 'Quick Specs'}
          </Button>

          <Button
            component={Link}
            to={`/services/${service.slug}`}
            fullWidth
            variant="contained"
            endIcon={<FaArrowRight size={11} />}
            sx={{
              borderRadius: '12px',
              py: 1.2,
              textTransform: 'none',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: colors.gradient,
              color: '#ffffff',
              boxShadow: `0 4px 15px ${colors.glow}`,
              transition: 'all 0.25s ease',
              '&:hover': {
                background: colors.gradient,
                boxShadow: `0 8px 24px ${colors.glow}`,
              },
            }}
          >
            Explore Plan
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
              linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px),
              radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.06) 0%, transparent 60%)
            `
            : `
              linear-gradient(to right, rgba(14, 165, 233, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(14, 165, 233, 0.04) 1px, transparent 1px),
              radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.04) 0%, transparent 60%)
            `,
          backgroundSize: '40px 40px, 40px 40px, 100% 100%',
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
              WHAT WE OFFER
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
              Transforming ideas into powerful digital solutions with enterprise-grade technology and trusted expertise
            </Typography>
          </Box>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }} justifyContent="center">
          {servicesData.map((service) => (
            <Grid key={service.slug} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <ServiceCard service={service} theme={theme} />
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
              Why Choose <span style={{ color: theme.palette.mode === 'dark' ? '#38bdf8' : '#0284c7' }}>Stack</span>ora Softworks?
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
                      Interactive Dashboards
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
