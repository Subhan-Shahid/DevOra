import React, { useRef, useState } from 'react';
import { Container, TextField, Button, Typography, Box, Card, CardContent, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import ParticleBackground from './ParticleBackground';
// Removed EmailJS; using fetch to Google Apps Script instead

const Contact = () => {
  // Google Apps Script Web App endpoint (handles sending notification + auto-reply)
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxWjD2Stum6UsBLWtRebpgGl_9SAnGrT85Y_dOyZyYEKeuv01so3M12wWgKn9pM1m0/exec';

  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      setShowError(true);
      return;
    }

    setSubmitting(true);

    try {
      // Build FormData payload to avoid CORS preflight
      const formBody = new FormData();
      formBody.append('name', `${formData.firstName} ${formData.lastName}`.trim());
      formBody.append('_replyto', formData.email.trim());
      // Also include explicit 'email' for backend convenience
      formBody.append('email', formData.email.trim());
      formBody.append('message', formData.message.trim());

      // Important: do NOT set Content-Type header; the browser will set it for FormData
      // Use no-cors to bypass missing CORS headers from Apps Script (response will be opaque)
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formBody,
      });

      // If no exception was thrown, treat as success (opaque response can't be inspected)
      setShowSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Contact submission error:', error);
      setErrorMsg('❌ Failed to send. Please try again later.');
      setShowError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ 
      py: { xs: 6, md: 10 }, 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100dvh'
    }}>
      {/* Particle Background (disabled on small/reduced motion) */}
      {!(typeof window !== 'undefined' && (window.innerWidth < 600 || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches))) && (
        <ParticleBackground />
      )}
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
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
                color: 'rgba(255,255,255,0.8)', 
                fontWeight: 600, 
                fontSize: { xs: '0.8rem', md: '1rem' },
                letterSpacing: { xs: 1, md: 2 }
              }}
            >
              LET'S CONNECT
            </Typography>
            <Typography 
              variant="h2" 
              component="h2"
              sx={{ 
                fontWeight: 800, 
                color: 'white',
                mb: { xs: 2, md: 3 },
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                px: { xs: 1, sm: 0 }
              }}
            >
              Get In <span style={{ 
                background: 'linear-gradient(45deg, #ffd700 0%, #ffed4e 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Touch</span>
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)', 
                maxWidth: { xs: '90%', sm: '80%', md: '600px' }, 
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.25rem' },
                px: { xs: 1, sm: 0 }
              }}
            >
              Ready to transform your ideas into reality? Let's discuss your project and create something amazing together.
            </Typography>
          </Box>
        </motion.div>
        
        <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="center">
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card 
                sx={{ 
                  borderRadius: '20px',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  maxWidth: 760,
                  mx: 'auto'
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    color: '#2c3e50', 
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '1.3rem', md: '1.5rem' }
                  }}>
                    Send us a message 💬
                  </Typography>
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="firstName"
                          label="First Name"
                          variant="outlined"
                          value={formData.firstName}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&:hover fieldset': {
                                borderColor: '#667eea',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="lastName"
                          label="Last Name"
                          variant="outlined"
                          value={formData.lastName}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&:hover fieldset': {
                                borderColor: '#667eea',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="email"
                          label="Email Address"
                          type="email"
                          variant="outlined"
                          value={formData.email}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&:hover fieldset': {
                                borderColor: '#667eea',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="phone"
                          label="Phone Number (Optional)"
                          variant="outlined"
                          value={formData.phone}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&:hover fieldset': {
                                borderColor: '#667eea',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="message"
                          label="Tell us about your project"
                          multiline
                          rows={4}
                          variant="outlined"
                          value={formData.message}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&:hover fieldset': {
                                borderColor: '#667eea',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button 
                          type="submit" 
                          variant="contained" 
                          size="large"
                          fullWidth
                          endIcon={<FaPaperPlane />}
                          disabled={submitting}
                          sx={{ 
                            py: 2,
                            fontSize: '1.1rem',
                            borderRadius: '50px',
                            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)'
                            }
                          }}
                        >
                          {submitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          
        </Grid>
      </Container>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ width: '100%', borderRadius: '12px' }}
          icon={<FaCheckCircle />}
        >
          ✅ Thank you for contacting us! We’ll reach out soon.
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowError(false)} 
          severity="error" 
          sx={{ width: '100%', borderRadius: '12px' }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
