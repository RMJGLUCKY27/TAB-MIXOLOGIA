import React, { Suspense, lazy, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { initDiagnostics } from '../../utils/diagnostics';

// Core components - load immediately
import TabuNavbar from '../../components/tabu/TabuNavbar';
import TabuHero from '../../components/tabu/TabuHero';
import LoadingSpinner from '../../components/tabu/LoadingSpinner';
import BackToTopButton from '../../components/tabu/BackToTopButton';

// Lazy load secondary components for performance
const TabuGallery = lazy(() => import('../../components/tabu/TabuGallery'));
const ContactForm = lazy(() => import('../../components/tabu/ContactForm'));
const TabuFooter = lazy(() => import('../../components/tabu/TabuFooter'));

/**
 * Main Tabú Mixología SPA page
 * Features sophisticated animations, lazy loading, and accessibility
 */
const TabuMixologia = () => {
  // Initialize diagnostics in development
  useEffect(() => {
    initDiagnostics();
  }, []);
  // Section refs for intersection observer
  const [heroRef, heroInView] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  const [galleryRef, galleryInView] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-100px'
  });

  const [contactRef, contactInView] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '-50px'
  });

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
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
        backgroundColor: 'var(--color-gray-50)'
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
      console.error('Section rendering error:', error);
      return (
        <div
          style={{
            padding: 'var(--space-16)',
            textAlign: 'center',
            color: 'var(--color-gray-600)'
          }}
        >
          {fallback || (
            <>
              <h3>Algo salió mal</h3>
              <p>Por favor, recarga la página.</p>
            </>
          )}
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
        backgroundColor: 'var(--color-white)'
      }}
    >
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only-focusable"
        style={{
          position: 'absolute',
          top: '-40px',
          left: '6px',
          zIndex: 1000,
          padding: '8px 16px',
          backgroundColor: 'var(--color-black)',
          color: 'var(--color-white)',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '600'
        }}
        onFocus={(e) => {
          e.target.style.top = '6px';
        }}
        onBlur={(e) => {
          e.target.style.top = '-40px';
        }}
      >
        Saltar al contenido principal
      </a>

      {/* Navigation */}
      <TabuNavbar />

      {/* Main Content */}
      <main
        id="main-content"
        role="main"
        style={{
          paddingTop: '80px' // Account for fixed navbar
        }}
      >
        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          aria-label="Sección principal"
          style={{
            position: 'relative',
            zIndex: 1
          }}
        >
          <AnimatePresence>
            {heroInView && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <SectionErrorBoundary>
                  <TabuHero />
                </SectionErrorBoundary>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Gallery Section */}
        <section
          id="gallery"
          ref={galleryRef}
          aria-label="Galería de cócteles"
          style={{
            backgroundColor: 'var(--color-gray-50)',
            position: 'relative'
          }}
        >
          <AnimatePresence>
            {galleryInView && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <SectionErrorBoundary>
                  <Suspense fallback={<SectionLoader />}>
                    <TabuGallery />
                  </Suspense>
                </SectionErrorBoundary>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* About Section */}
        <section
          id="about"
          aria-label="Acerca de nosotros"
          style={{
            padding: 'var(--space-20) 0',
            backgroundColor: 'var(--color-white)'
          }}
        >
          <div className="tabu-container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              <h2
                style={{
                  fontSize: 'var(--text-5xl)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700',
                  fontStyle: 'italic',
                  color: 'var(--color-black)',
                  marginBottom: 'var(--space-8)',
                  lineHeight: '1.2'
                }}
              >
                Nuestra Filosofía
              </h2>

              <div
                style={{
                  fontSize: 'var(--text-xl)',
                  lineHeight: '1.8',
                  color: 'var(--color-gray-700)',
                  marginBottom: 'var(--space-12)',
                  fontStyle: 'italic'
                }}
              >
                <p style={{ marginBottom: 'var(--space-6)' }}>
                  En Tabú Mixología, cada cóctel es una obra de arte líquida, 
                  una sinfonía de sabores que desafía los límites de lo convencional.
                </p>
                
                <p style={{ marginBottom: 'var(--space-6)' }}>
                  Fusionamos técnicas ancestrales con innovación vanguardista, 
                  creando experiencias sensoriales que trascienden el simple acto de beber.
                </p>

                <p>
                  Porque lo prohibido siempre ha tenido el sabor más exquisito.
                </p>
              </div>

              {/* Statistics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--space-8)',
                  marginTop: 'var(--space-16)'
                }}
              >
                {[
                  { number: '150+', label: 'Cócteles Únicos' },
                  { number: '8', label: 'Años de Experiencia' },
                  { number: '50+', label: 'Ingredientes Premium' },
                  { number: '1000+', label: 'Clientes Satisfechos' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut" 
                    }}
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{
                        fontSize: 'var(--text-4xl)',
                        fontWeight: '700',
                        color: 'var(--color-black)',
                        marginBottom: 'var(--space-2)'
                      }}
                    >
                      {stat.number}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-gray-600)',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactRef}
          aria-label="Formulario de contacto"
          style={{
            backgroundColor: 'var(--color-gray-50)',
            position: 'relative'
          }}
        >
          <AnimatePresence>
            {contactInView && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <SectionErrorBoundary>
                  <Suspense fallback={<SectionLoader />}>
                    <ContactForm />
                  </Suspense>
                </SectionErrorBoundary>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <SectionErrorBoundary>
        <Suspense fallback={<SectionLoader className="footer-loader" />}>
          <TabuFooter />
        </Suspense>
      </SectionErrorBoundary>

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Performance monitoring */}
      <div style={{ display: 'none' }}>
        Performance: Hero={heroInView ? '✓' : '✗'} 
        Gallery={galleryInView ? '✓' : '✗'} 
        Contact={contactInView ? '✓' : '✗'}
      </div>
    </motion.div>
  );
};

export default TabuMixologia;
