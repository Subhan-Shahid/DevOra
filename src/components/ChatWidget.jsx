import { useEffect } from 'react';

// Tawk.to Chat Integration
const useTawkChat = () => {
  const tawkPropertyId = import.meta.env.VITE_TAWK_PROPERTY_ID; // e.g., "68e60f74115ee219547e79eb"
  const tawkWidgetId = import.meta.env.VITE_TAWK_WIDGET_ID;   // e.g., "1j71aoo1h"
  const tawkEmbedUrl = import.meta.env.VITE_TAWK_EMBED_URL;    // optional full path after domain, e.g., "68e60f74115ee219547e79eb/1j71aoo1h"

  useEffect(() => {
    if (tawkPropertyId || tawkEmbedUrl) {
      const s1 = document.createElement('script');
      s1.async = true;
      const path = tawkEmbedUrl
        ? tawkEmbedUrl.replace(/^https?:\/\/embed\.tawk\.to\//, '')
        : `${tawkPropertyId}/${tawkWidgetId || 'default'}`;
      s1.src = `https://embed.tawk.to/${path}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      document.body.appendChild(s1);
      return () => { 
        try {
          document.body.removeChild(s1);
        } catch (e) {
          // Script already removed
        }
      };
    }
  }, [tawkPropertyId, tawkWidgetId, tawkEmbedUrl]);
};

const ChatWidget = () => {
  useTawkChat();
  
  // Tawk.to widget will handle all chat functionality
  return null;
};

export default ChatWidget;
