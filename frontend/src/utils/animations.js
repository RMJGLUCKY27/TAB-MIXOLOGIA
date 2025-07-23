/**
 * Smooth scroll utilities and animation helpers for Tabú Mixología
 * Provides enhanced user experience with fluid navigation and interactions
 */

/**
 * Smooth scroll to element with offset for fixed navbar
 * @param {string} elementId - ID of the target element
 * @param {number} offset - Offset in pixels (default: 80 for navbar)
 * @param {number} duration - Animation duration in milliseconds
 */
export const smoothScrollTo = (elementId, offset = 80, duration = 1000) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`);
    return;
  }

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function (ease-in-out-cubic)
    const ease = progress < 0.5 
      ? 4 * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  // Check for user's reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.scrollIntoView({ behavior: 'auto', block: 'start' });
    return;
  }

  requestAnimationFrame(animateScroll);
};

/**
 * Scroll to top of page smoothly
 * @param {number} duration - Animation duration in milliseconds
 */
export const scrollToTop = (duration = 800) => {
  const startPosition = window.pageYOffset;
  let startTime = null;

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Easing function (ease-out)
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, startPosition * (1 - ease));

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  // Check for user's reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  requestAnimationFrame(animateScroll);
};

/**
 * Debounce function for scroll event optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute on leading edge
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

/**
 * Throttle function for scroll event optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
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

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} threshold - Percentage of element that must be visible (0-1)
 * @returns {boolean} True if element is in viewport
 */
export const isInViewport = (element, threshold = 0.1) => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const verticalThreshold = rect.height * threshold;
  const horizontalThreshold = rect.width * threshold;

  return (
    rect.top + verticalThreshold < windowHeight &&
    rect.left + horizontalThreshold < windowWidth &&
    rect.bottom - verticalThreshold > 0 &&
    rect.right - horizontalThreshold > 0
  );
};

/**
 * Intersection Observer utility for lazy loading and animations
 * @param {Function} callback - Callback function when element intersects
 * @param {Object} options - Intersection Observer options
 * @returns {IntersectionObserver} Observer instance
 */
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  if (!window.IntersectionObserver) {
    // Fallback for browsers without IntersectionObserver support
    console.warn('IntersectionObserver not supported');
    return null;
  }

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Lazy load images with fade-in effect
 * @param {HTMLImageElement} img - Image element to lazy load
 * @param {string} src - Source URL
 * @param {Function} onLoad - Callback when image loads
 * @param {Function} onError - Callback when image fails to load
 */
export const lazyLoadImage = (img, src, onLoad = null, onError = null) => {
  if (!img || !src) return;

  // Create a new image to preload
  const imageLoader = new Image();
  
  imageLoader.onload = () => {
    // Add fade-in class for smooth transition
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in-out';
    
    img.src = src;
    
    // Trigger fade-in
    requestAnimationFrame(() => {
      img.style.opacity = '1';
    });

    if (onLoad) onLoad(img);
  };

  imageLoader.onerror = () => {
    console.error(`Failed to load image: ${src}`);
    if (onError) onError(img);
  };

  imageLoader.src = src;
};

/**
 * Copy text to clipboard with fallback
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
    return false;
  }
};

/**
 * Generate random ID for components
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Random ID
 */
export const generateId = (prefix = 'tabu') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format time duration for display
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
export const formatDuration = (minutes) => {
  if (minutes < 1) return 'Menos de 1 minuto';
  if (minutes === 1) return '1 minuto';
  if (minutes < 60) return `${minutes} minutos`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return hours === 1 ? '1 hora' : `${hours} horas`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize HTML string to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeHTML = (str) => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

/**
 * Get scroll position information
 * @returns {Object} Scroll position data
 */
export const getScrollInfo = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

  return {
    scrollTop,
    scrollHeight,
    clientHeight,
    scrollPercent: Math.min(Math.max(scrollPercent, 0), 100)
  };
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Add event listener with cleanup
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {HTMLElement} element - Target element (default: window)
 * @returns {Function} Cleanup function
 */
export const addEventListenerWithCleanup = (event, handler, element = window) => {
  element.addEventListener(event, handler);
  return () => element.removeEventListener(event, handler);
};
