import React from 'react';
import { Box, Container, Typography, Grid, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaTabletAlt, FaDesktop } from 'react-icons/fa';

const MotionBox = motion.create(Box);

const ResponsiveShowcase = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="showcase"
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
          <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, sm: 4 }}>
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
                <Grid size={{ xs: 12, sm: 4 }}>
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
                <Grid size={{ xs: 12, sm: 4 }}>
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

          <Grid size={{ xs: 12, md: 6 }}>
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
                {/* Desktop/Tablet Mockup */}
                <Box>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      minHeight: { xs: 260, sm: 320 },
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 30px 70px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.2)'
                        : '0 25px 60px rgba(15,23,42,0.12), 0 0 30px rgba(99,102,241,0.1)',
                      border: theme.palette.mode === 'dark'
                        ? '1px solid rgba(148,163,184,0.3)'
                        : '1px solid rgba(203,213,225,0.8)',
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)'
                        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                    }}
                  >
                    {/* Window Titlebar */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 1.5, borderBottom: theme.palette.mode === 'dark' ? '1px solid rgba(148,163,184,0.15)' : '1px solid rgba(226,232,240,0.8)' }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#f59e0b' }} />
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981' }} />
                      <Box sx={{ flex: 1, mx: 1, py: 0.4, px: 2, borderRadius: '12px', bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', fontSize: '0.65rem', color: theme.palette.text.secondary, textAlign: 'center', letterSpacing: '0.5px' }}>
                        devora.app/dashboard
                      </Box>
                    </Box>

                    {/* Mock Content */}
                    <Box sx={{ flex: 1, pt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                        <Box sx={{ width: '40%', height: 18, borderRadius: '6px', background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)' }} />
                        <Box sx={{ width: '25%', height: 12, borderRadius: '4px', bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', ml: 'auto' }} />
                      </Box>

                      {/* Mini Metric Cards Grid */}
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
                        {[
                          { label: 'Uptime', val: '99.99%', col: '#10b981' },
                          { label: 'Latency', val: '24ms', col: '#38bdf8' },
                          { label: 'Score', val: '100/100', col: '#8b5cf6' }
                        ].map((card, i) => (
                          <Box key={i} sx={{ p: 1.2, borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)', border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)' }}>
                            <Typography sx={{ fontSize: '0.65rem', color: theme.palette.text.secondary }}>{card.label}</Typography>
                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: card.col }}>{card.val}</Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* Simulated Chart preview */}
                      <Box sx={{ flex: 1, minHeight: 90, borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'rgba(56,189,248,0.05)' : 'rgba(14,165,233,0.04)', border: '1px dashed rgba(56,189,248,0.3)', p: 1.5, display: 'flex', alignItems: 'flex-end', gap: 1, justifyContent: 'space-between' }}>
                        {[40, 65, 50, 85, 70, 95, 80, 100].map((h, i) => (
                          <Box
                            key={i}
                            sx={{
                              flex: 1,
                              height: `${h}%`,
                              borderRadius: '4px 4px 0 0',
                              background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
                              opacity: 0.85,
                              transition: 'transform 0.2s',
                              '&:hover': { transform: 'scaleY(1.08)' }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Live Responsive badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 14,
                        px: 1.2,
                        py: 0.4,
                        borderRadius: 999,
                        background: 'rgba(15,23,42,0.85)',
                        border: '1px solid rgba(148,163,184,0.4)',
                        color: '#e5e7eb',
                        fontSize: '0.68rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.6,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#22c55e',
                          boxShadow: '0 0 10px rgba(34,197,94,0.9)',
                        }}
                      />
                      Desktop View
                    </Box>
                  </Box>
                </Box>

                {/* Mobile Mockup */}
                <Box>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      minHeight: { xs: 260, sm: 320 },
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(236,72,153,0.15)'
                        : '0 20px 50px rgba(15,23,42,0.1), 0 0 25px rgba(236,72,153,0.1)',
                      border: theme.palette.mode === 'dark'
                        ? '1px solid rgba(148,163,184,0.3)'
                        : '1px solid rgba(203,213,225,0.8)',
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)'
                        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                    }}
                  >
                    {/* Mobile notch / top bar */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', pb: 1.5 }}>
                      <Box sx={{ width: 48, height: 5, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }} />
                    </Box>

                    {/* Mobile simulated app layout */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
                      <Box sx={{ width: '60%', height: 14, borderRadius: '4px', background: 'linear-gradient(90deg, #ec4899 0%, #f43f5e 100%)' }} />
                      <Box sx={{ width: '85%', height: 10, borderRadius: '4px', bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} />

                      {/* Mini list items */}
                      {[1, 2, 3].map((item) => (
                        <Box
                          key={item}
                          sx={{
                            p: 1.2,
                            borderRadius: 2,
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.04)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.2
                          }}
                        >
                          <Box sx={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', flexShrink: 0 }} />
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ width: '70%', height: 8, borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)', mb: 0.6 }} />
                            <Box sx={{ width: '40%', height: 6, borderRadius: 2, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} />
                          </Box>
                        </Box>
                      ))}
                    </Box>

                    {/* Live Mobile Badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 14,
                        px: 1.2,
                        py: 0.4,
                        borderRadius: 999,
                        background: 'rgba(15,23,42,0.85)',
                        border: '1px solid rgba(148,163,184,0.4)',
                        color: '#e5e7eb',
                        fontSize: '0.68rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.6,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#ec4899',
                          boxShadow: '0 0 10px rgba(236,72,153,0.9)',
                        }}
                      />
                      Mobile View
                    </Box>
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
