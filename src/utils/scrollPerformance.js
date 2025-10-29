/**
 * Scroll Performance Optimization Utility
 * Pauses expensive animations during scroll for better performance
 */

let scrollTimeout;
let isScrolling = false;

export const initScrollOptimization = () => {
  if (typeof window === 'undefined') return;

  // Add scroll listener with passive flag for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

const handleScroll = () => {
  if (!isScrolling) {
    isScrolling = true;
    document.body.classList.add('is-scrolling');
    
    // Pause expensive animations
    pauseExpensiveAnimations();
  }

  // Clear existing timeout
  clearTimeout(scrollTimeout);

  // Set new timeout to detect scroll end
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    document.body.classList.remove('is-scrolling');
    
    // Resume animations
    resumeAnimations();
  }, 150); // Resume after 150ms of no scrolling
};

const pauseExpensiveAnimations = () => {
  // Reduce animation complexity during scroll
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
  });
};

const resumeAnimations = () => {
  // Resume animations after scroll ends
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => {
    el.style.animationPlayState = 'running';
  });
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
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
