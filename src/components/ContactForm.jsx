import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  useTheme,
  Paper,
  CircularProgress,
  Alert,
  Slide
} from '@mui/material';
import { motion } from 'framer-motion';
import { MdSend, MdEmail, MdPerson, MdMessage } from 'react-icons/md';

const ContactForm = () => {
  const theme = useTheme();
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xovklovq"; // Replace with your endpoint if different

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: null, text: "" });

  const isValid = () =>
    name.trim().length > 0 && /\S+@\S+\.\S+/.test(email) && message.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, text: "" });

    if (!isValid()) {
      setStatus({ type: "error", text: "Please fill out all fields correctly." });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          _replyto: email,
          message,
        }),
      });

      if (res.ok) {
        setStatus({ type: "success", text: "Thank you! We'll reach out soon." });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({ type: "error", text: "Something went wrong. Please try again." });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  };

  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 10 },
        background: isDark
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decor */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '400px',
            height: '400px',
            background: isDark
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '500px',
            height: '500px',
            background: isDark
              ? 'radial-gradient(circle, rgba(13, 148, 136, 0.05) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(13, 148, 136, 0.03) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box textAlign="center" sx={{ mb: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: isDark ? '#60a5fa' : '#2563eb',
                fontWeight: 700,
                letterSpacing: 2,
                mb: 1,
                display: 'block'
              }}
            >
              LET'S CONNECT
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: isDark
                  ? 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)'
                  : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: isDark ? '#94a3b8' : '#64748b',
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Have a project in mind? We'd love to verify your ideas and help you build something amazing.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 4,
              background: isDark
                ? 'rgba(30, 41, 59, 0.6)'
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: isDark
                ? '1px solid rgba(148, 163, 184, 0.1)'
                : '1px solid rgba(226, 232, 240, 0.8)',
              boxShadow: isDark
                ? '0 20px 40px rgba(0, 0, 0, 0.2)'
                : '0 20px 40px rgba(0, 0, 0, 0.05)',
            }}
          >
            {status.text && (
              <Slide direction="down" in={!!status.text} mountOnEnter unmountOnExit>
                <Alert
                  severity={status.type || 'info'}
                  sx={{ mb: 4, borderRadius: 2 }}
                >
                  {status.text}
                </Alert>
              </Slide>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'grid', gap: 3 }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: <MdPerson style={{ marginRight: 8, color: isDark ? '#94a3b8' : '#64748b' }} />,
                    sx: { borderRadius: 2 }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
                    }
                  }}
                />

                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: <MdEmail style={{ marginRight: 8, color: isDark ? '#94a3b8' : '#64748b' }} />,
                    sx: { borderRadius: 2 }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
                    }
                  }}
                />

                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  InputProps={{
                    startAdornment: <MdMessage style={{ marginRight: 8, marginTop: 4, alignSelf: 'flex-start', color: isDark ? '#94a3b8' : '#64748b' }} />,
                    sx: { borderRadius: 2 }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : '#f8fafc',
                    }
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={sending}
                  endIcon={sending ? <CircularProgress size={20} color="inherit" /> : <MdSend />}
                  sx={{
                    py: 1.5,
                    mt: 1,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: isDark
                      ? 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)'
                      : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    boxShadow: isDark
                      ? '0 4px 12px rgba(37, 99, 235, 0.4)'
                      : '0 4px 12px rgba(59, 130, 246, 0.3)',
                    '&:hover': {
                      background: isDark
                        ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                        : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    }
                  }}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContactForm;
