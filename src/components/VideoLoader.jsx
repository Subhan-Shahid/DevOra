import React, { useEffect, useMemo, useState } from 'react';

const VideoLoader = ({ durationMs = 5000, onComplete }) => {
  const [phase, setPhase] = useState('lottie');

  useEffect(() => {
    let exitTimer;
    let doneTimer;

    // Start exit animation after duration
    exitTimer = setTimeout(() => {
      setPhase('exit');
    }, durationMs - 600);

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
        <div className={`splash-lottie-container ${phase === 'exit' ? 'lottie-fade-out' : ''}`}>
          <dotlottie-wc 
            src="https://lottie.host/a747e6a2-645d-4f59-b259-df7cb7d6657c/mXNn5QjA8h.lottie" 
            style={{ width: '300px', height: '300px' }}
            autoplay 
            loop={false}
          />
        </div>
        
        <div className="splash-logo-simple">
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
