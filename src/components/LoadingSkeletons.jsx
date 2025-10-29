import React from 'react';
import { Box, Card, CardContent, Skeleton, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * Loading skeleton for Hero section
 */
export const HeroSkeleton = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 30%, #e0e7ff 70%, #fae8ff 100%)',
        pt: { xs: 8, md: 10 }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          {/* Chip skeleton */}
          <Skeleton
            variant="rounded"
            width={280}
            height={40}
            sx={{ mx: 'auto', mb: 3, borderRadius: 5 }}
          />
          
          {/* Title skeleton */}
          <Skeleton
            variant="text"
            width="80%"
            height={80}
            sx={{ mx: 'auto', mb: 2 }}
          />
          <Skeleton
            variant="text"
            width="60%"
            height={80}
            sx={{ mx: 'auto', mb: 3 }}
          />
          
          {/* Description skeleton */}
          <Skeleton
            variant="text"
            width="70%"
            height={30}
            sx={{ mx: 'auto', mb: 1 }}
          />
          <Skeleton
            variant="text"
            width="65%"
            height={30}
            sx={{ mx: 'auto', mb: 4 }}
          />
          
          {/* Button skeleton */}
          <Skeleton
            variant="rounded"
            width={180}
            height={50}
            sx={{ mx: 'auto', borderRadius: 5 }}
          />
        </Box>
        
        {/* Stats cards skeleton */}
        <Grid container spacing={5} sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 4 }}>
              <Skeleton
                variant="rounded"
                height={120}
                sx={{ borderRadius: 3 }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

/**
 * Loading skeleton for Service cards
 */
export const ServiceCardSkeleton = () => {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden'
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Icon skeleton */}
        <Skeleton
          variant="circular"
          width={60}
          height={60}
          sx={{ mb: 2 }}
        />
        
        {/* Title skeleton */}
        <Skeleton
          variant="text"
          width="70%"
          height={35}
          sx={{ mb: 1 }}
        />
        
        {/* Description skeleton */}
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mb: 2 }} />
        
        {/* Features skeleton */}
        {[1, 2, 3].map((item) => (
          <Skeleton
            key={item}
            variant="text"
            width="80%"
            height={20}
            sx={{ mb: 1 }}
          />
        ))}
        
        {/* Button skeleton */}
        <Skeleton
          variant="rounded"
          width="100%"
          height={45}
          sx={{ mt: 3, borderRadius: 2 }}
        />
      </CardContent>
    </Card>
  );
};

/**
 * Loading skeleton for Services section
 */
export const ServicesSkeleton = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0e7ff 100%)'
      }}
    >
      <Container maxWidth="lg">
        {/* Section title skeleton */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Skeleton
            variant="text"
            width={300}
            height={60}
            sx={{ mx: 'auto', mb: 2 }}
          />
          <Skeleton
            variant="text"
            width={500}
            height={30}
            sx={{ mx: 'auto' }}
          />
        </Box>
        
        {/* Service cards skeleton */}
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, md: 4 }}>
              <ServiceCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

/**
 * Loading skeleton for Contact Form
 */
export const ContactFormSkeleton = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0e7ff 100%)'
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Skeleton
            variant="text"
            width={300}
            height={60}
            sx={{ mx: 'auto', mb: 2 }}
          />
          <Skeleton
            variant="text"
            width={400}
            height={30}
            sx={{ mx: 'auto' }}
          />
        </Box>
        
        <Card sx={{ p: 4, borderRadius: 4 }}>
          <Grid container spacing={3}>
            {/* Form fields skeleton */}
            {[1, 2, 3, 4].map((item) => (
              <Grid key={item} size={{ xs: 12, sm: item === 4 ? 12 : 6 }}>
                <Skeleton
                  variant="rounded"
                  height={item === 4 ? 120 : 56}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))}
            
            {/* Submit button skeleton */}
            <Grid size={{ xs: 12 }}>
              <Skeleton
                variant="rounded"
                height={50}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

/**
 * Loading skeleton for Service Detail page
 */
export const ServiceDetailSkeleton = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        pt: { xs: 10, md: 12 },
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 30%, #e0e7ff 70%, #fae8ff 100%)'
      }}
    >
      <Container maxWidth="lg">
        {/* Hero section skeleton */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Skeleton variant="text" width={400} height={60} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" width={600} height={30} sx={{ mx: 'auto', mb: 3 }} />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} variant="rounded" width={120} height={32} sx={{ borderRadius: 2 }} />
            ))}
          </Box>
        </Box>
        
        {/* Pricing cards skeleton */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rounded" height={500} sx={{ borderRadius: 4 }} />
            </Grid>
          ))}
        </Grid>
        
        {/* Timeline skeleton */}
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <Skeleton variant="rounded" height={180} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default {
  HeroSkeleton,
  ServiceCardSkeleton,
  ServicesSkeleton,
  ContactFormSkeleton,
  ServiceDetailSkeleton
};
