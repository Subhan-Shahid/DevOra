import React from 'react';
import { Container, Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

function ThankYou() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      }}
    >
      <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{
              borderRadius: 4,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)'
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
              <FaCheckCircle size={56} color="#22c55e" style={{ marginBottom: 12 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#2c3e50', mb: 1 }}>
                Message sent!
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                Thanks for reaching out. We'll get back to you shortly.
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/"
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}

export default ThankYou;
