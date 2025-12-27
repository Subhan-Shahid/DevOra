import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Container, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Rocket, Target, Users, ChevronRight, CheckCircle } from 'lucide-react';

const BusinessGrowthSection = () => {
  const theme = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      icon: <TrendingUp size={32} />,
      title: "Revenue Growth",
      description: "Strategic solutions to boost your revenue streams and maximize profitability",
      features: ["Market Analysis", "Revenue Optimization", "Growth Hacking"]
    },
    {
      icon: <Rocket size={32} />,
      title: "Digital Transformation",
      description: "Modernize your business with cutting-edge digital solutions and automation",
      features: ["Process Automation", "Cloud Migration", "AI Integration"]
    },
    {
      icon: <Target size={32} />,
      title: "Market Expansion",
      description: "Expand your reach and capture new markets with data-driven strategies",
      features: ["Market Research", "Entry Strategy", "Competitive Analysis"]
    },
    {
      icon: <Users size={32} />,
      title: "Team Optimization",
      description: "Build high-performing teams and enhance organizational efficiency",
      features: ["Team Building", "Process Optimization", "Performance Analytics"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 50%, ${alpha(theme.palette.tertiary.main, 0.1)} 100%)`
          : `linear-gradient(135deg, ${alpha('#f8fafc', 0.8)} 0%, ${alpha('#e0e7ff', 0.8)} 50%, ${alpha('#fce7f3', 0.8)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 5, md: 8 } }}>
              <Typography
                component="h2"
                variant="h2"
                sx={{
                  fontSize: { xs: '1.875rem', sm: '2.25rem', md: '3rem', lg: '3.5rem' },
                  fontWeight: 800,
                  background: theme.palette.gradient.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  px: { xs: 2, sm: 0 },
                }}
              >
                Transform Your Business
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: { xs: '90%', sm: '80%', md: '600px' },
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 500,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  px: { xs: 2, sm: 0 },
                }}
              >
                Unlock exponential growth with our proven strategies and cutting-edge solutions designed for modern businesses
              </Typography>
            </Box>
          </motion.div>

          {/* Hero Section with Lottie Animation */}
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" sx={{ mb: { xs: 6, sm: 8, md: 10 } }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div variants={itemVariants}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, px: { xs: 2, sm: 0 } }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem', lg: '2.5rem' },
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: { xs: 2, sm: 3 },
                      lineHeight: { xs: 1.3, md: 1.2 },
                    }}
                  >
                    Drive Growth with Data-Driven Strategies
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                      lineHeight: 1.7,
                      mb: { xs: 3, sm: 4 },
                    }}
                  >
                    Our comprehensive business growth services combine innovative technology with strategic insights to deliver measurable results. From revenue optimization to digital transformation, we partner with you to achieve sustainable growth.
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 1.5, sm: 2 }, 
                    flexWrap: 'wrap', 
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ChevronRight size={20} />}
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        fontWeight: 600,
                        background: theme.palette.gradient.primary,
                        '&:hover': {
                          background: theme.palette.gradient.secondary,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        },
                      }}
                    >
                      Get Started Today
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        fontWeight: 600,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          borderColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.main,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      View Case Studies
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: { xs: '250px', sm: '300px', md: '400px' },
                    px: { xs: 2, sm: 0 },
                  }}
                >
                  <dotlottie-wc 
                    src="https://lottie.host/fc0f9cb8-c654-412c-8379-007757dec877/nb3iUa7Tcg.lottie" 
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      maxWidth: { xs: '300px', sm: '400px', md: '500px' }
                    }} 
                    autoplay 
                    loop
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* Services Grid */}
          <motion.div variants={containerVariants}>
            <Grid container spacing={{ xs: 3, sm: 4, md: 4 }} sx={{ px: { xs: 2, sm: 0 } }}>
              {services.map((service, index) => (
                <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <Box
                      sx={{
                        p: { xs: 2.5, sm: 3 },
                        height: '100%',
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: { xs: 56, sm: 64 },
                          height: { xs: 56, sm: 64 },
                          borderRadius: 2,
                          background: theme.palette.gradient.primary,
                          color: 'white',
                          mb: 2,
                        }}
                      >
                        {service.icon}
                      </Box>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          mb: 2,
                          fontSize: { xs: '1.1rem', sm: '1.2rem' },
                          lineHeight: 1.3,
                        }}
                      >
                        {service.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                          mb: 3,
                          fontSize: { xs: '0.875rem', sm: '0.9rem' },
                        }}
                      >
                        {service.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {service.features.map((feature, idx) => (
                          <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <CheckCircle size={16} color={theme.palette.primary.main} style={{ marginTop: '2px', flexShrink: 0 }} />
                            <Typography variant="caption" sx={{ 
                              color: theme.palette.text.secondary,
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
                              lineHeight: 1.4
                            }}>
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                mt: { xs: 6, sm: 8, md: 8 },
                p: { xs: 3, sm: 4, md: 6 },
                background: theme.palette.gradient.primary,
                borderRadius: 3,
                textAlign: 'center',
                color: 'white',
                mx: { xs: 2, sm: 0 },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem' },
                  lineHeight: 1.2,
                }}
              >
                Ready to Scale Your Business?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: { xs: 3, sm: 4 },
                  opacity: 0.9,
                  maxWidth: { xs: '100%', sm: '90%', md: '600px' },
                  mx: 'auto',
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                  lineHeight: 1.6,
                }}
              >
                Join hundreds of successful businesses that have transformed their operations and achieved remarkable growth with our expert guidance.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: { xs: 3, sm: 4, md: 5 },
                  py: { xs: 1.2, sm: 1.5 },
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  background: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    background: alpha('#ffffff', 0.9),
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  },
                }}
              >
                Schedule Your Free Consultation
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default BusinessGrowthSection;
