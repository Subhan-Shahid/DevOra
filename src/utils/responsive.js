// Responsive utility functions and breakpoints
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export const mediaQueries = {
  up: (breakpoint) => `@media (min-width: ${breakpoints[breakpoint]}px)`,
  down: (breakpoint) => `@media (max-width: ${breakpoints[breakpoint] - 1}px)`,
  between: (start, end) => 
    `@media (min-width: ${breakpoints[start]}px) and (max-width: ${breakpoints[end] - 1}px)`,
};

// Hook to detect screen size
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

// Get current breakpoint
export const getCurrentBreakpoint = (width) => {
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

// Responsive spacing helper
export const getResponsiveSpacing = (xs, sm, md, lg, xl) => ({
  xs: xs || 1,
  sm: sm || xs || 2,
  md: md || sm || xs || 3,
  lg: lg || md || sm || xs || 4,
  xl: xl || lg || md || sm || xs || 5,
});

// Responsive font size helper
export const getResponsiveFontSize = (xs, sm, md, lg, xl) => ({
  xs: `${xs || 0.875}rem`,
  sm: `${sm || xs || 1}rem`,
  md: `${md || sm || xs || 1.125}rem`,
  lg: `${lg || md || sm || xs || 1.25}rem`,
  xl: `${xl || lg || md || sm || xs || 1.5}rem`,
});
