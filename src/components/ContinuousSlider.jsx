import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';

const ContinuousSlider = React.memo(() => {
  const theme = useTheme();

  const programmingLanguages = [
    {
      id: 1,
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "#F7DF1E"
    },
    {
      id: 2,
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "#3776AB"
    },
    {
      id: 3,
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61DAFB"
    },
    {
      id: 4,
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "#339933"
    },
    {
      id: 5,
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "#3178C6"
    },
    {
      id: 6,
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "#ED8B00"
    },
    {
      id: 7,
      name: "PHP",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      color: "#777BB4"
    },
    {
      id: 8,
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "#47A248"
    },
    {
      id: 9,
      name: "MySQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      color: "#4479A1"
    },
    {
      id: 10,
      name: "Docker",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      color: "#2496ED"
    },
    {
      id: 11,
      name: "AWS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      color: "#FF9900"
    },
    {
      id: 12,
      name: "Git",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "#F05032"
    }
  ];

  // Duplicate items for seamless loop (translateX(-50%) trick)
  const duplicatedItems = [...programmingLanguages, ...programmingLanguages];

  return (
    <Box component="section" id="tech">
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, overflow: 'hidden' }}>
        {/* Section Header */}
        <Box textAlign="center" sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 800,
              mb: { xs: 1, md: 2 },
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 50%, #6366f1 100%)'
                : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}
          >
            Technologies We Use
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
              px: { xs: 2, sm: 0 }
            }}
          >
            Modern programming languages and tools that drive innovation
          </Typography>
        </Box>

        {/* Continuous Scrolling Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '120px', sm: '140px', md: '180px' },
            overflow: 'hidden',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0e7ff 100%)',
            borderRadius: 4,
            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
            boxShadow: theme.palette.mode === 'dark'
              ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(129, 140, 248, 0.1)'
              : '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 60px rgba(99, 102, 241, 0.05)',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '100px',
              zIndex: 2,
              pointerEvents: 'none'
            },
            '&::before': {
              left: 0,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #0f172a 0%, transparent 100%)'
                : 'linear-gradient(90deg, #ffffff 0%, transparent 100%)'
            },
            '&::after': {
              right: 0,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(270deg, #0f172a 0%, transparent 100%)'
                : 'linear-gradient(270deg, #ffffff 0%, transparent 100%)'
            },
            // Pause the track animation on container hover
            '&:hover .tech-track': {
              animationPlayState: 'paused'
            },
            '@keyframes techScroll': {
              '0%': { transform: 'translateX(0)' },
              '100%': { transform: 'translateX(-50%)' }
            },
          }}
        >
          {/* Scrolling Content Track */}
          <Box
            className="tech-track"
            sx={{
              display: 'inline-flex',
              alignItems: 'stretch',
              height: '100%',
              // The track is twice the content (duplicated); animate -50% for a seamless loop
              animation: 'techScroll 30s linear infinite',
              willChange: 'transform'
            }}
          >
            {duplicatedItems.map((item, index) => (
              <Box
                key={`${item.id}-${index}`}
                style={{
                  minWidth: 'auto',
                  height: '100%',
                  margin: '0 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    width: { xs: 120, sm: 140, md: 160 },
                    height: { xs: '90px', sm: '110px', md: '140px' },
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.03)'
                      : 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    padding: 2,
                    border: theme.palette.mode === 'dark'
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                      : '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    willChange: 'transform',
                    '&:hover': {
                      transform: 'translateY(-6px) scale(1.05)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px ${item.color}40`
                        : `0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px ${item.color}30`,
                    }
                  }}
                >
                  {/* Logo */}
                  <Box
                    component="img"
                    src={item.logo}
                    alt={item.name}
                    sx={{
                      width: { xs: '32px', sm: '40px', md: '50px' },
                      height: { xs: '32px', sm: '40px', md: '50px' },
                      objectFit: 'contain',
                      mb: { xs: 0.5, sm: 1, md: 1.5 },
                      filter: theme.palette.mode === 'dark' ? 'brightness(1.1)' : 'brightness(0.9)',
                      transition: 'all 0.3s ease'
                    }}
                  />

                  {/* Language Name */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                      textAlign: 'center',
                      opacity: 0.9
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      
      {/* Bottom Text */}
      <Box textAlign="center" sx={{ mt: { xs: 3, md: 4 } }}>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            fontStyle: 'italic',
            opacity: 0.8
          }}
        >
          Continuously innovating to deliver exceptional digital experiences
        </Typography>
      </Box>
      </Container>
    </Box>
  );
});

export default ContinuousSlider;
