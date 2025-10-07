import React, { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';

/**
 * ContactForm (Formspree)
 * - Modern, animated, responsive contact form
 * - Posts to Formspree endpoint using JSON (free plan)
 * - No EmailJS, Apps Script, Nodemailer, or custom APIs
 */
const ContactForm = () => {
  const theme = useTheme();
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xovklovq";

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // sent as _replyto
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: null, text: "" }); // success | error | null
  const [focusedField, setFocusedField] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const isValid = () =>
    name.trim().length > 0 && /\S+@\S+\.\S+/.test(email) && message.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, text: "" });

    if (!isValid()) {
      setStatus({ type: "error", text: "❌ Please fill out all fields correctly." });
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
        setStatus({ type: "success", text: "✅ Thank you for contacting the DevOra team! We'll reach out soon." });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        let errText = "❌ Something went wrong. Please try again.";
        try {
          const data = await res.json();
          if (data && data.errors && data.errors.length) {
            errText = "❌ " + data.errors.map((e) => e.message).join(", ");
          }
        } catch (_) {}
        setStatus({ type: "error", text: errText });
      }
    } catch (err) {
      setStatus({ type: "error", text: "❌ Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  };

  // Add CSS animations via style tag
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
      @keyframes messageSlideIn {
        0% { 
          opacity: 0; 
          transform: translateY(-30px) scale(0.9); 
          filter: blur(4px);
        }
        50% { 
          opacity: 0.8; 
          transform: translateY(-10px) scale(1.05); 
          filter: blur(1px);
        }
        100% { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
          filter: blur(0px);
        }
      }
      @keyframes messageGlow {
        0%, 100% { 
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3), 0 8px 32px rgba(0,0,0,0.1); 
        }
        50% { 
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.6), 0 12px 40px rgba(0,0,0,0.15); 
        }
      }
      @keyframes messageErrorGlow {
        0%, 100% { 
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.3), 0 8px 32px rgba(0,0,0,0.1); 
        }
        50% { 
          box-shadow: 0 0 40px rgba(239, 68, 68, 0.6), 0 12px 40px rgba(0,0,0,0.15); 
        }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Modern, animated, responsive styles
  const styles = {
    wrap: { 
      display: "grid", 
      placeItems: "center", 
      minHeight: "100vh", 
      padding: 16,
      background: theme.palette.mode === 'dark' 
        ? "linear-gradient(135deg, #0b0d12 0%, #1a1d29 50%, #0f1320 100%)"
        : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      transition: "background 0.3s ease",
      position: "relative",
      overflow: "hidden"
    },
    backgroundDecor: {
      position: "absolute",
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.1)",
      filter: "blur(60px)",
      animation: "float 6s ease-in-out infinite",
    },
    backgroundDecor1: {
      top: "10%",
      left: "-10%",
      animationDelay: "0s",
    },
    backgroundDecor2: {
      bottom: "10%",
      right: "-10%",
      animationDelay: "3s",
    },
    card: {
      width: "100%", 
      maxWidth: 720,
      background: theme.palette.mode === 'dark' 
        ? "rgba(26, 29, 41, 0.95)"
        : "rgba(255,255,255,0.95)",
      backdropFilter: "blur(20px)",
      color: theme.palette.mode === 'dark' ? "#e8eefc" : "#2c3e50",
      transition: "background 0.3s ease, color 0.3s ease",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: 24,
      padding: 32,
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      fontFamily: `system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Arial, sans-serif`,
      position: "relative",
      zIndex: 2,
      transform: "translateY(0)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    cardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 25px 80px rgba(0,0,0,0.2)",
    },
    header: {
      textAlign: "center",
      marginBottom: 32,
    },
    overline: {
      color: "rgba(102, 126, 234, 0.8)",
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: 2,
      textTransform: "uppercase",
      margin: 0,
      marginBottom: 8,
    },
    title: { 
      margin: 0, 
      fontWeight: 800, 
      fontSize: 36,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: 8,
    },
    subtitle: { 
      margin: 0, 
      color: "#64748b", 
      fontSize: 16,
      lineHeight: 1.6,
    },
    form: { display: "grid", gap: 20 },
    fieldGroup: {
      position: "relative",
    },
    label: { 
      display: "block", 
      fontSize: 14, 
      color: theme.palette.mode === 'dark' ? "#b6c2e2" : "#374151", 
      marginBottom: 8,
      fontWeight: 600,
      transition: "color 0.2s ease",
    },
    input: {
      width: "100%",
      padding: "16px 20px",
      background: theme.palette.mode === 'dark' 
        ? "rgba(15, 19, 32, 0.8)"
        : "rgba(255,255,255,0.8)",
      color: theme.palette.mode === 'dark' ? "#e8eefc" : "#1f2937",
      border: "2px solid rgba(102, 126, 234, 0.2)",
      borderRadius: 16,
      outline: "none",
      fontSize: 16,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    },
    inputFocus: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.1), 0 8px 30px rgba(0,0,0,0.1)",
      transform: "translateY(-2px)",
    },
    textarea: {
      width: "100%",
      minHeight: 160,
      resize: "vertical",
      background: theme.palette.mode === 'dark' 
        ? "rgba(15, 19, 32, 0.8)"
        : "rgba(255,255,255,0.8)",
      color: theme.palette.mode === 'dark' ? "#e8eefc" : "#1f2937",
      border: "2px solid rgba(102, 126, 234, 0.2)",
      borderRadius: 16,
      padding: "16px 20px",
      outline: "none",
      fontSize: 16,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    },
    textareaFocus: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.1), 0 8px 30px rgba(0,0,0,0.1)",
      transform: "translateY(-2px)",
    },
    actions: { 
      display: "flex", 
      gap: 16, 
      alignItems: "center", 
      flexWrap: "wrap",
      marginTop: 8,
    },
    button: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#fff",
      border: "none",
      borderRadius: 16,
      padding: "16px 32px",
      fontWeight: 700,
      fontSize: 16,
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
      transform: "translateY(0)",
    },
    buttonHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed",
      transform: "translateY(0)",
    },
    note: { 
      fontSize: 14, 
      color: "#64748b",
      fontStyle: "italic",
    },
    msg: { 
      fontSize: 18, 
      padding: "20px 24px", 
      borderRadius: 20, 
      marginBottom: 24,
      fontWeight: 700,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      animation: "messageSlideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
      backdropFilter: "blur(10px)",
      border: "2px solid transparent",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    },
    success: { 
      background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)", 
      borderImage: "linear-gradient(135deg, rgba(34, 197, 94, 0.5), rgba(16, 185, 129, 0.3)) 1",
      color: "#047857",
      animation: "messageSlideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), messageGlow 2s ease-in-out infinite, pulse 3s ease-in-out infinite",
      textShadow: "0 1px 2px rgba(34, 197, 94, 0.3)",
    },
    error: { 
      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%)", 
      borderImage: "linear-gradient(135deg, rgba(239, 68, 68, 0.5), rgba(220, 38, 38, 0.3)) 1",
      color: "#b91c1c",
      animation: "messageSlideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), messageErrorGlow 2s ease-in-out infinite, pulse 3s ease-in-out infinite",
      textShadow: "0 1px 2px rgba(239, 68, 68, 0.3)",
    },
    messageIcon: {
      display: "inline-block",
      marginRight: "8px",
      fontSize: "20px",
      animation: "pulse 2s ease-in-out infinite",
    },
  };

  return (
    <section style={styles.wrap}>
      {/* Animated background decorations */}
      <div style={{...styles.backgroundDecor, ...styles.backgroundDecor1}}></div>
      <div style={{...styles.backgroundDecor, ...styles.backgroundDecor2}}></div>
      
      <div 
        style={{
          ...styles.card,
          ...(isHovered ? styles.cardHover : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {status.type === "success" ? (
          <div role="status" aria-live="polite">
            <div style={{ ...styles.msg, ...styles.success }}>{status.text}</div>
          </div>
        ) : (
          <div style={{ display: status.type === "success" ? "none" : "block" }}>
            <div style={styles.header}>
              <p style={styles.overline}>Let's Connect</p>
              <h2 style={styles.title}>Contact Us</h2>
              <p style={styles.subtitle}>
                Ready to transform your ideas into reality? Let's discuss your project and create something amazing together.
              </p>
            </div>

            <div role="status" aria-live="polite">
              {status.type === "error" && (
                <div style={{ ...styles.msg, ...styles.error }}>{status.text}</div>
              )}
            </div>

            <form onSubmit={handleSubmit} style={styles.form} noValidate>
              <div style={styles.fieldGroup}>
                <label htmlFor="name" style={styles.label}>Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...styles.input,
                    ...(focusedField === 'name' ? styles.inputFocus : {})
                  }}
                />
              </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...styles.input,
                ...(focusedField === 'email' ? styles.inputFocus : {})
              }}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="message" style={styles.label}>Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="How can we help?"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...styles.textarea,
                ...(focusedField === 'message' ? styles.textareaFocus : {})
              }}
            />
          </div>

              <div style={styles.actions}>
                <button 
                  type="submit" 
                  style={{
                    ...styles.button,
                    ...(sending ? styles.buttonDisabled : {})
                  }}
                  disabled={sending}
                  onMouseEnter={(e) => !sending && Object.assign(e.target.style, styles.buttonHover)}
                  onMouseLeave={(e) => !sending && Object.assign(e.target.style, { transform: 'translateY(0)', boxShadow: styles.button.boxShadow })}
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
                <span style={styles.note}>We respect your privacy and will respond within 24 hours.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
