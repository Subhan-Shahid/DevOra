import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const total = 3500; // total duration per spec
    const fadeOutDuration = 500;

    const outTimer = setTimeout(() => {
      setIsHiding(true);
      // allow fade-out before finishing
      const finishTimer = setTimeout(() => {
        setVisible(false);
        onFinish?.();
      }, fadeOutDuration);
      return () => clearTimeout(finishTimer);
    }, total);

    return () => clearTimeout(outTimer);
  }, [onFinish]);

  if (!visible) return null;

  const shapeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

  // Helper to compute background position for each quadrant
  const getBgPosition = (index) => {
    switch (index) {
      case 0: return '0% 0%';       // top-left
      case 1: return '100% 0%';     // top-right
      case 2: return '0% 100%';     // bottom-left
      case 3: return '100% 100%';   // bottom-right
      default: return '50% 50%';
    }
  };

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
        background: "#ffffff",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 0,
          marginBottom: 24,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={shapeVariants}
            style={{
              width: 220,
              height: 220,
              borderRadius: 0,
              backgroundImage: `url(/DevOra.png)`,
              backgroundSize: '200% 200%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: getBgPosition(i),
            }}
          />
        ))}
      </div>

      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHiding ? 0 : 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          fontSize: 48,
          fontWeight: 600,
          color: "#0f172a",
          letterSpacing: 0.5,
        }}
      >
        <span style={{ color: "#2563eb" }}>D</span>
        <span>ev</span>
        <span style={{ color: "#2563eb" }}>O</span>
        <span>ra</span>
      </motion.span>
    </motion.div>
  );
}
