import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useOptimizations } from '../../hooks/useOptimizations';
import { performance } from '../../utils/performance';
import LoadingSpinner from '../../components/LoadingSpinner';

// Lazy loaded components for performance
const TabuNavbar = lazy(() => import('../../components/tabu/TabuNavbar'));
const TabuHero = lazy(() => import('../../components/tabu/TabuHero'));
const TabuGallery = lazy(() => import('../../components/tabu/TabuGallery'));
const TabuAbout = lazy(() => import('../../components/tabu/TabuAbout'));
const ContactForm = lazy(() => import('../../components/tabu/ContactForm'));
const TabuFooter = lazy(() => import('../../components/tabu/TabuFooter'));
const BackToTopButton = lazy(() => import('../../components/tabu/BackToTopButton'));

/**
 * Tabú Mixología SPA - Single Page Application
 * A sophisticated mixology app with cocktail gallery, recipe modals, and contact form
 * 
 * Features:
 * - Lazy loading for performance
 * - Intersection Observer for animations
 * - LocalStorage for favorites
 * - Keyboard navigation
 * - WCAG AA accessibility
 * - Error boundaries
 * - Performance monitoring
 */
const TabuMixologia = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPerformanceReady, setIsPerformanceReady] = useState(false);
  
  // Initialize performance optimizations
  useOptimizations();

  // Page loading management
  useEffect(() => {
    const initializePage = async () => {
      try {
        // Start performance monitoring
        const startTime = performance.now();
        
        // Take initial memory snapshot
        performance.memoryTracker.takeSnapshot('initial');
        
        // Simulate minimum loading time for UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mark performance ready
        setIsPerformanceReady(true);
        
        // End loading state
        setIsLoading(false);
        
        // Log performance metrics
        const loadTime = performance.now() - startTime;
        console.log(`Tabú Mixología loaded in ${loadTime.toFixed(2)}ms`);
        
        // Take loaded memory snapshot
        performance.memoryTracker.takeSnapshot('loaded');
        
      } catch (error) {
        console.error('Error initializing Tabú Mixología:', error);
        setIsLoading(false);
      }
    };

    initializePage();

    // Cleanup on unmount
    return () => {
      // Take cleanup memory snapshot and check for memory leaks
      performance.memoryTracker.takeSnapshot('cleanup');
      const memoryLeaks = performance.memoryTracker.detectMemoryLeaks();
      if (memoryLeaks?.isGrowing) {
        console.warn('Memory leak detected:', memoryLeaks.recommendation);
      }
    };
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  // Section animation variants
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 60
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Loading component for lazy loaded sections
  const SectionLoader = ({ className = "" }) => (
    <div
      className={`section-loader ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        opacity: 0.6
      }}
    >
      <LoadingSpinner />
    </div>
  );

  // Error boundary component
  const SectionErrorBoundary = ({ children, fallback }) => {
    try {
      return children;
    } catch (error) {
      console.error('Section error:', error);
      return (
        <div className="error-fallback">
          {fallback || <div>Error loading section</div>}
        </div>
      );
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <Helmet>
        <title>Tabú Mixología - Arte del Cóctel</title>
        <meta name="description" content="Descubre el arte de la mixología con Tabú. Recetas exclusivas de cócteles, técnicas profesionales y una experiencia gastronómica única." />
        <meta name="keywords" content="mixología, cócteles, bebidas, bar, recetas, gin, whisky, rum" />
        <meta name="author" content="Tabú Mixología" />
        <meta property="og:title" content="Tabú Mixología - Arte del Cóctel" />
        <meta property="og:description" content="Descubre el arte de la mixología con recetas exclusivas y técnicas profesionales." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://yourdomain.com/tabu" />
      </Helmet>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#0a0a0a',
              zIndex: 9999
            }}
          >
            <div style={{ textAlign: 'center', color: '#d4af37' }}>
              <LoadingSpinner />
              <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                Preparando la experiencia Tabú...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Navigation */}
          <ErrorBoundary fallback={<div>Error loading navigation</div>}>
            <motion.header variants={sectionVariants}>
              <Suspense fallback={<SectionLoader className="navbar-loader" />}>
                <TabuNavbar />
              </Suspense>
            </motion.header>
          </ErrorBoundary>

          {/* Hero Section */}
          <ErrorBoundary fallback={<div>Error loading hero section</div>}>
            <motion.section variants={sectionVariants}>
              <Suspense fallback={<SectionLoader className="hero-loader" />}>
                <TabuHero />
              </Suspense>
            </motion.section>
          </ErrorBoundary>

          {/* Gallery Section */}
          <ErrorBoundary fallback={<div>Error loading gallery</div>}>
            <motion.section id="gallery" variants={sectionVariants}>
              <Suspense fallback={<SectionLoader className="gallery-loader" />}>
                <TabuGallery />
              </Suspense>
            </motion.section>
          </ErrorBoundary>

          {/* About Section */}
          <ErrorBoundary fallback={<div>Error loading about section</div>}>
            <motion.section variants={sectionVariants}>
              <Suspense fallback={<SectionLoader className="about-loader" />}>
                <TabuAbout />
              </Suspense>
            </motion.section>
          </ErrorBoundary>

          {/* Contact Section */}
          <ErrorBoundary fallback={<div>Error loading contact form</div>}>
            <motion.section variants={sectionVariants}>
              <Suspense fallback={<SectionLoader className="contact-loader" />}>
                <ContactForm />
              </Suspense>
            </motion.section>
          </ErrorBoundary>

          {/* Footer */}
          <ErrorBoundary fallback={<div>Error loading footer</div>}>
            <motion.footer variants={sectionVariants}>
              <Suspense fallback={<SectionLoader className="footer-loader" />}>
                <TabuFooter />
              </Suspense>
            </motion.footer>
          </ErrorBoundary>

          {/* Back to Top Button */}
          <ErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <BackToTopButton />
            </Suspense>
          </ErrorBoundary>
        </>
      )}
    </motion.div>
  );
};

export default TabuMixologia;
