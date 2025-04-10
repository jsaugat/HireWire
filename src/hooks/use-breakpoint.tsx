import { useState, useEffect } from 'react';

// Breakpoint values in pixels
export const breakpoints = {
  sm: 640,    // 40rem
  md: 768,    // 48rem
  lg: 1024,   // 64rem
  xl: 1280,   // 80rem
  '2xl': 1536, // 96rem
  '3xl': 1920  // 120rem (1920px)
};

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type BreakpointState = Record<Exclude<Breakpoint, 'xs'>, boolean> & { current: Breakpoint };

export function useBreakpoint(): BreakpointState {
  // Initialize with default state
  const [breakpointState, setBreakpointState] = useState<BreakpointState>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
    '3xl': false,
    current: 'xs',
  });

  useEffect(() => {
    // Function to calculate current breakpoint and state
    const calculateBreakpoint = () => {
      const width = window.innerWidth;

      // Check which breakpoints are currently active
      const sm = width >= breakpoints.sm;
      const md = width >= breakpoints.md;
      const lg = width >= breakpoints.lg;
      const xl = width >= breakpoints.xl;
      const xxl = width >= breakpoints['2xl'];
      const xxxl = width >= breakpoints['3xl'];

      // Determine the current highest breakpoint
      let current: Breakpoint = 'xs';
      if (xxxl) current = '3xl';
      else if (xxl) current = '2xl';
      else if (xl) current = 'xl';
      else if (lg) current = 'lg';
      else if (md) current = 'md';
      else if (sm) current = 'sm';

      setBreakpointState({
        sm,
        md,
        lg,
        xl,
        '2xl': xxl,
        '3xl': xxxl,
        current,
      });
    };

    // Calculate initial breakpoint
    calculateBreakpoint();

    // Set up event listener for window resize
    window.addEventListener('resize', calculateBreakpoint);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', calculateBreakpoint);
    };
  }, []);

  return breakpointState;
}