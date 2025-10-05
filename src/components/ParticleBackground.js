import React, { useCallback, useMemo } from 'react';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    // console.log(container);
  }, []);

  // Memoize options to avoid recalculations and reinitializations
  const options = useMemo(() => {
    const isSmall = typeof window !== 'undefined' ? window.innerWidth < 600 : false;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const baseCount = prefersReducedMotion ? 10 : isSmall ? 18 : 35;
    const fps = prefersReducedMotion ? 30 : isSmall ? 48 : 60;
    const speed = prefersReducedMotion ? 0.15 : 0.3;

    return {
      background: { color: { value: 'transparent' } },
      fpsLimit: fps,
      interactivity: {
        events: {
          // Disable expensive interactions for performance
          onClick: { enable: false },
          onHover: { enable: false },
          resize: true,
        },
      },
      particles: {
        color: { value: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'] },
        links: { enable: false },
        collisions: { enable: false },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'out' },
          random: false,
          speed,
          straight: false,
        },
        number: {
          density: { enable: true, area: isSmall ? 1000 : 900 },
          value: baseCount,
        },
        opacity: { value: prefersReducedMotion ? 0.18 : 0.25 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: prefersReducedMotion ? 2 : 3 } },
      },
      detectRetina: false,
    };
  }, []);

  // Avoid rendering particles on small screens or when reduced motion is preferred
  const shouldDisable = typeof window !== 'undefined'
    ? (window.innerWidth < 600 || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches))
    : false;

  if (shouldDisable) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
};

export default React.memo(ParticleBackground);

