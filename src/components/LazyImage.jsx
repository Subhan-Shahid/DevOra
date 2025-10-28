import React, { useState, useEffect, useRef } from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * LazyImage component with intersection observer for lazy loading
 * Supports loading skeleton and error handling
 */
const LazyImage = ({ 
  src, 
  alt, 
  width = '100%', 
  height = 'auto',
  aspectRatio,
  objectFit = 'cover',
  borderRadius = 0,
  sx = {},
  skeletonVariant = 'rectangular',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <Box
      ref={imgRef}
      sx={{
        position: 'relative',
        width,
        height: aspectRatio ? 0 : height,
        paddingBottom: aspectRatio ? `${(1 / aspectRatio) * 100}%` : 0,
        overflow: 'hidden',
        borderRadius,
        ...sx
      }}
      {...props}
    >
      {!isLoaded && (
        <Skeleton
          variant={skeletonVariant}
          animation="wave"
          sx={{
            position: aspectRatio ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: aspectRatio ? '100%' : height,
            borderRadius
          }}
        />
      )}
      
      {isInView && !hasError && (
        <Box
          component="img"
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          sx={{
            position: aspectRatio ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: aspectRatio ? '100%' : height,
            objectFit,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            borderRadius
          }}
        />
      )}

      {hasError && (
        <Box
          sx={{
            position: aspectRatio ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: aspectRatio ? '100%' : height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.200',
            color: 'grey.600',
            fontSize: '0.875rem',
            borderRadius
          }}
        >
          Image failed to load
        </Box>
      )}
    </Box>
  );
};

export default LazyImage;
