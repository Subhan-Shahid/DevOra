import React from 'react';
import { Container, Typography, Link as MuiLink, Box, IconButton, useTheme, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub, FaHeart, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const SocialIcon = ({ icon: Icon, href, color, label }) => (
  <motion.div
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <IconButton
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      sx={{
        color: 'white',
        bgcolor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: color,
          boxShadow: `0 8px 25px ${color}40`,
          transform: 'translateY(-3px)'
        }
      }}
    >
      <Icon />
    </IconButton>
  </motion.div>
);

const FooterLink = ({ children, ...props }) => (
  <motion.div
    whileHover={{ x: 5 }}
    transition={{ duration: 0.2 }}
  >
    <MuiLink
      {...props}
      sx={{
        display: 'block',
        mb: 1.5,
        color: 'rgba(255,255,255,0.8)',
        textDecoration: 'none',
        fontSize: '0.95rem',
        transition: 'all 0.3s ease',
        '&:hover': {
          color: '#ffd700',
          textDecoration: 'none'
        }
      }}
    >
      {children}
    </MuiLink>
  </motion.div>
);

const Footer = () => {
  const theme = useTheme();
  const socialLinks = [
    { icon: FaFacebookF, href: import.meta.env.VITE_FACEBOOK_URL || '#', color: '#3b5998', label: 'Facebook' },
    { icon: FaTwitter, href: import.meta.env.VITE_TWITTER_URL || '#', color: '#1da1f2', label: 'Twitter' },
    { icon: FaLinkedinIn, href: import.meta.env.VITE_LINKEDIN_URL || '#', color: '#0077b5', label: 'LinkedIn' },
    { icon: FaInstagram, href: import.meta.env.VITE_INSTAGRAM_URL || '#', color: '#e4405f', label: 'Instagram' },
    { icon: FaGithub, href: import.meta.env.VITE_GITHUB_URL || '#', color: '#333', label: 'GitHub' }
  ];

  const recentProjects = [
    {
      title: 'Physio Clinic Management',
      description: 'Comprehensive management platform for physiotherapy clinics, featuring patient records, appointment scheduling, billing system, and analytics dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      highlight: 'Live in Production',
      url: 'https://physio-clinic-one.vercel.app/',
      accent: '#10b981',
      icon: '🏥',
      features: ['Patient Management', 'Appointment Scheduling', 'Billing & Invoicing', 'Analytics Dashboard']
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0a0b0f 0%, #1a1d29 100%)'
          : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        transition: 'background 0.3s ease',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.1) 0%, transparent 50%)',
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 3 } }}>
                <img
                  src={`/DevOra.png`}
                  alt="DevOra logo"
                  style={{ height: '28px', width: '28px', marginRight: '12px', borderRadius: '6px' }}
                />
                <Typography variant="h4" sx={{
                  fontWeight: 800,
                  color: 'white',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}>
                  <span style={{ color: '#2563eb' }}>D</span>ev<span style={{ color: '#2563eb' }}>O</span>ra
                </Typography>
              </Box>
              <Typography variant="body1" sx={{
                mb: { xs: 3, md: 4 },
                opacity: 0.9,
                lineHeight: 1.7,
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}>
                Transforming ideas into powerful digital solutions through innovative software,
                web, and mobile app development. Your success is our mission.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {socialLinks.map((social, index) => (
                  <SocialIcon
                    key={index}
                    icon={social.icon}
                    href={social.href}
                    color={social.color}
                    label={social.label}
                  />
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Our Recent Projects Section */}
          <Grid size={{ xs: 12 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Box
                sx={{
                  mt: { xs: 4, md: 6 },
                  mb: { xs: 4, md: 5 },
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  background: 'linear-gradient(145deg, rgba(16,185,129,0.08) 0%, rgba(5,150,105,0.12) 100%)',
                  border: '2px solid rgba(16,185,129,0.3)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(16,185,129,0.1)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'pulse 4s ease-in-out infinite',
                  },
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
                    '50%': { opacity: 0.8, transform: 'scale(1.1)' },
                  },
                }}
              >
                {/* Section Header */}
                <Box sx={{ mb: 4, position: 'relative', zIndex: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        letterSpacing: 0.5,
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          fontSize: '2rem',
                          filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.5))',
                        }}
                      >
                        🚀
                      </Box>
                      Our Recent Projects
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        maxWidth: 600,
                      }}
                    >
                      Showcasing our latest work in healthcare technology
                    </Typography>
                  </motion.div>
                </Box>

                {/* Floating Medical Icons */}
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '15%',
                    right: '8%',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '3rem',
                      filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.6))',
                    }}
                  >
                    💊
                  </Box>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -8, 8, 0],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '5%',
                    opacity: 0.25,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '2.5rem',
                      filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.6))',
                    }}
                  >
                    🩺
                  </Box>
                </motion.div>

                {/* Project Card */}
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  {recentProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      <Box
                        sx={{
                          p: { xs: 3, md: 4 },
                          borderRadius: 3,
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                          border: `2px solid ${project.accent}40`,
                          boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 20px ${project.accent}20`,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            border: `2px solid ${project.accent}`,
                            boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.accent}40`,
                            '& .project-icon': {
                              transform: 'scale(1.1) rotate(10deg)',
                            },
                            '& .demo-button': {
                              transform: 'translateX(5px)',
                              boxShadow: `0 0 30px ${project.accent}60`,
                            },
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `radial-gradient(circle at 30% 50%, ${project.accent}10, transparent 60%)`,
                            opacity: 0.8,
                          },
                        }}
                      >
                        <Grid container spacing={3}>
                          {/* Left Side - Project Info */}
                          <Grid size={{ xs: 12, md: 7 }}>
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                              {/* Project Icon & Title */}
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <motion.div
                                  className="project-icon"
                                  animate={{
                                    rotate: [0, 5, -5, 0],
                                  }}
                                  transition={{ duration: 3, repeat: Infinity }}
                                  style={{ transition: 'transform 0.4s ease' }}
                                >
                                  <Box
                                    sx={{
                                      width: { xs: 50, md: 60 },
                                      height: { xs: 50, md: 60 },
                                      borderRadius: '50%',
                                      background: `linear-gradient(135deg, ${project.accent}, ${project.accent}dd)`,
                                      border: `3px solid ${project.accent}`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: { xs: '1.8rem', md: '2rem' },
                                      boxShadow: `0 0 30px ${project.accent}60`,
                                    }}
                                  >
                                    {project.icon}
                                  </Box>
                                </motion.div>

                                <Box>
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      fontWeight: 800,
                                      color: 'white',
                                      fontSize: { xs: '1.3rem', md: '1.6rem' },
                                      mb: 0.5,
                                    }}
                                  >
                                    {project.title}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <motion.div
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    >
                                      <Box
                                        sx={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: '50%',
                                          backgroundColor: project.accent,
                                          boxShadow: `0 0 15px ${project.accent}`,
                                        }}
                                      />
                                    </motion.div>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: project.accent,
                                        fontWeight: 700,
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5,
                                      }}
                                    >
                                      {project.highlight}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>

                              {/* Description */}
                              <Typography
                                variant="body1"
                                sx={{
                                  color: 'rgba(255,255,255,0.85)',
                                  mb: 3,
                                  fontSize: { xs: '0.95rem', md: '1rem' },
                                  lineHeight: 1.7,
                                }}
                              >
                                {project.description}
                              </Typography>

                              {/* Tech Stack */}
                              <Box sx={{ mb: 3 }}>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: 'rgba(255,255,255,0.7)',
                                    mb: 1.5,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: 1,
                                    fontWeight: 700,
                                  }}
                                >
                                  Tech Stack
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                  {project.tech.map((tech, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.5 + i * 0.1 }}
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      <Box
                                        sx={{
                                          px: 2,
                                          py: 0.75,
                                          borderRadius: 2,
                                          background: `linear-gradient(135deg, ${project.accent}25, ${project.accent}15)`,
                                          border: `1.5px solid ${project.accent}50`,
                                          fontSize: '0.85rem',
                                          fontWeight: 600,
                                          color: 'white',
                                          boxShadow: `0 2px 8px ${project.accent}20`,
                                        }}
                                      >
                                        {tech}
                                      </Box>
                                    </motion.div>
                                  ))}
                                </Box>
                              </Box>

                              {/* View Live Demo Button */}
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <MuiLink
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  sx={{ textDecoration: 'none' }}
                                >
                                  <Box
                                    className="demo-button"
                                    sx={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: 1.5,
                                      px: 3,
                                      py: 1.5,
                                      borderRadius: 3,
                                      background: `linear-gradient(135deg, ${project.accent}, ${project.accent}dd)`,
                                      border: `2px solid ${project.accent}`,
                                      color: 'white',
                                      fontWeight: 700,
                                      fontSize: '1rem',
                                      cursor: 'pointer',
                                      transition: 'all 0.3s ease',
                                      boxShadow: `0 4px 20px ${project.accent}40`,
                                      '&:hover': {
                                        background: `linear-gradient(135deg, ${project.accent}dd, ${project.accent})`,
                                      },
                                    }}
                                  >
                                    <Box component="span">View Live Demo</Box>
                                    <Box
                                      component="span"
                                      sx={{
                                        fontSize: '1.3rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      →
                                    </Box>
                                  </Box>
                                </MuiLink>
                              </motion.div>
                            </Box>
                          </Grid>

                          {/* Right Side - Features */}
                          <Grid size={{ xs: 12, md: 5 }}>
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  color: 'rgba(255,255,255,0.7)',
                                  mb: 2,
                                  fontSize: '0.75rem',
                                  textTransform: 'uppercase',
                                  letterSpacing: 1,
                                  fontWeight: 700,
                                }}
                              >
                                Key Features
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {project.features.map((feature, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                    viewport={{ once: true }}
                                  >
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        p: 1.5,
                                        borderRadius: 2,
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                          background: 'rgba(255,255,255,0.08)',
                                          border: `1px solid ${project.accent}40`,
                                          transform: 'translateX(5px)',
                                        },
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: '50%',
                                          backgroundColor: project.accent,
                                          boxShadow: `0 0 10px ${project.accent}`,
                                          flexShrink: 0,
                                        }}
                                      />
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          color: 'rgba(255,255,255,0.9)',
                                          fontSize: '0.9rem',
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
                          </Grid>
                        </Grid>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#ffd700', mb: 3 }}>
                Quick Links
              </Typography>
              <Box>
                <FooterLink component={Link} to="/">
                  Home
                </FooterLink>
                <FooterLink component={Link} to="/services">
                  Services
                </FooterLink>
                <FooterLink component={Link} to="/contact">
                  Contact
                </FooterLink>
                <FooterLink href="#about">
                  About Us
                </FooterLink>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#ffd700', mb: 3 }}>
                Services
              </Typography>
              <Box>
                <FooterLink href="#software">
                  Software Development
                </FooterLink>
                <FooterLink href="#web">
                  Website Development
                </FooterLink>
                <FooterLink href="#mobile">
                  App Development
                </FooterLink>
                <FooterLink href="#consulting">
                  Tech Consulting
                </FooterLink>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#ffd700', mb: 3 }}>
                Get In Touch
              </Typography>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MdEmail style={{ fontSize: '1.2rem', marginRight: '12px', color: '#ffd700' }} />
                  <MuiLink
                    href="mailto:devora.pk@gmail.com"
                    sx={{ opacity: 0.9, color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: '#ffd700' } }}
                  >
                    devora.pk@gmail.com
                  </MuiLink>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MdPhone style={{ fontSize: '1.2rem', marginRight: '12px', color: '#ffd700' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MuiLink
                        href="tel:+923396405272"
                        sx={{ opacity: 0.9, color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline', color: '#ffd700' } }}
                      >
                        +92 339 640 5272
                      </MuiLink>
                      <IconButton
                        href="https://wa.me/923396405272?text=Hello%20DevOra"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp +92 339 640 5272"
                        size="small"
                        sx={{ color: '#25D366', bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: 'rgba(37,211,102,0.15)' } }}
                      >
                        <FaWhatsapp />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <MdLocationOn style={{ fontSize: '1.2rem', marginRight: '12px', color: '#ffd700', marginTop: '2px' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.5 }}>
                      Ilfad, London, UK
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.5 }}>
                      Gujranwala, Pakistan
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              mt: 6,
              pt: 4,
              textAlign: 'center',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '15px',
              p: 3
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
              © {new Date().getFullYear()} <span style={{ color: '#2563eb' }}>D</span>ev<span style={{ color: '#2563eb' }}>O</span>ra. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Made with
              </Typography>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaHeart style={{ color: '#ff6b6b', fontSize: '1rem' }} />
              </motion.div>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                by <span style={{ color: '#2563eb' }}>D</span>ev<span style={{ color: '#2563eb' }}>O</span>ra Team
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container >

      {/* Floating background elements */}
      < motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(255,215,0,0.1), rgba(255,215,0,0.05))',
          zIndex: 1
        }}
      />

      < motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '5%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05))',
          zIndex: 1
        }}
      />
    </Box >
  );
};

export default Footer;
