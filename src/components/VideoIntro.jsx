import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import './VideoIntro.css';

const VideoIntro = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Allow skipping after 2 seconds
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 2000);

    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    };

    const handleCanPlay = () => {
      video.play().catch(err => {
        console.log('Autoplay prevented:', err);
        // If autoplay is blocked, skip intro
        onComplete();
      });
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (canSkip) {
      setIsPlaying(false);
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Video Container */}
          <Box
            className="video-intro-container"
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <video
              ref={videoRef}
              className="video-intro-video"
              muted
              playsInline
              preload="auto"
              webkit-playsinline="true"
              x5-playsinline="true"
            >
              <source src="/DevOra.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Skip Button - Responsive */}
            <AnimatePresence>
              {canSkip && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleSkip}
                  className="skip-button"
                  aria-label="Skip video introduction"
                >
                  Skip Intro →
                </motion.button>
              )}
            </AnimatePresence>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoIntro;
