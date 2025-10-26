import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function VideoSplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoLoaded) return;

    // Get video duration and add some buffer time
    const videoDuration = videoRef.current?.duration || 3;
    const totalDuration = (videoDuration * 1000) + 500; // Convert to ms and add 500ms buffer
    const fadeOutDuration = 500;

    const outTimer = setTimeout(() => {
      setIsHiding(true);
      // allow fade-out before finishing
      const finishTimer = setTimeout(() => {
        setVisible(false);
        onFinish?.();
      }, fadeOutDuration);
      return () => clearTimeout(finishTimer);
    }, totalDuration);

    return () => clearTimeout(outTimer);
  }, [onFinish, videoLoaded]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    // Auto-play the video
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Video autoplay failed:", error);
      });
    }
  };

  const handleVideoEnded = () => {
    // Video ended, start hiding process
    setTimeout(() => {
      setIsHiding(true);
      setTimeout(() => {
        setVisible(false);
        onFinish?.();
      }, 500);
    }, 300); // Small delay before hiding
  };

  if (!visible) return null;

  // Get responsive size based on screen width
  const getVideoSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Make video responsive while maintaining aspect ratio
      if (width >= 1024) {
        return { width: Math.min(600, width * 0.6), height: Math.min(400, height * 0.6) };
      }
      if (width >= 768) {
        return { width: Math.min(500, width * 0.7), height: Math.min(350, height * 0.7) };
      }
      return { width: Math.min(400, width * 0.8), height: Math.min(300, height * 0.8) };
    }
    return { width: 500, height: 350 };
  };

  const videoSize = getVideoSize();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isHiding ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        zIndex: 99999,
      }}
    >
      {/* Video Container with Bouncy Entrance */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ 
          scale: videoLoaded ? 1 : 0.8, 
          opacity: videoLoaded ? 1 : 0,
          y: videoLoaded ? 0 : 30
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          type: "spring",
          stiffness: 150,
          damping: 20
        }}
        style={{
          width: videoSize.width,
          height: videoSize.height,
          borderRadius: 20,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          ref={videoRef}
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
            borderRadius: 20,
          }}
          onLoadedData={handleVideoLoaded}
          onEnded={handleVideoEnded}
          muted // Required for autoplay in most browsers
          playsInline // Better mobile support
        >
          <source src="/DevOra.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}>
            <img 
              src="/DevOra.png" 
              alt="DevOra Logo" 
              style={{ maxWidth: "80%", maxHeight: "80%" }}
            />
          </div>
        </video>
      </motion.div>

      {/* Loading indicator while video loads */}
      {!videoLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "absolute",
            bottom: "30%",
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#666",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              width: 20,
              height: 20,
              border: "2px solid #e0e0e0",
              borderTop: "2px solid #667eea",
              borderRadius: "50%",
            }}
          />
          Loading...
        </motion.div>
      )}

    </motion.div>
  );
}
