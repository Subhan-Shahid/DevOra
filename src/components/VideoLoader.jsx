import React, { useEffect, useMemo, useState } from 'react';

const VideoLoader = ({ durationMs = 750, onComplete }) => {
  const [phase, setPhase] = useState('lottie');

  useEffect(() => {
    let exitTimer;
    let doneTimer;

    // Start exit animation after duration
    exitTimer = setTimeout(() => {
      setPhase('exit');
    }, Math.max(durationMs - 250, 100));

    // Complete the entire sequence
    doneTimer = setTimeout(() => {
      onComplete?.();
    }, durationMs);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [durationMs, onComplete]);

  return (
    <div className={`splash-overlay ${phase === 'exit' ? 'splash-overlay--exit' : ''}`}>
      <div className="splash-stage">
        <div className={`splash-logo-simple ${phase === 'exit' ? 'logo-fade-out' : ''}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <img
            src="/stackora-icon.png"
            alt="Stackora Softworks"
            style={{ width: '80px', height: '80px', objectFit: 'contain', filter: 'drop-shadow(0 4px 20px rgba(56, 189, 248, 0.5))' }}
          />
          <h1 className="splash-logo-text-simple" style={{ margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span className="logo-letter-blue">Stack</span>
            <span className="logo-letter-white">ora</span>
          </h1>
          <span style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 600 }}>
            Softworks
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoLoader;
