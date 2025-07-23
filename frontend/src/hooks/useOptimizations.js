import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook optimizado para limpiar recursos y evitar memory leaks
 */
export const useCleanup = () => {
  const timeoutsRef = useRef(new Set());
  const intervalsRef = useRef(new Set());
  const animationFramesRef = useRef(new Set());
  const observersRef = useRef(new Set());

  // Cleanup function
  const cleanup = useCallback(() => {
    // Clear all timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current.clear();

    // Clear all intervals
    intervalsRef.current.forEach(interval => clearInterval(interval));
    intervalsRef.current.clear();

    // Cancel all animation frames
    animationFramesRef.current.forEach(frame => cancelAnimationFrame(frame));
    animationFramesRef.current.clear();

    // Disconnect all observers
    observersRef.current.forEach(observer => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect();
      }
    });
    observersRef.current.clear();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Helper functions to track resources
  const addTimeout = useCallback((callback, delay) => {
    const timeoutId = setTimeout(() => {
      timeoutsRef.current.delete(timeoutId);
      callback();
    }, delay);
    timeoutsRef.current.add(timeoutId);
    return timeoutId;
  }, []);

  const addInterval = useCallback((callback, delay) => {
    const intervalId = setInterval(callback, delay);
    intervalsRef.current.add(intervalId);
    return intervalId;
  }, []);

  const addAnimationFrame = useCallback((callback) => {
    const frameId = requestAnimationFrame((...args) => {
      animationFramesRef.current.delete(frameId);
      callback(...args);
    });
    animationFramesRef.current.add(frameId);
    return frameId;
  }, []);

  const addObserver = useCallback((observer) => {
    observersRef.current.add(observer);
    return observer;
  }, []);

  const removeTimeout = useCallback((timeoutId) => {
    clearTimeout(timeoutId);
    timeoutsRef.current.delete(timeoutId);
  }, []);

  const removeInterval = useCallback((intervalId) => {
    clearInterval(intervalId);
    intervalsRef.current.delete(intervalId);
  }, []);

  const removeAnimationFrame = useCallback((frameId) => {
    cancelAnimationFrame(frameId);
    animationFramesRef.current.delete(frameId);
  }, []);

  const removeObserver = useCallback((observer) => {
    if (observer && typeof observer.disconnect === 'function') {
      observer.disconnect();
    }
    observersRef.current.delete(observer);
  }, []);

  return {
    cleanup,
    addTimeout,
    addInterval,
    addAnimationFrame,
    addObserver,
    removeTimeout,
    removeInterval,
    removeAnimationFrame,
    removeObserver
  };
};

/**
 * Hook para throttle optimizado
 */
export const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    } else {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
        lastRun.current = Date.now();
      }, delay - (Date.now() - lastRun.current));
    }
  }, [callback, delay]);
};

/**
 * Hook para debounce optimizado
 */
export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
};

/**
 * Hook para memoización estable
 */
export const useStableMemo = (factory, deps) => {
  const ref = useRef();
  const depsRef = useRef();

  if (!depsRef.current || deps.some((dep, i) => dep !== depsRef.current[i])) {
    ref.current = factory();
    depsRef.current = deps;
  }

  return ref.current;
};
