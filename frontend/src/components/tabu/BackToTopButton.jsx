import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Back to top button component with scroll detection
 * Shows/hides based on scroll position
 */
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      className="back-to-top"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      style={{
        position: 'fixed',
        bottom: 'var(--space-6)',
        right: 'var(--space-6)',
        width: '50px',
        height: '50px',
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-white)',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'var(--text-lg)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        transition: 'all var(--transition-fast)'
      }}
      aria-label="Volver arriba"
    >
      ↑
    </motion.button>
  );
};

export default BackToTopButton;
