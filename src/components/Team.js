import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaBullhorn, FaPalette, FaLinkedin, FaTwitter, FaGithub, FaUsers, FaLightbulb, FaRocket } from 'react-icons/fa';
import { MdDesignServices, MdCampaign, MdDeveloperMode } from 'react-icons/md';

const teamData = [
  {
    id: 'developers',
    title: 'Development Team',
    description: 'Building the future with cutting-edge technology and innovative solutions',
    icon: FaCode,
    color: 'primary',
    members: [
      {
        name: 'Subhan Shahid',
        role: 'Lead Developer',
        avatar: '/WhatsApp Image 2025-07-15 at 10.23.43_85183503.jpg',
        bio: 'Full-stack developer with 8+ years of experience in React, Node.js, and cloud architecture.',
        skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
        social: {
          linkedin: '#',
          github: '#',
          twitter: '#'
        }
      }
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing Team',
    description: 'Driving growth through strategic marketing and brand excellence',
    icon: FaBullhorn,
    color: 'secondary',
    members: [
      {
        name: 'Abdullah Zahid',
        role: 'Marketing Director',
        avatar: '/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall.jpg',
        bio: 'Strategic marketing leader with 10+ years driving digital transformation and growth.',
        skills: ['Strategy', 'Analytics', 'SEO', 'Content'],
        social: {
          linkedin: '#',
          twitter: '#'
        }
      }
    ]
  },
  {
    id: 'designers',
    title: 'Design Team',
    description: 'Creating beautiful, intuitive experiences that users love',
    icon: FaPalette,
    color: 'tertiary',
    members: [
      {
        name: 'David Kim',
        role: 'Lead Designer',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
        bio: 'Creative director with expertise in user experience design and visual storytelling.',
        skills: ['UI/UX', 'Figma', 'Prototyping', 'Branding'],
        social: {
          linkedin: '#',
          twitter: '#'
        }
      }
    ]
  }
];

const TeamMemberCard = ({ member, teamColor, theme, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTeamColors = (colorKey) => {
    const colorMap = {
      primary: {
        gradient: theme.palette.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        main: theme.palette.primary.main,
        light: theme.palette.primary.light,
        particle: theme.palette.mode === 'dark' ? 'rgba(102, 126, 234, 0.8)' : 'rgba(102, 126, 234, 0.6)'
      },
      secondary: {
        gradient: theme.palette.gradient?.secondary || 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        main: theme.palette.secondary.main,
        light: theme.palette.secondary.light,
        particle: theme.palette.mode === 'dark' ? 'rgba(240, 147, 251, 0.8)' : 'rgba(240, 147, 251, 0.6)'
      },
      tertiary: {
        gradient: theme.palette.gradient?.tertiary || 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        main: theme.palette.tertiary?.main || '#4facfe',
        light: theme.palette.tertiary?.light || '#7bc8fe',
        particle: theme.palette.mode === 'dark' ? 'rgba(79, 172, 254, 0.8)' : 'rgba(79, 172, 254, 0.6)'
      }
    };
    return colorMap[teamColor] || colorMap.primary;
  };

  const colors = getTeamColors(teamColor);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        sx={{
          height: '100%',
          borderRadius: '25px',
          overflow: 'hidden',
          position: 'relative',
          background: theme.palette.mode === 'dark'
            ? (isHovered ? 'rgba(18, 21, 32, 0.9)' : 'rgba(18, 21, 32, 0.7)')
            : (isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)'),
          backdropFilter: 'blur(20px)',
          boxShadow: isHovered
            ? `0 25px 80px rgba(0,0,0,0.3), 0 0 40px ${colors.particle}`
            : (theme.palette.mode === 'dark' 
                ? '0 15px 50px rgba(0,0,0,0.4)' 
                : '0 15px 50px rgba(0,0,0,0.1)'),
          border: theme.palette.mode === 'dark'
            ? `1px solid rgba(255,255,255,${isHovered ? '0.2' : '0.1'})`
            : `1px solid rgba(255,255,255,${isHovered ? '0.6' : '0.3'})`,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: colors.gradient,
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease infinite'
          }
        }}
      >
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <motion.div
            animate={isHovered ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Avatar
              src={member.avatar}
              alt={member.name}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                border: `3px solid ${colors.main}`,
                boxShadow: `0 8px 25px ${colors.particle}`,
                transition: 'all 0.3s ease',
                objectFit: 'cover',
                objectPosition: 'center top',
                '& img': {
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  width: '100%',
                  height: '100%'
                }
              }}
            />
          </motion.div>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 0.5,
              background: colors.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {member.name}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 2,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1
            }}
          >
            {member.role}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 2,
              lineHeight: 1.6,
              fontSize: '0.9rem'
            }}
          >
            {member.bio}
          </Typography>

          {/* Skills */}
          <Box sx={{ mb: 3 }}>
            {member.skills.map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                style={{
                  display: 'inline-block',
                  margin: '2px',
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: colors.main,
                  background: theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.05)' 
                    : 'rgba(255,255,255,0.7)',
                  borderRadius: '12px',
                  border: `1px solid ${colors.main}20`
                }}
              >
                {skill}
              </motion.span>
            ))}
          </Box>

          {/* Social Links */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            {member.social.linkedin && (
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Box
                  component="a"
                  href={member.social.linkedin}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 35,
                    height: 35,
                    borderRadius: '50%',
                    background: colors.gradient,
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 5px 15px ${colors.particle}`
                    }
                  }}
                >
                  <FaLinkedin size={16} />
                </Box>
              </motion.div>
            )}
            {member.social.twitter && (
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Box
                  component="a"
                  href={member.social.twitter}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 35,
                    height: 35,
                    borderRadius: '50%',
                    background: colors.gradient,
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 5px 15px ${colors.particle}`
                    }
                  }}
                >
                  <FaTwitter size={16} />
                </Box>
              </motion.div>
            )}
            {member.social.github && (
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Box
                  component="a"
                  href={member.social.github}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 35,
                    height: 35,
                    borderRadius: '50%',
                    background: colors.gradient,
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 5px 15px ${colors.particle}`
                    }
                  }}
                >
                  <FaGithub size={16} />
                </Box>
              </motion.div>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TeamSection = ({ team, theme, index }) => {
  const Icon = team.icon;
  
  const getTeamColors = (colorKey) => {
    const colorMap = {
      primary: {
        gradient: theme.palette.gradient?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        main: theme.palette.primary.main,
        particle: theme.palette.mode === 'dark' ? 'rgba(102, 126, 234, 0.8)' : 'rgba(102, 126, 234, 0.6)'
      },
      secondary: {
        gradient: theme.palette.gradient?.secondary || 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        main: theme.palette.secondary.main,
        particle: theme.palette.mode === 'dark' ? 'rgba(240, 147, 251, 0.8)' : 'rgba(240, 147, 251, 0.6)'
      },
      tertiary: {
        gradient: theme.palette.gradient?.tertiary || 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        main: theme.palette.tertiary?.main || '#4facfe',
        particle: theme.palette.mode === 'dark' ? 'rgba(79, 172, 254, 0.8)' : 'rgba(79, 172, 254, 0.6)'
      }
    };
    return colorMap[colorKey] || colorMap.primary;
  };

  const colors = getTeamColors(team.color);

  return (
    <Box sx={{ mb: { xs: 8, md: 12 } }}>
      {/* Team Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: colors.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: `0 10px 30px ${colors.particle}`,
                backgroundSize: '200% 200%',
                animation: 'gradientShift 4s ease infinite'
              }}
            >
              <Icon style={{ fontSize: '2rem', color: 'white' }} />
            </Box>
          </motion.div>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: colors.gradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            {team.title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6
            }}
          >
            {team.description}
          </Typography>
        </Box>
      </motion.div>

      {/* Team Members */}
      <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
        {team.members.map((member, memberIndex) => (
          <Grid item key={member.name} xs={12} sm={6} md={4}>
            <TeamMemberCard
              member={member}
              teamColor={team.color}
              theme={theme}
              index={memberIndex}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Team = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #0b0d12 0%, #1a1d29 50%, #0f1320 100%)'
          : 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 30% 40%, rgba(102, 126, 234, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(240, 147, 251, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(circle at 30% 40%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(240, 147, 251, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}
    >
      {/* Background Decorations */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '-3%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))'
            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          filter: 'blur(60px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}>
            <Typography
              variant="overline"
              sx={{
                background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 3s ease infinite',
                fontWeight: 700,
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                letterSpacing: { xs: 2, md: 3 },
                mb: 2
              }}
            >
              👥 MEET OUR TEAM 👥
            </Typography>

            <Typography
              variant="h1"
              component="h2"
              sx={{
                fontWeight: 900,
                color: theme.palette.text.primary,
                mb: { xs: 3, md: 4 },
                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                lineHeight: 1.1
              }}
            >
              The People Behind{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  backgroundSize: '200% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'holographicShift 6s ease infinite'
                }}
              >
                DevOra
              </span>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: { xs: '95%', sm: '85%', md: '700px' },
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: '1.1rem', md: '1.35rem' },
                fontWeight: 400
              }}
            >
              🚀 Meet the talented individuals who bring creativity, expertise, and passion to every project we deliver
            </Typography>
          </Box>
        </motion.div>

        {/* Team Sections */}
        {teamData.map((team, index) => (
          <TeamSection
            key={team.id}
            team={team}
            theme={theme}
            index={index}
          />
        ))}
      </Container>
    </Box>
  );
};

export default Team;
