import React, { useState, useEffect, useRef } from 'react';

const VideoLoader = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    // Lock body scroll and prevent zoom on mobile
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    const handleEnded = () => {
      setIsLoading(false);
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    
    // Auto-start video with better error handling
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error('Video play error:', error);
        // Fallback: hide loader after 3 seconds if video fails
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.height = '';
        }, 3000);
      }
    };

    playVideo();

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-hidden">
      {/* Loading spinner while video loads */}
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      )}
      
      {/* Video container with responsive sizing */}
      <div className="video-loader-container">
        <video
          ref={videoRef}
          className={`
            max-w-full max-h-full w-auto h-auto object-contain
            transition-opacity duration-500
            ${videoLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          muted
          playsInline
          preload="auto"
          style={{
            maxWidth: '100vw',
            maxHeight: '100vh',
            width: 'auto',
            height: 'auto'
          }}
        >
          <source src="/DevOra.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoLoader;
