import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { smoothScrollTo, throttle } from '../../utils/animations';

/**
 * Sophisticated navigation component for Tabú Mixología
 * Features smooth scrolling, scroll-based styling, and responsive design
 */
const TabuNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items configuration
  const navItems = [
    { id: 'inicio', label: 'Inicio', href: '#hero' },
    { id: 'galeria', label: 'Galería', href: '#gallery' },
    { id: 'contacto', label: 'Contacto', href: '#contact' },
    { id: 'nosotros', label: 'Nosotros', href: '#about' }
  ];

  // Handle scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth navigation
  const handleNavigation = (href, event) => {
    event.preventDefault();
    const targetId = href.replace('#', '');
    smoothScrollTo(targetId);
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.tabu-navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      className={`tabu-navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="tabu-container">
        <div className="tabu-navbar-content">
          {/* Logo */}
          <motion.div
            className="tabu-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={(e) => handleNavigation('#hero', e)}
              aria-label="Ir al inicio"
              className="focus-ring"
            >
              Tabú Mixología
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="tabu-nav-links" role="menubar">
            {navItems.map((item, index) => (
              <motion.li
                key={item.id}
                role="none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavigation(item.href, e)}
                  className="tabu-nav-link focus-ring"
                  role="menuitem"
                  aria-label={`Navegar a ${item.label}`}
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="tabu-mobile-toggle focus-ring"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ 
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={{ 
                opacity: isMobileMenuOpen ? 0 : 1
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={{ 
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="tabu-mobile-menu-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 'var(--z-modal-backdrop)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.ul
          id="mobile-menu"
          className="tabu-mobile-menu"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isMobileMenuOpen ? 1 : 0.8, 
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            textAlign: 'center'
          }}
          role="menu"
        >
          {navItems.map((item, index) => (
            <motion.li
              key={item.id}
              role="none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0, 
                y: isMobileMenuOpen ? 0 : 30 
              }}
              transition={{ delay: 0.1 * (index + 2), duration: 0.4 }}
              style={{ marginBottom: 'var(--space-6)' }}
            >
              <a
                href={item.href}
                onClick={(e) => handleNavigation(item.href, e)}
                className="focus-ring"
                role="menuitem"
                aria-label={`Navegar a ${item.label}`}
                style={{
                  color: 'var(--color-white)',
                  fontSize: 'var(--text-2xl)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  padding: 'var(--space-4)',
                  display: 'block',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--color-gray-300)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--color-white)';
                }}
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.nav>
  );
};

export default TabuNavbar;
