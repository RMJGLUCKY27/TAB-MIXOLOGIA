/**
 * Performance optimization utilities for Tabú Mixología
 */

// Debounce function optimizada
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
};

// Throttle function optimizada
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading observer optimizado
export const createLazyObserver = (callback, options = {}) => {
  const defaultOptions = {
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options
  };

  if (!window.IntersectionObserver) {
    // Fallback for older browsers
    callback();
    return null;
  }

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, defaultOptions);
};

// Optimización de imágenes
export const optimizeImage = (src, options = {}) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      // Crear canvas para optimización
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Configurar dimensiones
      const maxWidth = options.maxWidth || 800;
      const maxHeight = options.maxHeight || 600;
      const quality = options.quality || 0.8;
      
      let { width, height } = img;
      
      // Redimensionar si es necesario
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Dibujar imagen optimizada
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convertir a blob
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.onerror = reject;
    img.src = src;
  });
};

// Performance monitoring
export const performanceMonitor = {
  marks: new Map(),
  measures: new Map(),

  mark(name) {
    if (performance?.mark) {
      performance.mark(name);
      this.marks.set(name, performance.now());
    }
  },

  measure(name, startMark, endMark = null) {
    if (performance?.measure) {
      try {
        if (endMark) {
          performance.measure(name, startMark, endMark);
        } else {
          performance.measure(name, startMark);
        }
        
        const measure = performance.getEntriesByName(name, 'measure')[0];
        this.measures.set(name, measure.duration);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`⏱️ ${name}: ${measure.duration.toFixed(2)}ms`);
        }
        
        return measure.duration;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
      }
    }
    return 0;
  },

  clear() {
    if (performance?.clearMarks) {
      performance.clearMarks();
      performance.clearMeasures();
    }
    this.marks.clear();
    this.measures.clear();
  },

  getReport() {
    const report = {
      marks: Object.fromEntries(this.marks),
      measures: Object.fromEntries(this.measures),
      memory: performance?.memory ? {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
      } : null
    };
    
    return report;
  }
};

// Memory usage tracking
export const memoryTracker = {
  baseline: null,
  snapshots: [],

  takeSnapshot(label = 'snapshot') {
    if (performance?.memory) {
      const snapshot = {
        label,
        timestamp: Date.now(),
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      };
      
      this.snapshots.push(snapshot);
      
      if (!this.baseline) {
        this.baseline = snapshot;
      }
      
      return snapshot;
    }
    return null;
  },

  getMemoryDiff(fromSnapshot = null) {
    const current = this.takeSnapshot('current');
    const baseline = fromSnapshot || this.baseline;
    
    if (!current || !baseline) return null;
    
    return {
      used: current.used - baseline.used,
      total: current.total - baseline.total,
      percentage: ((current.used - baseline.used) / baseline.used) * 100
    };
  },

  detectMemoryLeaks() {
    if (this.snapshots.length < 2) return null;
    
    const recent = this.snapshots.slice(-5);
    const growing = recent.every((snapshot, index) => {
      if (index === 0) return true;
      return snapshot.used > recent[index - 1].used;
    });
    
    return {
      isGrowing: growing,
      snapshots: recent,
      recommendation: growing ? 
        'Posible memory leak detectado. Revisa los event listeners y observadores.' : 
        'Uso de memoria estable.'
    };
  }
};

// FPS monitoring
export const fpsMonitor = {
  fps: 0,
  lastTime: 0,
  frames: 0,
  running: false,

  start() {
    if (this.running) return;
    
    this.running = true;
    this.lastTime = performance.now();
    this.frames = 0;
    
    const loop = (currentTime) => {
      this.frames++;
      
      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
        this.frames = 0;
        this.lastTime = currentTime;
        
        if (process.env.NODE_ENV === 'development' && this.fps < 30) {
          console.warn(`⚠️ Low FPS detected: ${this.fps}fps`);
        }
      }
      
      if (this.running) {
        requestAnimationFrame(loop);
      }
    };
    
    requestAnimationFrame(loop);
  },

  stop() {
    this.running = false;
  },

  getFPS() {
    return this.fps;
  }
};

// Bundle analyzer helper
export const bundleAnalyzer = {
  analyzeChunks() {
    if (process.env.NODE_ENV === 'development') {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
      
      console.log('📦 Bundle Analysis:');
      console.log('Scripts:', scripts.map(s => s.src));
      console.log('Styles:', styles.map(s => s.href));
      
      // Estimate bundle sizes (approximate)
      return {
        scripts: scripts.length,
        styles: styles.length,
        total: scripts.length + styles.length
      };
    }
    return null;
  }
};

// Export all utilities
const performance = {
  debounce,
  throttle,
  createLazyObserver,
  optimizeImage,
  performanceMonitor,
  memoryTracker,
  fpsMonitor,
  bundleAnalyzer
};

export { performance };
export default performance;
