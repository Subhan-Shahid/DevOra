import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, Chip, useTheme, ButtonBase } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FaMobileAlt, 
  FaTabletAlt, 
  FaDesktop, 
  FaLock, 
  FaWifi, 
  FaBatteryFull, 
  FaBolt, 
  FaCheckCircle, 
  FaArrowRight, 
  FaRocket,
  FaChartLine,
  FaShieldAlt
} from 'react-icons/fa';
import { Sparkles, Layers, Activity, Smartphone, Laptop } from 'lucide-react';

const MotionBox = motion.create(Box);

// ==========================================
// 3D FLOATING HOLOGRAPHIC BADGE
// ==========================================
const HolographicBadge = ({ icon, label, sublabel, color, translateZ = 60, sx = {}, delay = 0 }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8, y: 15 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -6, 0],
      }}
      transition={{ 
        y: { repeat: Infinity, duration: 4, ease: 'easeInOut', delay },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }}
      style={{ transform: `translateZ(${translateZ}px)` }}
      sx={{
        position: 'absolute',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 1.2,
        px: 1.6,
        py: 1,
        borderRadius: '16px',
        background: 'rgba(15, 23, 42, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${color}66`,
        boxShadow: `0 12px 30px rgba(0, 0, 0, 0.45), 0 0 20px ${color}33`,
        pointerEvents: 'none',
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${color}, ${color}99)`,
          color: '#ffffff',
          boxShadow: `0 4px 12px ${color}66`,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ pr: 0.5 }}>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.1 }}>
          {label}
        </Typography>
        {sublabel && (
          <Typography sx={{ fontSize: '0.62rem', color: '#94a3b8', lineHeight: 1.2, mt: 0.2 }}>
            {sublabel}
          </Typography>
        )}
      </Box>
    </MotionBox>
  );
};

// ==========================================
// 3D MACBOOK PRO COMPONENT
// ==========================================
const MacBookPro3D = ({ isDark, isDuo = false }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: isDuo ? { xs: '100%', sm: 460, md: 470 } : 540,
        mx: 'auto',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Laptop Screen Lid */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          borderRadius: '18px 18px 4px 4px',
          background: isDark
            ? 'linear-gradient(160deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(160deg, #334155 0%, #1e293b 100%)',
          p: { xs: '8px 8px 10px', sm: '10px 10px 12px' },
          border: isDark ? '2px solid rgba(148, 163, 184, 0.35)' : '2px solid rgba(71, 85, 105, 0.4)',
          boxShadow: isDark
            ? '0 30px 70px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.18)'
            : '0 25px 60px -15px rgba(15, 23, 42, 0.35), 0 0 35px rgba(99, 102, 241, 0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Top Bezel Notch with Camera */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 14,
            mb: 0.6,
          }}
        >
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              bgcolor: '#0f172a',
              border: '1px solid rgba(148, 163, 184, 0.4)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 1,
                left: 1,
                width: 2,
                height: 2,
                borderRadius: '50%',
                bgcolor: '#22c55e',
                boxShadow: '0 0 4px #22c55e',
              },
            }}
          />
        </Box>

        {/* Display Screen Surface */}
        <Box
          sx={{
            borderRadius: '10px',
            overflow: 'hidden',
            background: isDark ? '#090d16' : '#0b1120',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative',
            minHeight: { xs: 240, sm: 280, md: 300 },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Browser / App Header Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.8,
              background: 'rgba(15, 23, 42, 0.95)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
            }}
          >
            {/* macOS Window Controls */}
            <Box sx={{ display: 'flex', gap: 0.6 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10b981' }} />
            </Box>

            {/* URL Search Pill */}
            <Box
              sx={{
                flex: 1,
                mx: { xs: 1, sm: 2 },
                py: 0.35,
                px: 1.5,
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.8,
              }}
            >
              <FaLock size={8} color="#10b981" />
              <Typography sx={{ fontSize: '0.62rem', color: '#94a3b8', letterSpacing: '0.3px', fontWeight: 500 }}>
                stackora.com/analytics
              </Typography>
            </Box>

            {/* Live Status Pill */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                }}
              />
              <Typography sx={{ fontSize: '0.6rem', color: '#38bdf8', fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                LIVE
              </Typography>
            </Box>
          </Box>

          {/* Screen Body Content */}
          <Box sx={{ flex: 1, p: { xs: 1.5, sm: 2 }, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Top Dashboard Banner */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="img"
                  src="/stackora-icon.png"
                  alt="Stackora"
                  sx={{ width: 18, height: 18, objectFit: 'contain' }}
                />
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.1 }}>
                    Stackora Cloud
                  </Typography>
                  <Typography sx={{ fontSize: '0.55rem', color: '#64748b' }}>
                    Production Cluster • Global Edge
                  </Typography>
                </Box>
              </Box>

              <Chip
                label="99.99% UPTIME"
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.58rem',
                  fontWeight: 700,
                  bgcolor: 'rgba(16, 185, 129, 0.15)',
                  color: '#34d399',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              />
            </Box>

            {/* 3 Metric Mini Cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
              {[
                { label: 'Page Speed', val: '0.18s', color: '#38bdf8', growth: '+28%' },
                { label: 'Global TTFB', val: '18ms', color: '#818cf8', growth: 'Optimal' },
                { label: 'SEO Score', val: '100/100', color: '#34d399', growth: 'A+ Grade' },
              ].map((m, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: { xs: 0.8, sm: 1 },
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <Typography sx={{ fontSize: '0.55rem', color: '#94a3b8' }}>{m.label}</Typography>
                  <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' }, fontWeight: 800, color: m.color }}>
                    {m.val}
                  </Typography>
                  <Typography sx={{ fontSize: '0.5rem', color: '#64748b' }}>{m.growth}</Typography>
                </Box>
              ))}
            </Box>

            {/* Interactive Glowing Wave Area Chart */}
            <Box
              sx={{
                flex: 1,
                minHeight: { xs: 75, sm: 95 },
                borderRadius: '8px',
                background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, rgba(15, 23, 42, 0.4) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                p: 1.2,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 600, color: '#e2e8f0' }}>
                  Fluid Viewport Scaling Throughput
                </Typography>
                <Typography sx={{ fontSize: '0.58rem', color: '#38bdf8', fontWeight: 700 }}>
                  +42.6% Responsive Flow
                </Typography>
              </Box>

              {/* Glowing SVG Curve */}
              <Box sx={{ width: '100%', height: '55px', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 300 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  {/* Fill Area */}
                  <path
                    d="M0,45 Q50,15 90,30 T180,18 T240,10 T300,5 L300,60 L0,60 Z"
                    fill="url(#chartGradient)"
                  />
                  {/* Glowing Stroke */}
                  <path
                    d="M0,45 Q50,15 90,30 T180,18 T240,10 T300,5"
                    fill="none"
                    stroke="url(#lineGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Peak Pulse Dot */}
                  <circle cx="240" cy="10" r="4" fill="#38bdf8" />
                  <circle cx="240" cy="10" r="8" fill="#38bdf8" opacity="0.3">
                    <animate attributeName="r" values="4;10;4" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </Box>
            </Box>
          </Box>

          {/* Glare Sheen Reflection Layer */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 45%)',
            }}
          />
        </Box>
      </Box>

      {/* Laptop Bottom Aluminum Base Deck */}
      <Box
        sx={{
          position: 'relative',
          width: '106%',
          left: '-3%',
          height: 12,
          background: isDark
            ? 'linear-gradient(180deg, #334155 0%, #1e293b 70%, #0f172a 100%)'
            : 'linear-gradient(180deg, #64748b 0%, #475569 70%, #334155 100%)',
          borderRadius: '0 0 14px 14px',
          border: '1px solid rgba(148, 163, 184, 0.3)',
          borderTop: 'none',
          boxShadow: isDark
            ? '0 16px 30px rgba(0, 0, 0, 0.7), 0 4px 12px rgba(56, 189, 248, 0.15)'
            : '0 14px 26px rgba(15, 23, 42, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* Trackpad / Opener Notch */}
        <Box
          sx={{
            width: 50,
            height: 4,
            background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(30, 41, 59, 0.8)',
            borderRadius: '0 0 6px 6px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderTop: 'none',
          }}
        />
      </Box>
    </Box>
  );
};

// ==========================================
// 3D IPHONE 16 PRO COMPONENT
// ==========================================
const IPhonePro3D = ({ isDark, isDuo = false }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: isDuo ? { xs: 170, sm: 195, md: 215 } : { xs: 230, sm: 260 },
        mx: 'auto',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Titanium Body Chassis Frame */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          borderRadius: '38px',
          background: isDark
            ? 'linear-gradient(145deg, #334155 0%, #0f172a 60%, #1e293b 100%)'
            : 'linear-gradient(145deg, #64748b 0%, #334155 60%, #475569 100%)',
          p: '8px',
          border: '2.5px solid rgba(148, 163, 184, 0.45)',
          boxShadow: isDark
            ? '0 30px 60px -10px rgba(0, 0, 0, 0.85), 0 0 40px rgba(236, 72, 153, 0.25)'
            : '0 25px 50px -10px rgba(15, 23, 42, 0.35), 0 0 30px rgba(236, 72, 153, 0.18)',
          overflow: 'hidden',
        }}
      >
        {/* OLED Retina Screen */}
        <Box
          sx={{
            borderRadius: '30px',
            overflow: 'hidden',
            background: isDark ? '#05070d' : '#080c14',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative',
            minHeight: isDuo ? { xs: 280, sm: 320, md: 340 } : 380,
            display: 'flex',
            flexDirection: 'column',
            p: 1.5,
          }}
        >
          {/* iOS Dynamic Island Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pt: 0.2,
              pb: 1,
            }}
          >
            <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#f8fafc', pl: 0.5 }}>
              9:41
            </Typography>

            {/* Dynamic Island Pill Notch */}
            <Box
              sx={{
                width: 68,
                height: 18,
                borderRadius: '12px',
                background: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1,
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: '#1e293b',
                  border: '1px solid #334155',
                }}
              />
              <Box sx={{ display: 'flex', gap: 0.3, alignItems: 'center' }}>
                <Box sx={{ width: 2, height: 6, bgcolor: '#38bdf8', borderRadius: 1 }} />
                <Box sx={{ width: 2, height: 10, bgcolor: '#818cf8', borderRadius: 1 }} />
                <Box sx={{ width: 2, height: 7, bgcolor: '#ec4899', borderRadius: 1 }} />
              </Box>
            </Box>

            {/* Status Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, pr: 0.5 }}>
              <FaWifi size={9} color="#e2e8f0" />
              <FaBatteryFull size={11} color="#22c55e" />
            </Box>
          </Box>

          {/* Mobile Screen App UI */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.2, pt: 0.5 }}>
            {/* App Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Box
                  component="img"
                  src="/stackora-icon.png"
                  alt="Stackora"
                  sx={{ width: 20, height: 20, objectFit: 'contain' }}
                />
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: '#ffffff' }}>
                  Stackora App
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                }}
              >
                S
              </Box>
            </Box>

            {/* Featured Gradient Card */}
            <Box
              sx={{
                borderRadius: '14px',
                p: 1.3,
                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                color: '#fff',
                boxShadow: '0 8px 20px rgba(236, 72, 153, 0.4)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Typography sx={{ fontSize: '0.55rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Instant Sync Mobile
              </Typography>
              <Typography sx={{ fontSize: '1.05rem', fontWeight: 800, mt: 0.2 }}>
                100% Fluid
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mt: 0.5 }}>
                <FaBolt size={10} color="#fef08a" />
                <Typography sx={{ fontSize: '0.58rem', fontWeight: 600 }}>
                  Active at 60 FPS
                </Typography>
              </Box>
            </Box>

            {/* Quick Actions Row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0.8 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: '10px',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.3,
                }}
              >
                <Typography sx={{ fontSize: '0.55rem', color: '#94a3b8' }}>Tap Target</Typography>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>48px Min</Typography>
              </Box>
              <Box
                sx={{
                  p: 1,
                  borderRadius: '10px',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.3,
                }}
              >
                <Typography sx={{ fontSize: '0.55rem', color: '#94a3b8' }}>Load Time</Typography>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>0.2s</Typography>
              </Box>
            </Box>

            {/* Activity List Preview */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, flex: 1 }}>
              {[
                { title: 'Auto-detecting screen', sub: 'iPhone 16 Pro Max • 430px', icon: FaMobileAlt, col: '#ec4899' },
                { title: 'Retina Crisp Asset', sub: 'WebP 3x HiDPI loaded', icon: FaCheckCircle, col: '#38bdf8' },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 0.8,
                    borderRadius: '10px',
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: '8px',
                      bgcolor: `${item.col}22`,
                      color: item.col,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <item.icon size={11} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.1 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.52rem', color: '#64748b' }}>
                      {item.sub}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* iOS Home Indicator Bar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.5, pb: 0.2 }}>
              <Box
                sx={{
                  width: 55,
                  height: 3.5,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.35)',
                }}
              />
            </Box>
          </Box>

          {/* Screen Glass Glare Sheen */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 50%)',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

// ==========================================
// MAIN RESPONSIVE SHOWCASE SECTION
// ==========================================
const ResponsiveShowcase = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeTab, setActiveTab] = useState('duo'); // 'duo' | 'desktop' | 'mobile'

  // Interactive 3D Mouse Parallax
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Box
      component="section"
      id="showcase"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        background: isDark
          ? 'radial-gradient(ellipse at 50% 20%, #0f172a 0%, #020617 80%)'
          : 'radial-gradient(ellipse at 50% 20%, #f1f5f9 0%, #e2e8f0 80%)',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambient Glowing Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: { xs: 260, md: 450 },
          height: { xs: 260, md: 450 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: { xs: 280, md: 500 },
          height: { xs: 280, md: 500 },
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(244, 114, 182, 0.14) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={{ xs: 5, md: 6 }} alignItems="center">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: TITLE & INTERACTIVE FEATURE PILLS */}
          {/* ========================================== */}
          <Grid size={{ xs: 12, md: 5.5 }}>
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge Chip */}
              <Chip
                icon={<Sparkles size={14} color="#38bdf8" />}
                label="3D Responsive Architecture"
                sx={{
                  mb: 2.5,
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(129, 140, 248, 0.15))'
                    : 'linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(99, 102, 241, 0.14))',
                  color: isDark ? '#e0f2fe' : '#0369a1',
                  backdropFilter: 'blur(10px)',
                  border: isDark
                    ? '1px solid rgba(56, 189, 248, 0.35)'
                    : '1px solid rgba(14, 165, 233, 0.3)',
                  fontWeight: 700,
                  fontSize: { xs: '0.75rem', sm: '0.85rem' },
                  px: 1.5,
                  py: 1,
                  boxShadow: isDark
                    ? '0 8px 25px rgba(56, 189, 248, 0.2)'
                    : '0 8px 20px rgba(14, 165, 233, 0.15)',
                  '& .MuiChip-icon': {
                    color: '#38bdf8',
                  },
                }}
              />

              {/* Main Heading */}
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  mb: 2.5,
                  background: isDark
                    ? 'linear-gradient(135deg, #ffffff 10%, #7dd3fc 60%, #a5b4fc 100%)'
                    : 'linear-gradient(135deg, #0f172a 10%, #0284c7 60%, #4338ca 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Beautiful on every screen size.
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: isDark ? '#94a3b8' : '#475569',
                  mb: 4,
                  maxWidth: 500,
                  lineHeight: 1.7,
                  fontSize: { xs: '0.95rem', sm: '1.05rem' },
                }}
              >
                From ultra-wide retina displays to compact mobile screens, we build fluid 3D digital experiences 
                that adapt in real-time with pixel perfection and 60 FPS performance.
              </Typography>

              {/* Interactive Feature Pills (Clicking also switches 3D stage!) */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                {[
                  {
                    id: 'mobile',
                    title: 'Mobile-first Architecture',
                    desc: 'Optimized touch targets, dynamic viewports & lightweight bundles.',
                    icon: FaMobileAlt,
                    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
                    glow: 'rgba(236, 72, 153, 0.4)',
                  },
                  {
                    id: 'duo',
                    title: 'Cross-Device Dynamic Fluidity',
                    desc: 'Synchronized layouts that intelligently re-compose across all breakpoints.',
                    icon: FaTabletAlt,
                    gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                    glow: 'rgba(14, 165, 233, 0.4)',
                  },
                  {
                    id: 'desktop',
                    title: 'Retina Desktop Precision',
                    desc: 'GPU-accelerated animations, rich data displays & micro-interactions.',
                    icon: FaDesktop,
                    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    glow: 'rgba(99, 102, 241, 0.4)',
                  },
                ].map((item) => {
                  const isSelected = activeTab === item.id;
                  return (
                    <ButtonBase
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 2,
                        p: 1.8,
                        borderRadius: '16px',
                        textAlign: 'left',
                        width: '100%',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        background: isSelected
                          ? isDark
                            ? 'rgba(30, 41, 59, 0.85)'
                            : 'rgba(255, 255, 255, 0.95)'
                          : isDark
                          ? 'rgba(15, 23, 42, 0.4)'
                          : 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                        border: isSelected
                          ? isDark
                            ? '1.5px solid rgba(56, 189, 248, 0.6)'
                            : '1.5px solid rgba(14, 165, 233, 0.6)'
                          : isDark
                          ? '1px solid rgba(148, 163, 184, 0.12)'
                          : '1px solid rgba(203, 213, 225, 0.6)',
                        boxShadow: isSelected
                          ? isDark
                            ? '0 12px 30px rgba(0, 0, 0, 0.4), 0 0 25px rgba(56, 189, 248, 0.2)'
                            : '0 10px 25px rgba(14, 165, 233, 0.15)'
                          : 'none',
                        transform: isSelected ? 'translateX(6px)' : 'none',
                        '&:hover': {
                          background: isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: item.gradient,
                          color: '#ffffff',
                          boxShadow: `0 6px 16px ${item.glow}`,
                          flexShrink: 0,
                        }}
                      >
                        <item.icon size={20} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 800,
                            color: isSelected
                              ? isDark
                                ? '#38bdf8'
                                : '#0284c7'
                              : isDark
                              ? '#f1f5f9'
                              : '#1e293b',
                            fontSize: '0.95rem',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: isDark ? '#94a3b8' : '#64748b',
                            display: 'block',
                            lineHeight: 1.35,
                            mt: 0.3,
                          }}
                        >
                          {item.desc}
                        </Typography>
                      </Box>
                      <FaArrowRight
                        size={12}
                        color={isSelected ? '#38bdf8' : isDark ? '#475569' : '#94a3b8'}
                        style={{
                          transform: isSelected ? 'translateX(2px)' : 'none',
                          transition: 'transform 0.2s',
                        }}
                      />
                    </ButtonBase>
                  );
                })}
              </Box>
            </MotionBox>
          </Grid>

          {/* ========================================== */}
          {/* RIGHT COLUMN: 3D INTERACTIVE DEVICE STAGE */}
          {/* ========================================== */}
          <Grid size={{ xs: 12, md: 6.5 }}>
            {/* View Mode Selector Tabs */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1.5,
                mb: 3,
                px: 1,
              }}
            >
              {/* Tab Pills */}
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 0.5,
                  borderRadius: '14px',
                  bgcolor: isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(12px)',
                  border: isDark ? '1px solid rgba(148, 163, 184, 0.15)' : '1px solid rgba(203, 213, 225, 0.6)',
                }}
              >
                {[
                  { id: 'duo', label: '3D Duo Stage', icon: Layers },
                  { id: 'desktop', label: 'MacBook Pro', icon: Laptop },
                  { id: 'mobile', label: 'iPhone Pro', icon: Smartphone },
                ].map((tab) => {
                  const active = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <ButtonBase
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.8,
                        px: { xs: 1.2, sm: 1.8 },
                        py: 0.8,
                        borderRadius: '10px',
                        fontSize: { xs: '0.72rem', sm: '0.8rem' },
                        fontWeight: active ? 700 : 500,
                        color: active
                          ? '#ffffff'
                          : isDark
                          ? '#94a3b8'
                          : '#64748b',
                        background: active
                          ? 'linear-gradient(135deg, #0ea5e9, #6366f1)'
                          : 'transparent',
                        boxShadow: active
                          ? '0 4px 15px rgba(14, 165, 233, 0.35)'
                          : 'none',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </ButtonBase>
                  );
                })}
              </Box>

              {/* 3D Motion Prompt Badge */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8,
                  px: 1.4,
                  py: 0.6,
                  borderRadius: '20px',
                  background: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(14, 165, 233, 0.08)',
                  border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(14, 165, 233, 0.25)',
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: '#38bdf8',
                    boxShadow: '0 0 10px #38bdf8',
                  }}
                />
                <Typography sx={{ fontSize: '0.68rem', fontWeight: 600, color: isDark ? '#7dd3fc' : '#0284c7' }}>
                  Interactive 3D • Move Mouse
                </Typography>
              </Box>
            </Box>

            {/* 3D PERSPECTIVE WRAPPER */}
            <Box
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              sx={{
                position: 'relative',
                width: '100%',
                minHeight: { xs: 360, sm: 440, md: 480 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1400px',
                cursor: 'grab',
                '&:active': { cursor: 'grabbing' },
                userSelect: 'none',
              }}
            >
              {/* Animated 3D Rig with Spring Tilt */}
              <MotionBox
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  y: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
                }}
                sx={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transformStyle: 'preserve-3d',
                }}
              >
                <AnimatePresence mode="wait">
                  {/* VIEW 1: DUO 3D SHOWCASE (LAPTOP + PHONE OVERLAP) */}
                  {activeTab === 'duo' && (
                    <MotionBox
                      key="duo"
                      initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                      transition={{ duration: 0.4 }}
                      sx={{
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Laptop in Background */}
                      <Box
                        sx={{
                          transform: {
                            xs: 'scale(0.85) translate(-10px, 0px)',
                            sm: 'rotateY(-6deg) rotateX(4deg) translate(-25px, -5px)',
                            md: 'rotateY(-8deg) rotateX(5deg) translate(-35px, -10px)',
                          },
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.5s ease',
                          width: '100%',
                          maxWidth: { xs: 320, sm: 430, md: 470 },
                        }}
                      >
                        <MacBookPro3D isDark={isDark} isDuo={true} />
                      </Box>

                      {/* iPhone Floating in Foreground with Depth */}
                      <Box
                        sx={{
                          position: 'absolute',
                          right: { xs: 0, sm: '4%', md: '6%' },
                          bottom: { xs: -20, sm: -15, md: -20 },
                          zIndex: 10,
                          transform: 'translateZ(75px) rotateY(8deg) rotateX(-3deg)',
                          transformStyle: 'preserve-3d',
                          filter: 'drop-shadow(0 25px 40px rgba(0, 0, 0, 0.6))',
                        }}
                      >
                        <IPhonePro3D isDark={isDark} isDuo={true} />
                      </Box>

                      {/* Floating Holographic Badge 1: Top Right */}
                      <HolographicBadge
                        icon={<FaBolt size={14} />}
                        label="0.18s Ultra Fast"
                        sublabel="Global Edge Cached"
                        color="#38bdf8"
                        translateZ={95}
                        delay={0.2}
                        sx={{
                          top: { xs: -15, sm: -20 },
                          right: { xs: 5, sm: 20 },
                        }}
                      />

                      {/* Floating Holographic Badge 2: Bottom Left */}
                      <HolographicBadge
                        icon={<Activity size={14} />}
                        label="60 FPS Smooth"
                        sublabel="Zero Layout Shifts"
                        color="#ec4899"
                        translateZ={100}
                        delay={0.5}
                        sx={{
                          bottom: { xs: -10, sm: 10 },
                          left: { xs: 0, sm: 10 },
                        }}
                      />
                    </MotionBox>
                  )}

                  {/* VIEW 2: MACBOOK PRO 3D FOCUS */}
                  {activeTab === 'desktop' && (
                    <MotionBox
                      key="desktop"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.4 }}
                      sx={{
                        position: 'relative',
                        width: '100%',
                        transformStyle: 'preserve-3d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          transform: 'rotateX(3deg)',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <MacBookPro3D isDark={isDark} isDuo={false} />
                      </Box>

                      {/* Floating Badge */}
                      <HolographicBadge
                        icon={<FaDesktop size={14} />}
                        label="Ultra-Wide Retina"
                        sublabel="Adaptive Grid v2"
                        color="#6366f1"
                        translateZ={90}
                        sx={{
                          top: -15,
                          right: { xs: 10, sm: 30 },
                        }}
                      />
                    </MotionBox>
                  )}

                  {/* VIEW 3: IPHONE PRO 3D FOCUS */}
                  {activeTab === 'mobile' && (
                    <MotionBox
                      key="mobile"
                      initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.85, rotateY: -15 }}
                      transition={{ duration: 0.4 }}
                      sx={{
                        position: 'relative',
                        width: '100%',
                        transformStyle: 'preserve-3d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          transform: 'rotateX(-2deg)',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <IPhonePro3D isDark={isDark} isDuo={false} />
                      </Box>

                      {/* Floating Badge */}
                      <HolographicBadge
                        icon={<FaMobileAlt size={14} />}
                        label="Mobile OLED Native"
                        sublabel="PWA Ready • Offline First"
                        color="#ec4899"
                        translateZ={85}
                        sx={{
                          top: 20,
                          left: { xs: 5, sm: 40 },
                        }}
                      />
                      <HolographicBadge
                        icon={<FaShieldAlt size={14} />}
                        label="100% Touch Optimized"
                        sublabel="Zero Mis-taps"
                        color="#10b981"
                        translateZ={95}
                        delay={0.3}
                        sx={{
                          bottom: 25,
                          right: { xs: 5, sm: 40 },
                        }}
                      />
                    </MotionBox>
                  )}
                </AnimatePresence>
              </MotionBox>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default ResponsiveShowcase;
