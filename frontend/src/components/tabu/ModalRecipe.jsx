import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { copyToClipboard } from '../../utils/animations';

/**
 * Sophisticated modal component for displaying cocktail recipes
 * Features smooth animations, accessibility support, and recipe copying
 */
const ModalRecipe = ({ 
  isOpen, 
  onClose, 
  cocktail,
  className = '',
  ...props 
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  // Handle escape key and focus management
  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement;
      
      // Focus modal
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Handle escape key
      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
        
        // Restore focus
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Copy recipe to clipboard
  const handleCopyRecipe = async () => {
    if (!cocktail) return;

    const recipeText = [
      `${cocktail.name}`,
      '',
      'Ingredientes:',
      ...cocktail.ingredients.map(ing => `• ${ing.quantity} ${ing.unit} ${ing.name}`),
      '',
      'Preparación:',
      ...cocktail.instructions.map((step, index) => `${index + 1}. ${step}`),
      '',
      `Vaso: ${cocktail.glass}`,
      `Decoración: ${cocktail.garnish}`,
      `Tiempo: ${cocktail.time}`,
      `Dificultad: ${cocktail.difficulty}`
    ].join('\n');

    try {
      const success = await copyToClipboard(recipeText);
      if (success) {
        // You could show a toast notification here
        console.log('Receta copiada al portapapeles');
      }
    } catch (error) {
      console.error('Error al copiar receta:', error);
    }
  };

  if (!cocktail) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`tabu-modal-overlay ${className}`}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          {...props}
        >
          <motion.div
            ref={modalRef}
            className="tabu-modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            tabIndex="-1"
            style={{ outline: 'none' }}
          >
            {/* Modal Header */}
            <div className="tabu-modal-header">
              <h2 
                id="modal-title"
                className="tabu-modal-title"
              >
                {cocktail.name}
              </h2>

              <button
                className="tabu-modal-close focus-ring"
                onClick={onClose}
                aria-label="Cerrar modal"
              >
                <span style={{ fontSize: '24px', lineHeight: 1 }}>×</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="tabu-modal-body" id="modal-description">
              {/* Cocktail Image */}
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  marginBottom: 'var(--space-6)'
                }}
              >
                <img
                  src={cocktail.image}
                  alt={`Cóctel ${cocktail.name}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  lineHeight: '1.6',
                  color: 'var(--color-gray-600)',
                  marginBottom: 'var(--space-6)',
                  fontStyle: 'italic'
                }}
              >
                {cocktail.description}
              </p>

              {/* Cocktail Details Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                  padding: 'var(--space-4)',
                  backgroundColor: 'var(--color-gray-50)',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <div>
                  <h4 style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: '600', 
                    marginBottom: 'var(--space-1)',
                    color: 'var(--color-gray-800)'
                  }}>
                    Tiempo
                  </h4>
                  <p style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--color-gray-600)' 
                  }}>
                    {cocktail.time}
                  </p>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: '600', 
                    marginBottom: 'var(--space-1)',
                    color: 'var(--color-gray-800)'
                  }}>
                    Dificultad
                  </h4>
                  <p style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--color-gray-600)' 
                  }}>
                    {cocktail.difficulty}
                  </p>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: '600', 
                    marginBottom: 'var(--space-1)',
                    color: 'var(--color-gray-800)'
                  }}>
                    Vaso
                  </h4>
                  <p style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--color-gray-600)' 
                  }}>
                    {cocktail.glass}
                  </p>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: 'var(--text-sm)', 
                    fontWeight: '600', 
                    marginBottom: 'var(--space-1)',
                    color: 'var(--color-gray-800)'
                  }}>
                    Decoración
                  </h4>
                  <p style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--color-gray-600)' 
                  }}>
                    {cocktail.garnish}
                  </p>
                </div>
              </div>

              {/* Ingredients */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{
                  fontSize: 'var(--text-xl)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-4)',
                  color: 'var(--color-gray-900)'
                }}>
                  Ingredientes
                </h3>
                
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {cocktail.ingredients.map((ingredient, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 'var(--space-3)',
                        marginBottom: 'var(--space-2)',
                        backgroundColor: 'var(--color-white)',
                        border: '1px solid var(--color-gray-200)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-base)'
                      }}
                    >
                      <span style={{
                        fontWeight: '600',
                        color: 'var(--color-gray-900)',
                        minWidth: '80px',
                        marginRight: 'var(--space-3)'
                      }}>
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                      <span style={{ color: 'var(--color-gray-700)' }}>
                        {ingredient.name}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{
                  fontSize: 'var(--text-xl)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-4)',
                  color: 'var(--color-gray-900)'
                }}>
                  Preparación
                </h3>
                
                <ol style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  counterReset: 'step-counter'
                }}>
                  {cocktail.instructions.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      style={{
                        counterIncrement: 'step-counter',
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: 'var(--space-4)',
                        marginBottom: 'var(--space-3)',
                        backgroundColor: 'var(--color-gray-50)',
                        borderRadius: 'var(--radius-md)',
                        position: 'relative'
                      }}
                    >
                      <span style={{
                        content: 'counter(step-counter)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        backgroundColor: 'var(--color-gray-800)',
                        color: 'var(--color-white)',
                        borderRadius: '50%',
                        fontSize: 'var(--text-sm)',
                        fontWeight: '600',
                        marginRight: 'var(--space-3)',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {index + 1}
                      </span>
                      <span style={{
                        fontSize: 'var(--text-base)',
                        lineHeight: '1.6',
                        color: 'var(--color-gray-700)'
                      }}>
                        {step}
                      </span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: 'var(--space-3)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <motion.button
                  className="tabu-btn tabu-btn-primary"
                  onClick={handleCopyRecipe}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)'
                  }}
                >
                  <span>📋</span>
                  Copiar Receta
                </motion.button>

                <motion.button
                  className="tabu-btn tabu-btn-secondary"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cerrar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalRecipe;
