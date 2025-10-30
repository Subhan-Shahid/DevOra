import { useEffect } from 'react';

// Tawk.to Chat Integration
const useTawkChat = () => {
  const tawkPropertyId = import.meta.env.VITE_TAWK_PROPERTY_ID || import.meta.env.REACT_APP_TAWK_PROPERTY_ID; // e.g., "68e60f74115ee219547e79eb"
  const tawkWidgetId = import.meta.env.VITE_TAWK_WIDGET_ID || import.meta.env.REACT_APP_TAWK_WIDGET_ID;   // e.g., "1j71aoo1h"
  const tawkEmbedUrl = import.meta.env.VITE_TAWK_EMBED_URL || import.meta.env.REACT_APP_TAWK_EMBED_URL;    // optional full path after domain, e.g., "68e60f74115ee219547e79eb/1j71aoo1h"

  useEffect(() => {
    console.log('Tawk.to Debug:', { tawkPropertyId, tawkWidgetId, tawkEmbedUrl });
    
    if (tawkPropertyId || tawkEmbedUrl) {
      // Check if Tawk script is already loaded
      const existingScript = document.querySelector('script[src*="embed.tawk.to"]');
      if (existingScript) {
        console.log('Tawk.to script already exists');
        return;
      }

      const s1 = document.createElement('script');
      s1.async = true;
      const path = tawkEmbedUrl
        ? tawkEmbedUrl.replace(/^https?:\/\/embed\.tawk\.to\//, '')
        : `${tawkPropertyId}/${tawkWidgetId || 'default'}`;
      s1.src = `https://embed.tawk.to/${path}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      
      s1.onload = () => console.log('Tawk.to script loaded successfully');
      s1.onerror = () => console.error('Failed to load Tawk.to script');
      
      document.body.appendChild(s1);
      console.log('Tawk.to script added:', s1.src);
      
      return () => { 
        try {
          document.body.removeChild(s1);
          console.log('Tawk.to script removed');
        } catch (e) {
          // Script already removed
        }
      };
    } else {
      console.warn('Tawk.to credentials not found in environment variables');
    }
  }, [tawkPropertyId, tawkWidgetId, tawkEmbedUrl]);
};

const ChatWidget = () => {
  useTawkChat();
  
  // Tawk.to widget will handle all chat functionality
  return null;
};

export default ChatWidget;
