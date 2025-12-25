import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaRocket, FaCode, FaPalette, FaMobile } from 'react-icons/fa';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const projects = [
  {
    id: 1,
    title: "E-Commerce Revolution",
    category: "Web Development",
    description: "A modern e-commerce platform with AI-powered recommendations, real-time inventory management, and seamless payment integration.",
    image: "/project1.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    features: ["AI Recommendations", "Real-time Analytics", "Mobile Responsive", "Payment Gateway"],
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/example/ecommerce",
    icon: FaRocket,
    color: "#6366f1"
  },
  {
    id: 2,
    title: "Healthcare Dashboard",
    category: "SaaS Platform",
    description: "Comprehensive healthcare management system with patient records, appointment scheduling, and telemedicine capabilities.",
    image: "/project2.jpg",
    technologies: ["Vue.js", "Python", "PostgreSQL", "AWS"],
    features: ["Patient Management", "Video Consultation", "Data Analytics", "HIPAA Compliant"],
    liveUrl: "https://example.com/healthcare",
    githubUrl: "https://github.com/example/healthcare",
    icon: FaCode,
    color: "#10b981"
  },
  {
    id: 3,
    title: "Creative Portfolio",
    category: "UI/UX Design",
    description: "Stunning portfolio website with immersive animations, 3D elements, and optimized performance for creative professionals.",
    image: "/project3.jpg",
    technologies: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
    features: ["3D Animations", "Dynamic Layouts", "CMS Integration", "SEO Optimized"],
    liveUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/example/portfolio",
    icon: FaPalette,
    color: "#f59e0b"
  },
  {
    id: 4,
    title: "Mobile Banking App",
    category: "Mobile Development",
    description: "Secure and intuitive mobile banking application with biometric authentication, transaction history, and budget tracking.",
    image: "/project4.jpg",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    features: ["Biometric Security", "Real-time Transactions", "Budget Analytics", "Push Notifications"],
    liveUrl: "https://example.com/banking",
    githubUrl: "https://github.com/example/banking",
    icon: FaMobile,
    color: "#ef4444"
  },
  {
    id: 5,
    title: "AI Content Platform",
    category: "Machine Learning",
    description: "Intelligent content generation platform leveraging GPT models for automated article creation and content optimization.",
    image: "/project5.jpg",
    technologies: ["Python", "TensorFlow", "FastAPI", "React"],
    features: ["AI Content Generation", "SEO Optimization", "Multi-language Support", "Analytics Dashboard"],
    liveUrl: "https://example.com/ai-content",
    githubUrl: "https://github.com/example/ai-content",
    icon: FaRocket,
    color: "#8b5cf6"
  },
  {
    id: 6,
    title: "Real Estate Portal",
    category: "Web Development",
    description: "Comprehensive real estate platform with virtual tours, property management, and integrated CRM for agents.",
    image: "/project6.jpg",
    technologies: ["Angular", "Node.js", "MySQL", "Mapbox"],
    features: ["Virtual Tours", "Property Management", "CRM Integration", "Advanced Search"],
    liveUrl: "https://example.com/realestate",
    githubUrl: "https://github.com/example/realestate",
    icon: FaCode,
    color: "#06b6d4"
  }
];

const Projects = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 8, md: 12 },
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)'
          : 'linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 50%, #ffffff 100%)',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3 } }}>
        {/* Page Header */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          textAlign="center"
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              fontWeight: 800,
              mb: 2,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 50%, #6366f1 100%)'
                : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            Our Recent Projects
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
              px: { xs: 2, sm: 0 },
            }}
          >
            Explore our latest work and see how we've helped businesses transform their digital presence with cutting-edge solutions
          </Typography>
        </MotionBox>

        {/* Projects Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {projects.map((project, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
              <MotionCard
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                sx={{
                  height: '100%',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(30, 41, 59, 0.8)'
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: theme.palette.mode === 'dark'
                    ? '1px solid rgba(148, 163, 184, 0.2)'
                    : '1px solid rgba(226, 232, 240, 0.8)',
                  borderRadius: '20px',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 10px 40px rgba(0, 0, 0, 0.3)'
                    : '0 10px 40px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                      : '0 20px 60px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                {/* Project Header */}
                <Box
                  sx={{
                    p: 3,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
                    borderBottom: theme.palette.mode === 'dark'
                      ? '1px solid rgba(148, 163, 184, 0.1)'
                      : '1px solid rgba(226, 232, 240, 0.5)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                        color: '#fff',
                        boxShadow: `0 8px 20px ${project.color}40`,
                      }}
                    >
                      <project.icon size={24} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Chip
                        label={project.category}
                        size="small"
                        sx={{
                          background: theme.palette.mode === 'dark'
                            ? `${project.color}20`
                            : `${project.color}15`,
                          color: project.color,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          border: `1px solid ${project.color}30`,
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1.1rem', md: '1.2rem' },
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </Typography>
                </Box>

                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      lineHeight: 1.6,
                      flexGrow: 1,
                    }}
                  >
                    {project.description}
                  </Typography>

                  {/* Technologies */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        mb: 1,
                        display: 'block',
                      }}
                    >
                      Technologies
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.technologies.map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          size="small"
                          sx={{
                            background: theme.palette.mode === 'dark'
                              ? 'rgba(148, 163, 184, 0.1)'
                              : 'rgba(100, 116, 139, 0.1)',
                            color: theme.palette.text.secondary,
                            fontSize: '0.7rem',
                            height: 24,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Features */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        mb: 1,
                        display: 'block',
                      }}
                    >
                      Key Features
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {project.features.slice(0, 3).map((feature, i) => (
                        <Typography
                          key={i}
                          variant="caption"
                          sx={{
                            color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
                            fontSize: '0.7rem',
                            '&:not(:last-child)::after': {
                              content: '"•"',
                              mx: 0.5,
                            },
                          }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FaExternalLinkAlt size={12} />}
                      sx={{
                        flex: 1,
                        borderColor: project.color,
                        color: project.color,
                        fontSize: '0.8rem',
                        py: 0.8,
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          background: `${project.color}10`,
                          borderColor: project.color,
                        },
                      }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FaGithub size={12} />}
                      sx={{
                        flex: 1,
                        borderColor: theme.palette.mode === 'dark' ? '#475569' : '#cbd5e1',
                        color: theme.palette.text.secondary,
                        fontSize: '0.8rem',
                        py: 0.8,
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          background: theme.palette.mode === 'dark' ? 'rgba(71, 85, 105, 0.1)' : 'rgba(203, 213, 225, 0.3)',
                        },
                      }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code
                    </Button>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          textAlign="center"
          sx={{ mt: 8 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 3,
              color: theme.palette.text.primary,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
            }}
          >
            Ready to Start Your Project?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '600px',
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Let's bring your ideas to life with our expert development team. Contact us today to discuss your project requirements.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5558e3, #7c3aed)',
                boxShadow: '0 15px 40px rgba(99, 102, 241, 0.5)',
                transform: 'translateY(-2px)',
              },
            }}
            href="/contact"
          >
            Get Started
          </Button>
        </MotionBox>
      </Container>

      {/* Background Decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '8%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default Projects;
