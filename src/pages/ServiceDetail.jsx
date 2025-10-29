import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Chip, Button, Breadcrumbs, Card, CardContent, useTheme, Divider, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { servicesData } from '../data/services';
import { FaArrowLeft, FaCheck, FaClock, FaStar, FaRocket } from 'react-icons/fa';
import { MdCheckCircle, MdTimeline } from 'react-icons/md';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const service = servicesData.find(s => s.slug === slug);
  const [selectedTier, setSelectedTier] = useState(1); // Default to Pro tier

  if (!service) {
    navigate('/not-found', { replace: true });
    return null;
  }

  return (
    <Box sx={{
      py: { xs: 6, md: 10 },
      pt: { xs: 10, md: 12 },
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 30%, #e0e7ff 70%, #fae8ff 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100dvh',
      transition: 'background 0.5s ease'
    }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link 
              to="/" 
              style={{ 
                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b', 
                textDecoration: 'none' 
              }}
            >
              Home
            </Link>
            <Link 
              to="/" 
              style={{ 
                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b', 
                textDecoration: 'none' 
              }}
            >
              Services
            </Link>
            <Typography sx={{ color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b', fontWeight: 600 }}>
              {service.title}
            </Typography>
          </Breadcrumbs>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 900, 
                mb: 2,
                color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              {service.title}
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b',
                maxWidth: '800px',
                mx: 'auto',
                mb: 3
              }}
            >
              {service.summary}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              {service.features.map((f, idx) => (
                <Chip 
                  key={idx} 
                  label={f} 
                  icon={<FaCheck style={{ fontSize: '0.9rem' }} />}
                  sx={{
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(129, 140, 248, 0.15)'
                      : 'rgba(99, 102, 241, 0.1)',
                    color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                    border: theme.palette.mode === 'dark' 
                      ? '1px solid rgba(129, 140, 248, 0.3)' 
                      : '1px solid rgba(99, 102, 241, 0.2)',
                    fontWeight: 600
                  }} 
                />
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Pricing Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                mb: 1,
                textAlign: 'center',
                color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
              }}
            >
              Choose Your Plan
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center',
                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b',
                mb: { xs: 3, md: 5 },
                fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
                px: { xs: 2, sm: 0 }
              }}
            >
              Select the perfect package for your project needs
            </Typography>

            <Grid container spacing={{ xs: 3, sm: 3, md: 4 }} justifyContent="center">
              {service.pricingTiers.map((tier, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tier.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Card
                      onClick={() => setSelectedTier(index)}
                      sx={{
                        height: '100%',
                        background: theme.palette.mode === 'dark'
                          ? (tier.popular 
                              ? 'linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(99, 102, 241, 0.15))'
                              : 'rgba(30, 41, 59, 0.6)')
                          : (tier.popular
                              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))'
                              : 'rgba(255, 255, 255, 0.8)'),
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: tier.popular
                          ? (theme.palette.mode === 'dark' 
                              ? '2px solid #818cf8' 
                              : '2px solid #6366f1')
                          : (theme.palette.mode === 'dark'
                              ? '1px solid rgba(129, 140, 248, 0.2)'
                              : '1px solid rgba(99, 102, 241, 0.15)'),
                        borderRadius: 4,
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: tier.popular
                          ? (theme.palette.mode === 'dark'
                              ? '0 20px 60px rgba(129, 140, 248, 0.3)'
                              : '0 20px 60px rgba(99, 102, 241, 0.2)')
                          : 'none',
                        transform: { xs: 'scale(1)', md: tier.popular ? 'scale(1.05)' : 'scale(1)' },
                        '&:hover': {
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 20px 60px rgba(129, 140, 248, 0.4)'
                            : '0 20px 60px rgba(99, 102, 241, 0.25)'
                        }
                      }}
                    >
                      {tier.popular && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: { xs: -10, md: -12 },
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'linear-gradient(135deg, #818cf8, #6366f1)',
                            color: 'white',
                            px: { xs: 2, md: 3 },
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: { xs: '0.75rem', md: '0.85rem' },
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <FaStar style={{ fontSize: '0.9rem' }} /> MOST POPULAR
                        </Box>
                      )}
                      <CardContent sx={{ p: { xs: 3, sm: 3.5, md: 4 } }}>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 800, 
                            mb: 1,
                            color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                            fontSize: { xs: '1.25rem', sm: '1.35rem', md: '1.5rem' }
                          }}
                        >
                          {tier.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b',
                            mb: { xs: 2, md: 3 },
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            lineHeight: 1.5
                          }}
                        >
                          {tier.description}
                        </Typography>
                        <Box sx={{ mb: { xs: 2, md: 3 } }}>
                          <Typography 
                            variant="h3" 
                            sx={{ 
                              fontWeight: 900,
                              background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, #a5b4fc, #818cf8)'
                                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              display: 'inline',
                              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
                            }}
                          >
                            {tier.price}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                              display: { xs: 'block', sm: 'inline' },
                              ml: { xs: 0, sm: 1 },
                              mt: { xs: 0.5, sm: 0 },
                              fontSize: { xs: '0.8rem', sm: '0.85rem' }
                            }}
                          >
                            {tier.duration}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 2, md: 3 } }}>
                          <FaClock style={{ color: theme.palette.mode === 'dark' ? '#818cf8' : '#6366f1', fontSize: '0.95rem' }} />
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b',
                              fontWeight: 600,
                              fontSize: { xs: '0.8rem', sm: '0.85rem' }
                            }}
                          >
                            Timeline: {tier.timeline}
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: { xs: 2, md: 3 }, opacity: 0.2 }} />
                        <Box sx={{ mb: { xs: 2.5, md: 3 }, maxHeight: { xs: 'none', md: '280px' }, overflowY: { xs: 'visible', md: 'auto' } }}>
                          {tier.features.map((feature, idx) => (
                            <Box 
                              key={idx} 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'flex-start', 
                                gap: { xs: 1, sm: 1.5 }, 
                                mb: { xs: 1.2, md: 1.5 }
                              }}
                            >
                              <MdCheckCircle 
                                style={{ 
                                  color: theme.palette.mode === 'dark' ? '#818cf8' : '#6366f1',
                                  fontSize: '1.1rem',
                                  marginTop: '2px',
                                  flexShrink: 0
                                }} 
                              />
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#475569',
                                  lineHeight: 1.6,
                                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.875rem' }
                                }}
                              >
                                {feature}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                        <Button
                          component={Link}
                          to="/contact"
                          variant={tier.popular ? 'contained' : 'outlined'}
                          fullWidth
                          sx={{
                            py: { xs: 1.2, md: 1.5 },
                            borderRadius: 2,
                            fontWeight: 700,
                            fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                            background: tier.popular
                              ? 'linear-gradient(135deg, #818cf8, #6366f1)'
                              : 'transparent',
                            border: tier.popular 
                              ? 'none'
                              : (theme.palette.mode === 'dark' 
                                  ? '2px solid #818cf8' 
                                  : '2px solid #6366f1'),
                            color: tier.popular 
                              ? 'white'
                              : (theme.palette.mode === 'dark' ? '#a5b4fc' : '#6366f1'),
                            '&:hover': {
                              background: tier.popular
                                ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                                : (theme.palette.mode === 'dark'
                                    ? 'rgba(129, 140, 248, 0.1)'
                                    : 'rgba(99, 102, 241, 0.08)'),
                              transform: 'translateY(-2px)',
                              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
                            }
                          }}
                        >
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Project Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 1, md: 2 }, mb: { xs: 2, md: 4 }, flexWrap: 'wrap' }}>
              <MdTimeline style={{ fontSize: '1.75rem', color: theme.palette.mode === 'dark' ? '#818cf8' : '#6366f1' }} />
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  textAlign: 'center'
                }}
              >
                Project Timeline
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center',
                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b',
                mb: { xs: 3, md: 5 },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
                px: { xs: 2, sm: 0 }
              }}
            >
              Our proven development process from start to finish
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} justifyContent="center">
              {service.timeline.phases.map((phase, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={phase.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(30, 41, 59, 0.6)'
                          : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: theme.palette.mode === 'dark'
                          ? '1px solid rgba(129, 140, 248, 0.2)'
                          : '1px solid rgba(99, 102, 241, 0.15)',
                        borderRadius: 3,
                        position: 'relative',
                        overflow: 'visible',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.palette.mode === 'dark'
                            ? '0 12px 40px rgba(129, 140, 248, 0.2)'
                            : '0 12px 40px rgba(99, 102, 241, 0.15)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: { xs: -16, md: -20 },
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: { xs: 36, md: 40 },
                          height: { xs: 36, md: 40 },
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #818cf8, #6366f1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 800,
                          fontSize: { xs: '1rem', md: '1.2rem' },
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
                        }}
                      >
                        {index + 1}
                      </Box>
                      <CardContent sx={{ pt: { xs: 3.5, md: 4 }, px: { xs: 2, md: 2 }, pb: { xs: 2, md: 2 }, textAlign: 'center' }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700, 
                            mb: { xs: 0.75, md: 1 },
                            color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                            lineHeight: 1.3
                          }}
                        >
                          {phase.name}
                        </Typography>
                        <Chip
                          icon={<FaClock style={{ fontSize: '0.85rem' }} />}
                          label={phase.duration}
                          size="small"
                          sx={{
                            mb: { xs: 1.2, md: 1.5 },
                            background: theme.palette.mode === 'dark'
                              ? 'rgba(129, 140, 248, 0.15)'
                              : 'rgba(99, 102, 241, 0.1)',
                            color: theme.palette.mode === 'dark' ? '#a5b4fc' : '#6366f1',
                            fontWeight: 600,
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            height: { xs: '22px', sm: '24px' }
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b',
                            lineHeight: 1.6,
                            fontSize: { xs: '0.8rem', sm: '0.825rem', md: '0.85rem' }
                          }}
                        >
                          {phase.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(99, 102, 241, 0.15))'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(129, 140, 248, 0.3)'
                : '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              textAlign: 'center'
            }}
          >
            <FaRocket style={{ fontSize: '3rem', color: theme.palette.mode === 'dark' ? '#818cf8' : '#6366f1', marginBottom: '16px' }} />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                mb: 2,
                color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b'
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Let's discuss your project and bring your vision to life
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #818cf8, #6366f1)',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(99, 102, 241, 0.4)'
                  }
                }}
              >
                Get a Free Quote
              </Button>
              <Button
                component={Link}
                to="/"
                variant="outlined"
                size="large"
                startIcon={<FaArrowLeft />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 700,
                  border: theme.palette.mode === 'dark' ? '2px solid #818cf8' : '2px solid #6366f1',
                  color: theme.palette.mode === 'dark' ? '#a5b4fc' : '#6366f1',
                  '&:hover': {
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(129, 140, 248, 0.1)'
                      : 'rgba(99, 102, 241, 0.08)',
                    border: theme.palette.mode === 'dark' ? '2px solid #a5b4fc' : '2px solid #4f46e5',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Back to Services
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServiceDetail;
