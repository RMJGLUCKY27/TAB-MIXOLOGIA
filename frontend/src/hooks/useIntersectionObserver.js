import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for Intersection Observer API
 * Optimizes performance by triggering animations only when elements are visible
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  // Default options
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
    ...options
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if Intersection Observer is supported
    if (!window.IntersectionObserver) {
      // Fallback for older browsers
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isCurrentlyIntersecting);
        
        // If triggerOnce is true, only trigger the first time
        if (isCurrentlyIntersecting && defaultOptions.triggerOnce && !hasIntersected) {
          setHasIntersected(true);
        } else if (!defaultOptions.triggerOnce) {
          setHasIntersected(isCurrentlyIntersecting);
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [
    defaultOptions.threshold,
    defaultOptions.rootMargin,
    defaultOptions.triggerOnce,
    hasIntersected
  ]);

  // Return the ref and intersection state
  return [
    elementRef,
    defaultOptions.triggerOnce ? hasIntersected : isIntersecting,
    isIntersecting
  ];
};

/**
 * Hook for scroll-based animations
 * Provides scroll position and direction information
 */
export const useScrollPosition = () => {
  const [scrollData, setScrollData] = useState({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    direction: 'up'
  });

  useEffect(() => {
    let ticking = false;

    const updateScrollData = () => {
      const x = window.pageXOffset;
      const y = window.pageYOffset;

      setScrollData(prev => ({
        x,
        y,
        lastX: prev.x,
        lastY: prev.y,
        direction: y > prev.y ? 'down' : 'up'
      }));

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollData);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollData;
};

/**
 * Hook for viewport size detection
 * Useful for responsive animations and layouts
 */
export const useViewportSize = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  });

  useEffect(() => {
    let timeoutId;

    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    const handleResize = () => {
      // Debounce resize events
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateViewport, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial call
    updateViewport();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return viewport;
};

/**
 * Hook for detecting reduced motion preference
 * Respects user accessibility preferences
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

export default useIntersectionObserver;
