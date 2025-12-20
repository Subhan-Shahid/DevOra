/**
 * Scroll Performance Optimization Utility
 * Pauses expensive animations during scroll for better performance
 */

let scrollTimeout;
let rafId;
let isScrolling = false;
const SCROLL_END_DELAY_MS = 120;

export const initScrollOptimization = () => {
  if (typeof window === 'undefined') return;

  // Add scroll listener with passive flag for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(scrollTimeout);
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = undefined;
    }

    if (isScrolling && typeof document !== 'undefined') {
      isScrolling = false;
      document.body.classList.remove('is-scrolling');
      window.dispatchEvent(new CustomEvent('scrollopt:end'));
    }
  };
};

const handleScroll = () => {
  if (!rafId) {
    rafId = window.requestAnimationFrame(() => {
      rafId = undefined;
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add('is-scrolling');
        window.dispatchEvent(new CustomEvent('scrollopt:start'));
      }
    });
  }

  // Clear existing timeout
  clearTimeout(scrollTimeout);

  // Set new timeout to detect scroll end
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    document.body.classList.remove('is-scrolling');
    window.dispatchEvent(new CustomEvent('scrollopt:end'));
  }, SCROLL_END_DELAY_MS); // Resume shortly after scroll ends
};

// Debounce utility for resize events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
