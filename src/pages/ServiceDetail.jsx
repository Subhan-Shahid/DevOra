import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Chip, Button, Breadcrumbs, Card, CardContent, useTheme, Divider, Grid } from '@mui/material';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { servicesData } from '../data/services';
import { FaArrowLeft, FaCheck, FaClock, FaStar, FaRocket, FaCrown, FaBolt, FaGem } from 'react-icons/fa';
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box sx={{ mb: { xs: 6, md: 10 } }}>
            {/* Section header */}
            <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Chip
                  label="💎 Transparent Pricing"
                  sx={{
                    mb: 2.5,
                    px: 2,
                    py: 0.5,
                    height: 'auto',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(129,140,248,0.2), rgba(99,102,241,0.2))'
                      : 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))',
                    color: theme.palette.mode === 'dark' ? '#a5b4fc' : '#6366f1',
                    border: theme.palette.mode === 'dark'
                      ? '1px solid rgba(129,140,248,0.4)'
                      : '1px solid rgba(99,102,241,0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    textAlign: 'center',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.25rem' },
                    lineHeight: 1.15,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)'
                      : 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Choose Your Plan
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    maxWidth: 560,
                    mx: 'auto',
                    lineHeight: 1.7,
                  }}
                >
                  Simple, predictable pricing. No hidden fees. Start with any plan and scale as you grow.
                </Typography>
              </motion.div>
            </Box>

            {/* Pricing Cards */}
            <Grid container spacing={{ xs: 3, sm: 3, md: 3 }} alignItems="stretch" justifyContent="center">
              {service.pricingTiers.map((tier, index) => {
                const tierIcons = [FaBolt, FaCrown, FaGem];
                const TierIcon = tierIcons[index] || FaCrown;
                const tierAccents = [
                  { from: '#22d3ee', to: '#3b82f6', glow: 'rgba(59,130,246,0.35)' },
                  { from: '#818cf8', to: '#6366f1', glow: 'rgba(99,102,241,0.4)' },
                  { from: '#f472b6', to: '#a855f7', glow: 'rgba(168,85,247,0.35)' },
                ];
                const accent = tierAccents[index] || tierAccents[1];

                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tier.name} sx={{ display: 'flex' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.45 + index * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: tier.popular ? -12 : -8,
                        scale: tier.popular ? 1.03 : 1.02,
                        transition: { duration: 0.3, ease: 'easeOut' },
                      }}
                      style={{ width: '100%', display: 'flex' }}
                    >
                      <Box
                        onClick={() => setSelectedTier(index)}
                        sx={{
                          width: '100%',
                          position: 'relative',
                          borderRadius: '24px',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          background: theme.palette.mode === 'dark'
                            ? tier.popular
                              ? `linear-gradient(160deg, rgba(30,27,75,0.95) 0%, rgba(20,20,50,0.95) 100%)`
                              : 'rgba(15,23,42,0.7)'
                            : tier.popular
                              ? 'linear-gradient(160deg, rgba(238,242,255,0.98) 0%, rgba(245,243,255,0.98) 100%)'
                              : 'rgba(255,255,255,0.85)',
                          backdropFilter: 'blur(24px)',
                          WebkitBackdropFilter: 'blur(24px)',
                          border: tier.popular
                            ? `2px solid transparent`
                            : theme.palette.mode === 'dark'
                              ? '1px solid rgba(148,163,184,0.12)'
                              : '1px solid rgba(148,163,184,0.25)',
                          boxShadow: tier.popular
                            ? `0 0 0 2px ${accent.from}, 0 32px 80px ${accent.glow}, 0 8px 32px rgba(0,0,0,0.2)`
                            : theme.palette.mode === 'dark'
                              ? '0 8px 32px rgba(0,0,0,0.4)'
                              : '0 4px 24px rgba(15,23,42,0.08)',
                          transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          mt: { xs: 0, md: tier.popular ? 0 : 2 },
                          '&:hover': {
                            boxShadow: `0 0 0 2px ${accent.from}, 0 40px 100px ${accent.glow}, 0 12px 40px rgba(0,0,0,0.25)`,
                          },
                          /* shimmer pseudo-element via keyframes in sx */
                          '&::before': tier.popular ? {
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '24px',
                            background: `linear-gradient(135deg, ${accent.from}18 0%, transparent 60%, ${accent.to}12 100%)`,
                            pointerEvents: 'none',
                          } : {},
                        }}
                      >
                        {/* Popular badge */}
                        {tier.popular && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.4, ease: 'backOut' }}
                          >
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 18,
                                right: 18,
                                background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                                color: 'white',
                                px: 1.5,
                                py: 0.4,
                                borderRadius: '100px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                boxShadow: `0 4px 16px ${accent.glow}`,
                              }}
                            >
                              <FaStar style={{ fontSize: '0.65rem' }} />
                              Most Popular
                            </Box>
                          </motion.div>
                        )}

                        {/* Animated gradient top bar */}
                        <Box
                          sx={{
                            height: 4,
                            background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                            borderRadius: '24px 24px 0 0',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                              animation: 'shimmer 2.5s infinite',
                            },
                            '@keyframes shimmer': {
                              '0%': { left: '-100%' },
                              '100%': { left: '200%' },
                            },
                          }}
                        />

                        <Box sx={{ p: { xs: 3.5, md: 4 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* Icon + name row */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: '12px',
                                background: `linear-gradient(135deg, ${accent.from}22, ${accent.to}22)`,
                                border: `1px solid ${accent.from}40`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <TierIcon style={{ fontSize: '1.1rem', color: accent.from }} />
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  fontWeight: 800,
                                  fontSize: { xs: '1.15rem', md: '1.25rem' },
                                  color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#0f172a',
                                  lineHeight: 1.2,
                                }}
                              >
                                {tier.name}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '0.8rem',
                                  color: theme.palette.mode === 'dark' ? '#64748b' : '#94a3b8',
                                  fontWeight: 500,
                                  mt: 0.2,
                                }}
                              >
                                {tier.description}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Price block */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.55 + index * 0.12, duration: 0.5, ease: 'backOut' }}
                          >
                            <Box
                              sx={{
                                background: theme.palette.mode === 'dark'
                                  ? 'rgba(15,23,42,0.5)'
                                  : 'rgba(248,250,252,0.8)',
                                borderRadius: '16px',
                                border: theme.palette.mode === 'dark'
                                  ? '1px solid rgba(148,163,184,0.1)'
                                  : '1px solid rgba(148,163,184,0.2)',
                                p: { xs: 2, md: 2.5 },
                                mb: 3,
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: 1,
                              }}
                            >
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: accent.from,
                                    mb: 0.5,
                                  }}
                                >
                                  {tier.duration}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: '2rem', md: '2.4rem' },
                                    lineHeight: 1,
                                    background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                  }}
                                >
                                  {tier.price}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  ml: 'auto',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.8,
                                  background: `${accent.from}18`,
                                  border: `1px solid ${accent.from}35`,
                                  borderRadius: '10px',
                                  px: 1.2,
                                  py: 0.6,
                                }}
                              >
                                <FaClock style={{ fontSize: '0.75rem', color: accent.from }} />
                                <Typography
                                  sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: accent.from,
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {tier.timeline}
                                </Typography>
                              </Box>
                            </Box>
                          </motion.div>

                          {/* Features list */}
                          <Box sx={{ flex: 1, mb: 3 }}>
                            <Typography
                              sx={{
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: theme.palette.mode === 'dark' ? '#475569' : '#94a3b8',
                                mb: 1.5,
                              }}
                            >
                              What's included
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              {tier.features.map((feature, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: 0.6 + index * 0.1 + idx * 0.035,
                                    duration: 0.4,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: 1.2,
                                      py: 0.6,
                                      px: 1.2,
                                      borderRadius: '10px',
                                      transition: 'background 0.2s',
                                      '&:hover': {
                                        background: theme.palette.mode === 'dark'
                                          ? 'rgba(148,163,184,0.05)'
                                          : 'rgba(99,102,241,0.04)',
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${accent.from}30, ${accent.to}30)`,
                                        border: `1.5px solid ${accent.from}60`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        mt: '1px',
                                      }}
                                    >
                                      <FaCheck style={{ fontSize: '0.5rem', color: accent.from }} />
                                    </Box>
                                    <Typography
                                      sx={{
                                        fontSize: { xs: '0.82rem', md: '0.85rem' },
                                        color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
                                        lineHeight: 1.55,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {feature}
                                    </Typography>
                                  </Box>
                                </motion.div>
                              ))}
                            </Box>
                          </Box>

                          {/* CTA Button */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Button
                              component={Link}
                              to="/contact"
                              fullWidth
                              sx={{
                                py: 1.5,
                                borderRadius: '14px',
                                fontWeight: 800,
                                fontSize: '0.95rem',
                                letterSpacing: '0.02em',
                                position: 'relative',
                                overflow: 'hidden',
                                background: tier.popular
                                  ? `linear-gradient(135deg, ${accent.from}, ${accent.to})`
                                  : 'transparent',
                                border: tier.popular
                                  ? 'none'
                                  : `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(148,163,184,0.25)' : 'rgba(148,163,184,0.4)'}`,
                                color: tier.popular
                                  ? '#fff'
                                  : theme.palette.mode === 'dark' ? '#e2e8f0' : '#334155',
                                boxShadow: tier.popular
                                  ? `0 8px 32px ${accent.glow}`
                                  : 'none',
                                textTransform: 'none',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: tier.popular
                                    ? `linear-gradient(135deg, ${accent.to}, ${accent.from})`
                                    : theme.palette.mode === 'dark'
                                      ? 'rgba(148,163,184,0.08)'
                                      : 'rgba(15,23,42,0.04)',
                                  boxShadow: tier.popular
                                    ? `0 12px 40px ${accent.glow}`
                                    : 'none',
                                  border: tier.popular
                                    ? 'none'
                                    : `1.5px solid ${accent.from}80`,
                                  color: tier.popular ? '#fff' : accent.from,
                                },
                                /* shimmer on hover */
                                '&::after': tier.popular ? {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: '-100%',
                                  width: '60%',
                                  height: '100%',
                                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                                  transition: 'left 0.5s ease',
                                } : {},
                                '&:hover::after': tier.popular ? {
                                  left: '200%',
                                } : {},
                              }}
                            >
                              {tier.popular ? '🚀 Get Started Now' : 'Get Started'}
                            </Button>
                          </motion.div>
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>

            {/* Bottom trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { xs: 2, md: 4 },
                  flexWrap: 'wrap',
                  mt: 5,
                  pt: 4,
                  borderTop: theme.palette.mode === 'dark'
                    ? '1px solid rgba(148,163,184,0.1)'
                    : '1px solid rgba(148,163,184,0.2)',
                }}
              >
                {[
                  { icon: '🔒', label: 'Secure Payment' },
                  { icon: '💬', label: 'Free Consultation' },
                  { icon: '🔄', label: 'Revision Rounds' },
                  { icon: '📞', label: 'Dedicated Support' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.08, duration: 0.4 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2,
                        py: 1,
                        borderRadius: '100px',
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(148,163,184,0.06)'
                          : 'rgba(15,23,42,0.04)',
                        border: theme.palette.mode === 'dark'
                          ? '1px solid rgba(148,163,184,0.1)'
                          : '1px solid rgba(148,163,184,0.2)',
                      }}
                    >
                      <Typography sx={{ fontSize: '1rem' }}>{item.icon}</Typography>
                      <Typography
                        sx={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
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

            {/* Mobile Timeline - Simple Vertical Stack */}
            <Box sx={{ 
              display: { xs: 'block', sm: 'none' },
              mx: -2,
              px: 2
            }}>
              {service.timeline.phases.map((phase, index) => (
                <motion.div
                  key={phase.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box sx={{ mb: 3, mx: 2 }}>
                    <Card
                      sx={{
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
                        overflow: 'visible'
                      }}
                    >
                      <CardContent sx={{ pt: 3, px: 3, pb: 3, textAlign: 'center' }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700, 
                            mb: 1,
                            color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                            fontSize: '1.1rem',
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
                            mb: 1.5,
                            background: theme.palette.mode === 'dark'
                              ? 'rgba(129, 140, 248, 0.15)'
                              : 'rgba(99, 102, 241, 0.1)',
                            color: theme.palette.mode === 'dark' ? '#a5b4fc' : '#6366f1',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: '24px'
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b',
                            lineHeight: 1.6,
                            fontSize: '0.9rem'
                          }}
                        >
                          {phase.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </motion.div>
              ))}
            </Box>
            <Grid 
              container 
              spacing={{ xs: 0, sm: 2.5, md: 3 }} 
              justifyContent="center"
              sx={{
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              {service.timeline.phases.map((phase, index) => (
                <Grid 
                  size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} 
                  key={phase.name}
                >
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
                      <CardContent sx={{ pt: 3, px: 2, pb: 2, textAlign: 'center' }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700, 
                            mb: 1,
                            color: theme.palette.mode === 'dark' ? '#f1f5f9' : '#1e293b',
                            fontSize: '1.05rem',
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
                            mb: 1.5,
                            background: theme.palette.mode === 'dark'
                              ? 'rgba(129, 140, 248, 0.15)'
                              : 'rgba(99, 102, 241, 0.1)',
                            color: theme.palette.mode === 'dark' ? '#a5b4fc' : '#6366f1',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: '24px'
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#64748b',
                            lineHeight: 1.6,
                            fontSize: '0.85rem'
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
