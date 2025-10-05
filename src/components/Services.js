import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Button, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaCode, FaGlobe, FaMobileAlt, FaArrowRight, FaStar, FaRocket, FaLightbulb, FaGem, FaHeart } from 'react-icons/fa';
import { MdSpeed, MdSecurity, MdCloud, MdTrendingUp, MdVerified } from 'react-icons/md';
import AOS from 'aos';

const services = [
  {
    slug: 'software-development',
    title: 'Software Development',
    description: 'Custom enterprise software solutions built with cutting-edge technologies. Scalable, secure, and maintainable applications.',
    icon: FaCode,
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    features: ['Custom Solutions', 'Enterprise Grade', 'Cloud Ready'],
    price: 'Starting at $5,000',
    badge: 'Most Popular',
    floatingIcons: [MdSpeed, MdSecurity, MdCloud]
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    description: 'Stunning, responsive websites that convert visitors into customers. Modern designs with exceptional performance.',
    icon: FaGlobe,
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
    price: 'Starting at $2,500',
    badge: 'Best Value',
    floatingIcons: [FaRocket, FaLightbulb, MdTrendingUp]
  },
  {
    slug: 'app-development',
    title: 'App Development',
    description: 'Native and cross-platform mobile apps that engage users and drive business growth on iOS and Android.',
    icon: FaMobileAlt,
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    features: ['Cross Platform', 'Native Performance', 'App Store Ready'],
    price: 'Starting at $8,000',
    badge: 'Premium',
    floatingIcons: [FaGem, FaHeart, MdVerified]
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

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      whileHover={{ y: -15, rotateY: 5, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: '25px',
          overflow: 'hidden',
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(255,255,255,0.2)',
          '&:hover': {
            boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: service.color,
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '0',
            height: '0',
            background: `radial-gradient(circle, ${service.color.split(',')[0].split('(')[1]} 0%, transparent 70%)`,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.4s ease',
            opacity: 0,
            zIndex: 0
          },
          '&:hover::after': {
            width: '300px',
            height: '300px',
            opacity: 0.1
          }
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center', flexGrow: 1, position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          {service.badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 + 0.5 }}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '20px'
              }}
            >
              <Chip
                label={service.badge}
                sx={{
                  background: service.color,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
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
                color={service.color.split(',')[0].split('(')[1]}
              />
            ))}
          </AnimatePresence>
          <motion.div
            animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Box 
              sx={{ 
                width: { xs: 80, md: 90 }, 
                height: { xs: 80, md: 90 }, 
                borderRadius: '50%', 
                background: service.color,
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease infinite',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: { xs: 2, md: 3 },
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-5px',
                  left: '-5px',
                  right: '-5px',
                  bottom: '-5px',
                  borderRadius: '50%',
                  background: service.color,
                  opacity: 0.3,
                  animation: 'pulse 2s ease infinite'
                }
              }}
            >
              <Icon style={{ fontSize: '2.2rem', color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
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
                background: service.color,
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
              color: '#64748b', 
              mb: 3, 
              lineHeight: 1.6,
              fontSize: '1rem'
            }}
          >
            {service.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
            {service.features.map((feature, idx) => (
              <Box 
                key={idx}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 1 
                }}
              >
                <FaStar style={{ color: '#ffd700', marginRight: '8px', fontSize: '0.8rem' }} />
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>

          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: '#2c3e50', 
              mb: 3,
              background: service.color,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {service.price}
          </Typography>

          <Button
            variant="contained"
            endIcon={<FaArrowRight />}
            component={Link}
            to={`/services/${service.slug}`}
            sx={{
              borderRadius: '50px',
              px: 3,
              py: 1.5,
              background: service.color,
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
              }
            }}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Services = () => {
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
      py: { xs: 6, md: 10 }, 
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
          filter: 'blur(80px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box textAlign="center" sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: '#667eea', 
                fontWeight: 600, 
                fontSize: { xs: '0.8rem', md: '1rem' },
                letterSpacing: { xs: 1, md: 2 }
              }}
            >
              WHAT WE OFFER
            </Typography>
            <Typography 
              variant="h2" 
              component="h2"
              sx={{ 
                fontWeight: 800, 
                color: '#2c3e50',
                mb: { xs: 2, md: 3 },
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                px: { xs: 1, sm: 0 }
              }}
            >
              Our <span style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Services</span>
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#64748b', 
                maxWidth: { xs: '90%', sm: '80%', md: '600px' }, 
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.25rem' },
                px: { xs: 1, sm: 0 }
              }}
            >
              Transforming ideas into powerful digital solutions with cutting-edge technology and innovative design
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {services.map((service, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <ServiceCard service={service} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* Additional features section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box sx={{ mt: 10, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50', mb: 6 }}>
              Why Choose Us?
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <MdSpeed style={{ fontSize: '3rem', color: '#667eea', marginBottom: '1rem' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Lightning Fast</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Optimized performance and rapid development cycles
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <MdSecurity style={{ fontSize: '3rem', color: '#f093fb', marginBottom: '1rem' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Secure & Reliable</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Enterprise-grade security and 99.9% uptime guarantee
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <MdCloud style={{ fontSize: '3rem', color: '#4facfe', marginBottom: '1rem' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Cloud Ready</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Scalable cloud infrastructure and modern deployment
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Services;
