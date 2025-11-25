import React from 'react';
import { Box, Container, Typography, Grid, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaTabletAlt, FaDesktop } from 'react-icons/fa';

const MotionBox = motion(Box);

const ResponsiveShowcase = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 10 },
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #020617 0%, #020617 40%, #0f172a 100%)'
          : 'linear-gradient(135deg, #eef2ff 0%, #e0f2fe 40%, #fdf2ff 100%)',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3 } }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
            >
              <Chip
                label="100% Responsive Experiences"
                sx={{
                  mb: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(129,140,248,0.2), rgba(56,189,248,0.2))'
                    : 'linear-gradient(135deg, rgba(99,102,241,0.16), rgba(14,165,233,0.18))',
                  color: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1e293b',
                  backdropFilter: 'blur(8px)',
                  border: theme.palette.mode === 'dark'
                    ? '1px solid rgba(129,140,248,0.4)'
                    : '1px solid rgba(99,102,241,0.3)',
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  px: 2,
                  py: 1,
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 10px 30px rgba(15,23,42,0.8)'
                    : '0 10px 30px rgba(15,23,42,0.12)',
                }}
              />

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.7rem', sm: '2rem', md: '2.4rem' },
                  mb: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #a5b4fc, #7dd3fc)'
                    : 'linear-gradient(135deg, #6366f1, #0ea5e9)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Beautiful on every screen size.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#1f2933',
                  mb: 3,
                  maxWidth: 520,
                  lineHeight: 1.7,
                }}
              >
                We craft layouts that fluidly adapt from mobile to ultra-wide monitors. This live preview shows
                how your product feels across devices in real time.
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#fff',
                        boxShadow: '0 8px 20px rgba(79,70,229,0.55)',
                      }}
                    >
                      <FaMobileAlt size={16} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Mobile-first</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Optimized tap targets & legible typography.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #0ea5e9, #22c55e)',
                        color: '#fff',
                        boxShadow: '0 8px 20px rgba(14,165,233,0.5)',
                      }}
                    >
                      <FaTabletAlt size={16} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Tablet-friendly</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Smart grid layouts for in-between breakpoints.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #ec4899, #f97316)',
                        color: '#fff',
                        boxShadow: '0 8px 20px rgba(236,72,153,0.5)',
                      }}
                    >
                      <FaDesktop size={16} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Desktop-perfect</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        Pixel-perfect layouts with motion.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: { xs: 1, sm: 2 },
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1.15fr 0.85fr' },
                  gap: 2,
                  width: '100%',
                  alignItems: 'stretch',
                  justifyContent: 'center',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 35px 80px rgba(15,23,42,0.8)',
                      border: '1px solid rgba(148,163,184,0.6)',
                      background: 'radial-gradient(circle at 0% 0%, rgba(96,165,250,0.35), transparent 55%)',
                      mx: 'auto',
                    }}
                  >
                    <Box
                      component="img"
                      src="/Scene (1).gif"
                      alt="Responsive design preview"
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        objectFit: 'cover',
                        transform: 'scale(1.12)',
                        transformOrigin: 'center center',
                      }}
                    />

                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 14,
                        px: 1.4,
                        py: 0.6,
                        borderRadius: 999,
                        background: 'rgba(15,23,42,0.7)',
                        border: '1px solid rgba(148,163,184,0.8)',
                        color: '#e5e7eb',
                        fontSize: '0.7rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.6,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: '999px',
                          backgroundColor: '#22c55e',
                          boxShadow: '0 0 12px rgba(34,197,94,0.9)',
                        }}
                      />
                      Live responsive preview
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 25px 60px rgba(15,23,42,0.7)',
                      border: '1px solid rgba(148,163,184,0.6)',
                      background: 'radial-gradient(circle at 0% 0%, rgba(56,189,248,0.45), transparent 55%)',
                      mx: 'auto',
                    }}
                  >
                    <Box
                      component="img"
                      src="/Showreel-Grid-Mobile.gif"
                      alt="Mobile responsiveness preview"
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        objectFit: 'cover',
                        transform: 'scale(1.08)',
                        transformOrigin: 'center center',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      {/* subtle background glow */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 0% 0%, rgba(59,130,246,0.18), transparent 55%), radial-gradient(circle at 100% 100%, rgba(236,72,153,0.16), transparent 55%)'
            : 'radial-gradient(circle at 0% 0%, rgba(96,165,250,0.16), transparent 55%), radial-gradient(circle at 100% 100%, rgba(244,114,182,0.18), transparent 55%)',
          opacity: 0.85,
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default ResponsiveShowcase;
