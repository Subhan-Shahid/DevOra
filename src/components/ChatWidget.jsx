import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, IconButton, Paper, Typography, TextField, Button, Chip, Tooltip, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaPaperPlane, FaTimes, FaWhatsapp } from 'react-icons/fa';

// Optional: load third-party chat via ENV (no-op if not configured)
const useExternalChat = () => {
  const tawkPropertyId = import.meta.env.VITE_TAWK_PROPERTY_ID; // e.g., "68e60f74115ee219547e79eb"
  const tawkWidgetId = import.meta.env.VITE_TAWK_WIDGET_ID;   // e.g., "1j71aoo1h"
  const tawkEmbedUrl = import.meta.env.VITE_TAWK_EMBED_URL;    // optional full path after domain, e.g., "68e60f74115ee219547e79eb/1j71aoo1h"
  const crispId = import.meta.env.VITE_CRISP_WEBSITE_ID;       // e.g., "xxxx-xxxx-xxxx"

  useEffect(() => {
    if (tawkPropertyId || tawkEmbedUrl) {
      const s1 = document.createElement('script');
      s1.async = true;
      const path = tawkEmbedUrl
        ? tawkEmbedUrl.replace(/^https?:\/\/embed\.tawk\.to\//, '')
        : `${tawkPropertyId}/${tawkWidgetId || 'default'}`;
      s1.src = `https://embed.tawk.to/${path}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      document.body.appendChild(s1);
      return () => { document.body.removeChild(s1); };
    }
    if (crispId) {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = crispId;
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      d.getElementsByTagName('head')[0].appendChild(s);
      return () => { try { d.getElementsByTagName('head')[0].removeChild(s); } catch (_) {} };
    }
  }, [tawkPropertyId, tawkWidgetId, tawkEmbedUrl, crispId]);
};

const presetPrompts = [
  'What services do you offer?',
  'How much does a website cost?',
  'Can you build a mobile app?',
  'How fast can we start?'
];

const ChatWidget = () => {
  useExternalChat();
  const tawkEnabled = Boolean(import.meta.env.VITE_TAWK_EMBED_URL || import.meta.env.VITE_TAWK_PROPERTY_ID);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm DevOra Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // Simple canned responses (placeholder)
  const replyTo = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('service')) return 'We offer Software, Website, and App Development. Visit Services for details.';
    if (lower.includes('price') || lower.includes('cost')) return 'Pricing starts from $2,500 for websites, $5,000 for software, and $8,000 for apps.';
    if (lower.includes('start') || lower.includes('timeline')) return 'We can usually start within 1-2 weeks after scoping your project.';
    return "Thanks! I'll forward your query. You can also contact us directly via the buttons below.";
  };

  // Optional AI backend
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const customChatUrl = import.meta.env.VITE_CHAT_API_URL; // expects POST { messages: [{role, content}] }

  const callAI = async (history, userText) => {
    try {
      if (customChatUrl) {
        const res = await fetch(customChatUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history.concat([{ role: 'user', content: userText }]) })
        });
        const data = await res.json();
        return data.reply || data.message || JSON.stringify(data);
      }
      if (openaiKey) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: history.concat([{ role: 'user', content: userText }]).map(m => ({ role: m.role, content: m.content || m.text })),
            temperature: 0.4
          })
        });
        const data = await res.json();
        return data?.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.';
      }
      // No backend configured
      return replyTo(userText);
    } catch (e) {
      return 'There was an error contacting the assistant. Please try again later or use the Contact/WhatsApp options.';
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);
    const historyForAI = messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text }));
    const answer = await callAI(historyForAI, trimmed);
    setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
    setLoading(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, open]);

  const whatsappPrimary = '923216405272';
  const whatsappSecondary = '923396405272';

  // If Tawk is enabled, only load their widget and hide our custom UI
  if (tawkEnabled) {
    return null;
  }

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1200 }}
          >
            <Tooltip title="Chat with us" arrow placement="left">
              <IconButton
                onClick={() => setOpen(true)}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  color: '#fff',
                  background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
                  boxShadow: '0 12px 28px rgba(37,99,235,0.4)',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 14px 32px rgba(37,99,235,0.5)' }
                }}
                aria-label="Open chat"
              >
                <FaComments />
              </IconButton>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 1300 }}
          >
            <Paper elevation={6} sx={{
              width: { xs: 320, sm: 360 },
              height: 460,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              overflow: 'hidden',
              background: 'linear-gradient(180deg, #0b1220 0%, #0e1a2f 100%)',
              color: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(37,99,235,0.25)'
            }}>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.25, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src={`/DevOra.png`} alt="DevOra" style={{ width: 24, height: 24, borderRadius: 6 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}><span style={{ color: '#2563eb' }}>D</span>ev<span style={{ color: '#2563eb' }}>O</span>ra Assistant</Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>Typically replies in minutes</Typography>
                  </Box>
                </Box>
                <IconButton onClick={() => setOpen(false)} sx={{ color: 'rgba(255,255,255,0.9)' }} aria-label="Close chat">
                  <FaTimes />
                </IconButton>
              </Box>

              {/* Body */}
              <Box ref={containerRef} sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {messages.map((m, idx) => (
                  <Box key={idx} sx={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <Box sx={{
                      maxWidth: '80%',
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      background: m.role === 'user'
                        ? 'linear-gradient(135deg, rgba(14,165,233,0.35), rgba(37,99,235,0.35))'
                        : 'linear-gradient(135deg, rgba(96,165,250,0.22), rgba(14,165,233,0.22))',
                      border: '1px solid rgba(255,255,255,0.12)',
                      boxShadow: '0 6px 18px rgba(2,6,23,0.25)'
                    }}>
                      <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{m.text}</Typography>
                    </Box>
                  </Box>
                ))}

                {loading && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Box sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, rgba(96,165,250,0.22), rgba(14,165,233,0.22))',
                      border: '1px solid rgba(255,255,255,0.12)'
                    }}>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={14} sx={{ color: '#60a5fa' }} />
                        Typing...
                      </Typography>
                    </Box>
                  </Box>
                )}

                {/* Quick prompts */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {presetPrompts.map((p) => (
                    <Chip key={p} label={p} onClick={() => setInput(p)} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' }} />
                  ))}
                </Box>
              </Box>

              {/* Footer actions */}
              <Box sx={{ px: 1.5, py: 1.25, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    fullWidth
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                    InputProps={{
                      sx: {
                        color: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.15)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' }
                      }
                    }}
                  />
                  <Tooltip title="Send" arrow>
                    <span>
                      <IconButton onClick={handleSend} disabled={!input.trim() || loading} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.12)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                        <FaPaperPlane />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.25 }}>
                  <Button href="/contact" onClick={() => setOpen(false)} component="a" variant="text" sx={{ color: '#60a5fa', textTransform: 'none' }}>Go to Contact</Button>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="WhatsApp" arrow>
                      <IconButton href={`https://wa.me/${whatsappPrimary}?text=Hello%20DevOra`} target="_blank" rel="noopener noreferrer" sx={{ color: '#25D366' }}>
                        <FaWhatsapp />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="WhatsApp (Alt)" arrow>
                      <IconButton href={`https://wa.me/${whatsappSecondary}?text=Hello%20DevOra`} target="_blank" rel="noopener noreferrer" sx={{ color: '#25D366' }}>
                        <FaWhatsapp />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
