import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Button, Chip, useTheme, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaCode, FaGlobe, FaMobileAlt, FaArrowRight, FaRocket, FaLightbulb, FaGem, FaHeart } from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdCloud, MdTrendingUp, MdVerified, MdAutoAwesome, MdDiamond } from 'react-icons/md';
import AOS from 'aos';

// Services data - will be enhanced with theme colors in component
const servicesData = [
  {
    slug: 'software-development',
    title: 'Software Development',
    description: 'Custom enterprise software solutions built with cutting-edge technologies. Scalable, secure, and maintainable applications.',
    icon: FaCode,
    colorKey: 'primary',
    features: ['Custom Solutions', 'Enterprise Grade', 'Cloud Ready'],
    price: 'Starting at $5,000',
    badge: 'Most Popular',
    floatingIcons: [MdSpeed, MdSecurity, MdCloud],
    popularity: 95,
    satisfaction: 98,
    projects: 150
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    description: 'Stunning, responsive websites that convert visitors into customers. Modern designs with exceptional performance.',
    icon: FaGlobe,
    colorKey: 'secondary',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
    price: 'Starting at $2,500',
    badge: 'Best Value',
    floatingIcons: [FaRocket, FaLightbulb, MdTrendingUp],
    popularity: 92,
    satisfaction: 96,
    projects: 200
  },
  {
    slug: 'app-development',
    title: 'App Development',
    description: 'Native and cross-platform mobile apps that engage users and drive business growth on iOS and Android.',
    icon: FaMobileAlt,
    colorKey: 'tertiary',
    features: ['Cross Platform', 'Native Performance', 'App Store Ready'],
    price: 'Starting at $8,000',
    badge: 'Premium',
    floatingIcons: [FaGem, FaHeart, MdVerified],
    popularity: 88,
    satisfaction: 94,
    projects: 120
  }
];

const FloatingServiceIcon = ({ icon: Icon, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      position: 'absolute',
      color,
      fontSize: '1.2rem',
      zIndex: 1
    }}
  >
    <Icon />
  </motion.div>
);

const ParticleEffect = ({ color, count = 8 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 2
  }));

  return (
    <>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: '4px',
            height: '4px',
            background: color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      ))}
    </>
  );
};

const ProgressBar = ({ value, color, label, theme }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
        {value}%
      </Typography>
    </Box>
    <Box sx={{ position: 'relative' }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255,255,255,0.1)' 
            : 'rgba(0,0,0,0.1)',
          '& .MuiLinearProgress-bar': {
            background: color,
            borderRadius: 3,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'shimmer 2s ease-in-out infinite'
            }
          }
        }}
      />
    </Box>
  </Box>
);

