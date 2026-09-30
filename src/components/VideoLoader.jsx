import React, { useEffect, useMemo, useState } from 'react';

const VideoLoader = ({ durationMs = 2000, onComplete }) => {
  const [phase, setPhase] = useState('lottie');

  useEffect(() => {
    let exitTimer;
    let doneTimer;

    // Start exit animation after duration
    exitTimer = setTimeout(() => {
      setPhase('exit');
    }, durationMs - 400);

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
        <div className={`splash-logo-simple ${phase === 'exit' ? 'logo-fade-out' : ''}`}>
          <h1 className="splash-logo-text-simple">
            <span className="logo-letter-blue">D</span>
            <span className="logo-letter-white">ev</span>
            <span className="logo-letter-blue">O</span>
            <span className="logo-letter-white">ra</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VideoLoader;
