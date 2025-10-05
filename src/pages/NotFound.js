import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center', color: 'white' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Typography variant="h1" sx={{ fontWeight: 800, mb: 2 }}>404</Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
            The page you are looking for doesn't exist.
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Go Home
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default NotFound;