// Modern, colorful, and attractive service card with smooth performance
const ServiceCardSimple = ({ service, index, theme }) => {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = React.useState(false);
  
  const colors = {
    gradient: service.colorKey === 'secondary'
      ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      : service.colorKey === 'tertiary'
        ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    main: service.colorKey === 'secondary' ? '#f093fb' : service.colorKey === 'tertiary' ? '#4facfe' : '#667eea',
    light: service.colorKey === 'secondary' ? 'rgba(240, 147, 251, 0.15)' : service.colorKey === 'tertiary' ? 'rgba(79, 172, 254, 0.15)' : 'rgba(102, 126, 234, 0.15)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
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
            ? `linear-gradient(145deg, rgba(20,24,35,0.95) 0%, rgba(30,35,50,0.95) 100%)`
            : `linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)`,
          border: `2px solid ${isHovered ? colors.main : 'transparent'}`,
          boxShadow: isHovered
            ? `0 20px 60px ${colors.light}, 0 0 0 1px ${colors.main}40`
            : (theme.palette.mode === 'dark' ? '0 10px 40px rgba(0,0,0,0.4)' : '0 10px 40px rgba(0,0,0,0.08)'),
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: colors.gradient,
            opacity: isHovered ? 1 : 0.7,
            transition: 'opacity 0.3s ease'
          }
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 }, flexGrow: 1, position: 'relative' }}>
          {/* Decorative gradient orb - removed for performance */}

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {/* Icon with animated gradient background */}
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: '22px',
                  background: colors.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  boxShadow: `0 8px 20px ${colors.light}`,
                  position: 'relative'
                }}
              >
                <Icon style={{ color: '#fff', fontSize: '2.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
              </Box>
            </motion.div>

            {/* Badge */}
            {service.badge && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  px: 2,
                  py: 0.5,
                  borderRadius: '12px',
                  background: colors.gradient,
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  boxShadow: `0 4px 12px ${colors.light}`
                }}
              >
                {service.badge}
              </Box>
            )}

            <Typography
              variant="h5"
              sx={{ 
                fontWeight: 800, 
                mb: 1.5, 
                background: colors.gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.4rem', md: '1.6rem' }
              }}
            >
              {service.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary, mb: 3, lineHeight: 1.7, fontSize: '0.95rem' }}
            >
              {service.description}
            </Typography>

            {/* Features with colorful icons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%', mb: 3 }}>
              {service.features.slice(0, 3).map((f, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '8px',
                      background: colors.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 600, textAlign: 'left' }}>{f}</Typography>
                </Box>
              ))}
            </Box>

            {/* Stats with gradient progress */}
            <Box sx={{ width: '100%', mb: 3 }}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>Projects</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: colors.main }}>{service.projects}+</Typography>
                </Box>
                <Box sx={{ height: 6, borderRadius: 3, background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                  <Box sx={{ width: '100%', height: '100%', background: colors.gradient, borderRadius: 3 }} />
                </Box>
              </Box>
            </Box>

            {/* Price */}
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800, 
                mb: 2.5,
                color: theme.palette.text.primary,
                fontSize: '1.1rem'
              }}
            >
              {service.price}
            </Typography>

            {/* CTA Button */}
            <Button
              component={Link}
              to={`/services/${service.slug}`}
              variant="contained"
              endIcon={<FaArrowRight />}
              sx={{ 
                borderRadius: '999px', 
                px: 4, 
                py: 1.5, 
                textTransform: 'none', 
                fontWeight: 700,
                background: colors.gradient,
                boxShadow: `0 8px 20px ${colors.light}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: `0 12px 28px ${colors.light}`,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Explore Service
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Why Choose Us Card Component - Optimized for smooth scrolling
const WhyChooseCard = ({ feature, index, theme }) => {
  const [hovered, setHovered] = React.useState(false);
  const IconComponent = feature.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{ 
          height: '100%',
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(145deg, rgba(20,24,35,0.95) 0%, rgba(30,35,50,0.95) 100%)`
            : `linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)`,
          border: `2px solid ${hovered ? feature.iconBg : 'transparent'}`,
          boxShadow: hovered
            ? `0 12px 32px ${feature.bgColor}`
            : (theme.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.06)'),
          transition: 'all 0.3s ease',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          position: 'relative',
          overflow: 'hidden',
          willChange: hovered ? 'transform' : 'auto',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: feature.color,
            opacity: hovered ? 1 : 0.7,
            transition: 'opacity 0.3s ease'
          }
        }}
      >
        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Icon */}
          <Box sx={{
            width: 90,
            height: 90,
            borderRadius: '22px',
            background: feature.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            boxShadow: `0 8px 20px ${feature.bgColor}`,
            transition: 'transform 0.3s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            willChange: hovered ? 'transform' : 'auto'
          }}>
            <IconComponent style={{ fontSize: '2.2rem', color: '#fff', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
          </Box>

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
        </Box>
      </Card>
    </Grid>
  );
};

