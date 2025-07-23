/**
 * Diagnostic utility for Tabú Mixología SPA
 * Helps identify performance and functionality issues
 */

// Performance monitoring
export const performanceMonitor = {
  // Track component render times
  componentRenderTimes: new Map(),
  
  // Track memory usage
  memoryUsage: {
    start: performance.memory ? performance.memory.usedJSHeapSize : 0,
    current: 0
  },

  // Log component render start
  startRender: (componentName) => {
    if (process.env.NODE_ENV === 'development') {
      performanceMonitor.componentRenderTimes.set(componentName, performance.now());
    }
  },

  // Log component render end
  endRender: (componentName) => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performanceMonitor.componentRenderTimes.get(componentName);
      if (startTime) {
        const renderTime = performance.now() - startTime;
        console.log(`🎯 ${componentName} rendered in ${renderTime.toFixed(2)}ms`);
        
        // Warn if render time is too long
        if (renderTime > 100) {
          console.warn(`⚠️ ${componentName} took ${renderTime.toFixed(2)}ms to render - consider optimization`);
        }
      }
    }
  },

  // Check memory usage
  checkMemory: () => {
    if (performance.memory && process.env.NODE_ENV === 'development') {
      const current = performance.memory.usedJSHeapSize;
      const diff = current - performanceMonitor.memoryUsage.start;
      performanceMonitor.memoryUsage.current = current;
      
      console.log(`💾 Memory usage: ${(current / 1024 / 1024).toFixed(2)}MB (${diff > 0 ? '+' : ''}${(diff / 1024 / 1024).toFixed(2)}MB)`);
      
      // Warn if memory usage is high
      if (current > 50 * 1024 * 1024) { // 50MB
        console.warn(`⚠️ High memory usage detected: ${(current / 1024 / 1024).toFixed(2)}MB`);
      }
    }
  }
};

// Error boundary for catching React errors
export const errorLogger = {
  logError: (error, errorInfo) => {
    console.error('🚨 React Error Caught:', error);
    console.error('📍 Error Info:', errorInfo);
    
    // Send to analytics service in production
    if (process.env.NODE_ENV === 'production') {
      // Analytics service call would go here
      console.log('Error would be sent to analytics service');
    }
  },

  logWarning: (message, context = {}) => {
    console.warn('⚠️ Warning:', message, context);
  },

  logInfo: (message, context = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('ℹ️ Info:', message, context);
    }
  }
};

// Intersection Observer diagnostics
export const intersectionDiagnostics = {
  activeObservers: new Set(),
  
  registerObserver: (name) => {
    intersectionDiagnostics.activeObservers.add(name);
    console.log(`👀 Registered observer: ${name}`);
  },

  unregisterObserver: (name) => {
    intersectionDiagnostics.activeObservers.delete(name);
    console.log(`👀 Unregistered observer: ${name}`);
  },

  getActiveObservers: () => {
    return Array.from(intersectionDiagnostics.activeObservers);
  },

  logStatus: () => {
    console.log(`👀 Active observers: ${intersectionDiagnostics.getActiveObservers().join(', ')}`);
  }
};

// Animation diagnostics
export const animationDiagnostics = {
  activeAnimations: new Map(),
  
  startAnimation: (name, element) => {
    animationDiagnostics.activeAnimations.set(name, {
      element,
      startTime: performance.now()
    });
    console.log(`🎬 Animation started: ${name}`);
  },

  endAnimation: (name) => {
    const animation = animationDiagnostics.activeAnimations.get(name);
    if (animation) {
      const duration = performance.now() - animation.startTime;
      console.log(`🎬 Animation completed: ${name} (${duration.toFixed(2)}ms)`);
      animationDiagnostics.activeAnimations.delete(name);
    }
  },

  getActiveAnimations: () => {
    return Array.from(animationDiagnostics.activeAnimations.keys());
  }
};

// Scroll performance diagnostics
export const scrollDiagnostics = {
  lastScrollTime: 0,
  scrollEvents: 0,
  
  init: () => {
    if (process.env.NODE_ENV === 'development') {
      let scrollTimeout;
      
      window.addEventListener('scroll', () => {
        scrollDiagnostics.scrollEvents++;
        scrollDiagnostics.lastScrollTime = performance.now();
        
        // Debounced logging
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          console.log(`📜 Scroll events: ${scrollDiagnostics.scrollEvents}`);
        }, 1000);
      });
    }
  },

  checkScrollPerformance: () => {
    if (scrollDiagnostics.scrollEvents > 100) {
      console.warn(`⚠️ High scroll event count: ${scrollDiagnostics.scrollEvents}`);
    }
  }
};

// Form validation diagnostics
export const formDiagnostics = {
  validationCalls: new Map(),
  
  trackValidation: (formName, fieldName) => {
    const key = `${formName}.${fieldName}`;
    const count = formDiagnostics.validationCalls.get(key) || 0;
    formDiagnostics.validationCalls.set(key, count + 1);
    
    if (count > 10) {
      console.warn(`⚠️ High validation call count for ${key}: ${count + 1}`);
    }
  },

  getValidationStats: () => {
    return Object.fromEntries(formDiagnostics.validationCalls);
  }
};

// Network request diagnostics
export const networkDiagnostics = {
  requests: [],
  
  logRequest: (url, method, startTime) => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    networkDiagnostics.requests.push({
      url,
      method,
      duration,
      timestamp: new Date().toISOString()
    });
    
    console.log(`🌐 ${method} ${url} - ${duration.toFixed(2)}ms`);
    
    if (duration > 1000) {
      console.warn(`⚠️ Slow request: ${method} ${url} took ${duration.toFixed(2)}ms`);
    }
  },

  getSlowRequests: () => {
    return networkDiagnostics.requests.filter(req => req.duration > 1000);
  }
};

// Main diagnostic runner
export const runDiagnostics = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Running Tabú Mixología Diagnostics...');
    
    // Performance checks
    performanceMonitor.checkMemory();
    
    // Intersection observer status
    intersectionDiagnostics.logStatus();
    
    // Animation status
    console.log(`🎬 Active animations: ${animationDiagnostics.getActiveAnimations().join(', ')}`);
    
    // Scroll performance
    scrollDiagnostics.checkScrollPerformance();
    
    // Form validation stats
    console.log('📝 Form validation stats:', formDiagnostics.getValidationStats());
    
    // Network performance
    const slowRequests = networkDiagnostics.getSlowRequests();
    if (slowRequests.length > 0) {
      console.warn('🌐 Slow requests detected:', slowRequests);
    }
    
    console.log('✅ Diagnostics complete');
  }
};

// Initialize diagnostics
export const initDiagnostics = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Initializing Tabú Mixología Diagnostics...');
    
    // Initialize scroll diagnostics
    scrollDiagnostics.init();
    
    // Run diagnostics every 30 seconds
    setInterval(runDiagnostics, 30000);
    
    // Run initial diagnostics
    setTimeout(runDiagnostics, 2000);
    
    console.log('✅ Diagnostics initialized');
  }
};

export default {
  performanceMonitor,
  errorLogger,
  intersectionDiagnostics,
  animationDiagnostics,
  scrollDiagnostics,
  formDiagnostics,
  networkDiagnostics,
  runDiagnostics,
  initDiagnostics
};
