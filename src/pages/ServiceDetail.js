import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Chip, Button, Breadcrumbs } from '@mui/material';
import Grid from '@mui/material/Grid';
import { servicesData } from '../data/services';
import { FaArrowLeft } from 'react-icons/fa';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    // Navigate to 404 if not found
    navigate('/not-found', { replace: true });
    return null;
  }

  return (
    <Box sx={{
      py: { xs: 6, md: 10 },
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ color: 'white', mb: 2 }}>
          <Link to="/" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>Home</Link>
          <Link to="/services" style={{ color: 'white', opacity: 0.8, textDecoration: 'none' }}>Services</Link>
          <Typography sx={{ color: 'white' }}>{service.title}</Typography>
        </Breadcrumbs>

        <Box sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.2)',
          p: { xs: 3, md: 5 },
          color: 'white',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
        }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            {service.title}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            {service.summary}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                {service.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
                {service.features.map((f, idx) => (
                  <Chip key={idx} label={f} sx={{
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }} />
                ))}
              </Box>

              <Button component={Link} to="/contact" variant="contained" color="primary">
                Get a Quote
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{
                borderRadius: '16px',
                p: 3,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <Typography variant="subtitle1" sx={{ mb: 1, opacity: 0.9 }}>Includes</Typography>
                <ul style={{ marginTop: 0 }}>
                  {service.features.map((f, idx) => (
                    <li key={idx} style={{ marginBottom: 8 }}>{f}</li>
                  ))}
                </ul>
                <Button component={Link} to="/services" startIcon={<FaArrowLeft />} sx={{ color: 'white' }}>
                  Back to Services
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ServiceDetail;