const ServiceCard = ({ service, index, theme }) => {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  
  // Get theme-aware colors
  const getServiceColors = (colorKey) => {
    const colorMap = {
      primary: {
        gradient: theme.palette.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        main: theme.palette.primary.main,
        light: theme.palette.primary.light,
        dark: theme.palette.primary.dark,
        particle: theme.palette.mode === 'dark' 
          ? 'rgba(102, 126, 234, 0.8)' 
          : 'rgba(102, 126, 234, 0.6)'
      },
      secondary: {
        gradient: theme.palette.gradient?.secondary || 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        main: theme.palette.secondary.main,
        light: theme.palette.secondary.light,
        dark: theme.palette.secondary.dark,
        particle: theme.palette.mode === 'dark' 
          ? 'rgba(240, 147, 251, 0.8)' 
          : 'rgba(240, 147, 251, 0.6)'
      },
      tertiary: {
        gradient: theme.palette.gradient?.tertiary || 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        main: theme.palette.tertiary?.main || '#4facfe',
        light: theme.palette.tertiary?.light || '#7bc8fe',
        dark: theme.palette.tertiary?.dark || '#2196f3',
        particle: theme.palette.mode === 'dark' 
          ? 'rgba(79, 172, 254, 0.8)' 
          : 'rgba(79, 172, 254, 0.6)'
      }
    };
    return colorMap[colorKey] || colorMap.primary;
  };
  
  const colors = getServiceColors(service.colorKey);
  
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePosition({ x, y });
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -20, 
        rotateY: 8, 
        rotateX: 5,
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ 
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
    >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: '30px',
          overflow: 'hidden',
          position: 'relative',
          background: theme.palette.mode === 'dark'
            ? (isHovered 
                ? 'rgba(18, 21, 32, 0.9)' 
                : 'rgba(18, 21, 32, 0.7)')
            : (isHovered 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(255, 255, 255, 0.85)'),
          backdropFilter: 'blur(12px)',
          boxShadow: theme.palette.mode === 'dark'
            ? (isHovered
                ? `0 30px 100px rgba(0,0,0,0.6), 0 0 60px ${colors.particle}`
                : '0 20px 60px rgba(0,0,0,0.4)')
            : (isHovered
                ? `0 30px 100px rgba(0,0,0,0.2), 0 0 60px ${colors.particle}`
                : '0 20px 60px rgba(0,0,0,0.1)'),
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          border: theme.palette.mode === 'dark'
            ? (isHovered 
                ? `2px solid rgba(255,255,255,0.3)` 
                : `1px solid rgba(255,255,255,0.1)`)
            : (isHovered 
                ? `2px solid rgba(255,255,255,0.8)` 
                : `1px solid rgba(255,255,255,0.4)`),
          transform: isHovered 
            ? `rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)` 
            : 'rotateX(0deg) rotateY(0deg)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: colors.gradient,
            backgroundSize: '400% 400%',
            animation: 'holographicShift 8s ease infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: isHovered ? '400px' : '0',
            height: isHovered ? '400px' : '0',
            background: `radial-gradient(circle, ${colors.particle} 0%, transparent 70%)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: isHovered ? 0.15 : 0,
            zIndex: 0,
            filter: 'blur(12px)'
          }
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center', flexGrow: 1, position: 'relative', zIndex: 2 }}>
          {/* Particle Effects */}
          <AnimatePresence>
            {isHovered && (
              <ParticleEffect color={colors.particle} count={12} />
            )}
          </AnimatePresence>
          {/* Enhanced Badge */}
          {service.badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotateZ: -10 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotateZ: 5 }}
              style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                zIndex: 3
              }}
            >
              <Chip
                label={service.badge}
                icon={<MdAutoAwesome style={{ color: 'white', fontSize: '1rem' }} />}
                sx={{
                  background: colors.gradient,
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  boxShadow: `0 6px 20px ${colors.particle}`,
                  border: '1px solid rgba(255,255,255,0.3)',
                  '&:hover': {
                    animation: 'neonGlow 2s ease-in-out infinite'
                  }
                }}
              />
            </motion.div>
          )}
          
          {/* Floating Icons */}
          <AnimatePresence>
            {isHovered && service.floatingIcons.map((FloatIcon, idx) => (
              <FloatingServiceIcon
                key={idx}
                icon={FloatIcon}
                delay={idx * 0.2}
                color={colors.main}
              />
            ))}
          </AnimatePresence>
          <motion.div
            animate={isHovered ? { 
              rotate: 360, 
              scale: 1.15,
              y: -5
            } : { 
              rotate: 0, 
              scale: 1,
              y: 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Box 
              sx={{ 
                width: { xs: 90, md: 100 }, 
                height: { xs: 90, md: 100 }, 
                borderRadius: '50%', 
                background: colors.gradient,
                backgroundSize: '400% 400%',
                animation: isHovered ? 'holographicShift 4s ease infinite' : 'gradientShift 6s ease infinite',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: { xs: 2, md: 3 },
                boxShadow: isHovered 
                  ? `0 15px 40px ${colors.particle}, 0 0 40px ${colors.particle}`
                  : (theme.palette.mode === 'dark' 
                      ? '0 12px 35px rgba(0,0,0,0.6)' 
                      : '0 12px 35px rgba(0,0,0,0.25)'),
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  right: '-8px',
                  bottom: '-8px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.light} 100%)`,
                  opacity: isHovered ? 0.6 : 0.3,
                  animation: isHovered ? 'energyPulse 1.5s ease infinite' : 'pulse 3s ease infinite',
                  transition: 'opacity 0.3s ease'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '120%',
                  height: '120%',
                  background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: isHovered ? 'spin 2s linear infinite' : 'none',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }
              }}
            >
              <Icon style={{ 
                fontSize: '2.5rem', 
                color: 'white', 
                filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))',
                zIndex: 1,
                position: 'relative'
              }} />
            </Box>
          </motion.div>
          
          <motion.div
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Typography 
              variant="h5" 
              component="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 800, 
                background: colors.gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '1.3rem', md: '1.5rem' }
              }}
            >
              {service.title}
            </Typography>
          </motion.div>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.text.secondary, 
              mb: 3, 
              lineHeight: 1.6,
              fontSize: '1rem'
            }}
          >
            {service.description}
          </Typography>

          {/* Enhanced Features */}
          <Box sx={{ mb: 3 }}>
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + idx * 0.1 }}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mb: 1.5,
                    p: 1,
                    borderRadius: '12px',
                    background: isHovered 
                      ? (theme.palette.mode === 'dark' 
                          ? 'rgba(255,255,255,0.05)' 
                          : 'rgba(255,255,255,0.3)')
                      : 'transparent',
                    backdropFilter: 'blur(6px)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <motion.div
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  >
                    <MdDiamond style={{ 
                      color: colors.main, 
                      marginRight: '10px', 
                      fontSize: '1rem',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }} />
                  </motion.div>
                  <Typography variant="body2" sx={{ 
                    color: theme.palette.text.secondary, 
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}>
                    {feature}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* Progress Indicators */}
          <Box sx={{ mb: 3, px: 1 }}>
            <ProgressBar 
              value={service.popularity} 
              color={colors.gradient} 
              label="Popularity" 
              theme={theme}
            />
            <ProgressBar 
              value={service.satisfaction} 
              color={`linear-gradient(135deg, ${colors.dark} 0%, ${colors.light} 100%)`} 
              label="Satisfaction" 
              theme={theme}
            />
          </Box>

          {/* Project Counter */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.2 + 0.8, type: "spring", stiffness: 200 }}
          >
            <Box sx={{ 
              mb: 3, 
              p: 2, 
              borderRadius: '15px',
              background: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.03)' 
                : 'rgba(255,255,255,0.4)',
              backdropFilter: 'blur(6px)',
              border: theme.palette.mode === 'dark' 
                ? '1px solid rgba(255,255,255,0.08)' 
                : '1px solid rgba(255,255,255,0.3)'
            }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 800,
                background: colors.gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5
              }}>
                {service.projects}+
              </Typography>
              <Typography variant="caption" sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1
              }}>
                Projects Completed
              </Typography>
            </Box>
          </motion.div>

          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              mb: 3,
              background: colors.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {service.price}
          </Typography>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              endIcon={
                <motion.div
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaArrowRight />
                </motion.div>
              }
              component={Link}
              to={`/services/${service.slug}`}
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 2,
                background: colors.gradient,
                backgroundSize: '200% 200%',
                boxShadow: `0 6px 20px ${colors.particle}`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: `0 10px 30px ${colors.particle}`,
                  animation: 'gradientShift 2s ease infinite'
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transition: 'left 0.6s ease'
                },
                '&:hover::before': {
                  left: '100%'
                }
              }}
            >
              Explore Service
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Services = () => {
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
  }, [disableDecor]);

  return (
    <Box sx={{ 
      py: { xs: 8, md: 12 }, 
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(180deg, #0b0d12 0%, #1a1d29 50%, #0f1320 100%)'
        : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
      transition: 'background 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.08) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(79, 172, 254, 0.08) 0%, transparent 50%)'
          : 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.05) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(79, 172, 254, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      {/* Enhanced Background decorations (disabled on small screens/reduced motion) */}
      {!disableDecor && (
      <>
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))'
            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(240, 147, 251, 0.2), rgba(245, 87, 108, 0.2))'
            : 'linear-gradient(135deg, rgba(240, 147, 251, 0.15), rgba(245, 87, 108, 0.15))',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: '60%',
          left: '10%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(79, 172, 254, 0.15), rgba(0, 242, 254, 0.15))'
            : 'linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1))',
          filter: 'blur(40px)',
        }}
      />
      </>
      )}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box textAlign="center" sx={{ mb: { xs: 8, md: 10 } }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography 
                variant="overline" 
                sx={{ 
                  background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradientShift 3s ease infinite',
                  fontWeight: 700, 
                  fontSize: { xs: '0.9rem', md: '1.1rem' },
                  letterSpacing: { xs: 2, md: 3 },
                  mb: 2
                }}
              >
                ✨ WHAT WE OFFER ✨
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography 
                variant="h1" 
                component="h2"
                sx={{ 
                  fontWeight: 900, 
                  color: '#2c3e50',
                  mb: { xs: 3, md: 4 },
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                  px: { xs: 1, sm: 0 },
                  lineHeight: 1.1
                }}
              >
                Our{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'holographicShift 6s ease infinite',
                  position: 'relative'
                }}>
                  Services
                </span>
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#64748b', 
                  maxWidth: { xs: '95%', sm: '85%', md: '700px' }, 
                  mx: 'auto',
                  lineHeight: 1.7,
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  px: { xs: 1, sm: 0 },
                  fontWeight: 400
                }}
              >
                🚀 Transforming ideas into powerful digital solutions with cutting-edge technology and innovative design that drives real business growth
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {servicesData.map((service, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <ServiceCardSimple service={service} index={index} theme={theme} />
            </Grid>
          ))}
        </Grid>

        {/* Enhanced Why Choose Us section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box sx={{ mt: { xs: 12, md: 16 }, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
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
                Why Choose DevOra?
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
            </motion.div>
            <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
              {[
                {
                  icon: MdSpeed,
                  title: 'Lightning Fast',
                  description: 'Optimized performance and rapid development cycles that deliver results in record time',
                  color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  bgColor: 'rgba(102, 126, 234, 0.1)',
                  iconBg: '#667eea'
                },
                {
                  icon: MdSecurity,
                  title: 'Secure & Reliable',
                  description: 'Enterprise-grade security protocols and 99.9% uptime guarantee for peace of mind',
                  color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  bgColor: 'rgba(240, 147, 251, 0.1)',
                  iconBg: '#f093fb'
                },
                {
                  icon: MdCloud,
                  title: 'Cloud Ready',
                  description: 'Scalable cloud infrastructure and modern deployment strategies for global reach',
                  color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  bgColor: 'rgba(79, 172, 254, 0.1)',
                  iconBg: '#4facfe'
                }
              ].map((feature, idx) => (
                <WhyChooseCard key={idx} feature={feature} index={idx} theme={theme} />
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Services;
