import React, { useEffect, useMemo, useState } from 'react';

const VideoLoader = ({ durationMs = 5000, onComplete }) => {
  const [phase, setPhase] = useState('enter');

  const exitDelayMs = useMemo(() => Math.max(0, durationMs - 600), [durationMs]);

  useEffect(() => {
    let exitTimer;
    let doneTimer;

    exitTimer = setTimeout(() => {
      setPhase('exit');
    }, exitDelayMs);

    doneTimer = setTimeout(() => {
      onComplete?.();
    }, durationMs);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [durationMs, exitDelayMs, onComplete]);

  return (
    <div className={`splash-overlay ${phase === 'exit' ? 'splash-overlay--exit' : ''}`}>
      <div className="splash-stage">
        <div className="splash-lottie-container">
          <dotlottie-wc 
            src="https://lottie.host/e63e940e-68d4-4acf-a6e1-7fc9bb55fdb8/aAvRePQDDg.lottie" 
            style={{ width: '800px', height: '800px' }}
            autoplay 
            loop
          />
        </div>
      </div>
      
      <div className="splash-logo-container">
        <h1 className="splash-logo-text">
          <span className="logo-letter-blue">D</span>
          <span className="logo-letter-white">ev</span>
          <span className="logo-letter-blue">O</span>
          <span className="logo-letter-white">ra</span>
        </h1>
      </div>
    </div>
  );
};

export default VideoLoader;
