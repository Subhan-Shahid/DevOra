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
                      Peoples Colony, Gujranwala, Pakistan
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
      </Container>

      {/* Floating background elements */}
      <motion.div
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
      
      <motion.div
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
    </Box>
  );
};

export default Footer;
