import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { cocktailsData } from '../../utils/cocktailsData';
import CocktailCard from './CocktailCard';
import ModalRecipe from './ModalRecipe';

/**
 * Optimized Gallery Component for Tabú Mixología
 * Features performance optimizations and memory leak prevention
 */
const TabuGallery = memo(() => {
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('todos');

  // Memoized filtered cocktails to prevent unnecessary re-renders
  const filteredCocktails = useMemo(() => {
    if (activeFilter === 'todos') {
      return cocktailsData;
    }
    return cocktailsData.filter(cocktail => 
      cocktail.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter]);

  // Memoized filter options
  const filterOptions = useMemo(() => {
    const categories = ['todos', ...new Set(cocktailsData.map(c => c.category))];
    return categories;
  }, []);

  // Optimized handlers with useCallback to prevent unnecessary re-renders
  const handleCocktailClick = useCallback((cocktail) => {
    setSelectedCocktail(cocktail);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay clearing selected cocktail to allow exit animation
    setTimeout(() => setSelectedCocktail(null), 300);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section 
      className="gallery-section"
      style={{
        padding: 'var(--space-20) var(--space-8)',
        backgroundColor: 'var(--color-gray-50)',
        minHeight: '100vh'
      }}
      aria-label="Galería de cócteles"
    >
      {/* Section Header */}
      <motion.div
        variants={filterVariants}
        initial="hidden"
        animate="visible"
        style={{
          textAlign: 'center',
          marginBottom: 'var(--space-16)'
        }}
      >
        <h2
          style={{
            fontSize: 'var(--font-size-3xl)',
            fontFamily: 'var(--font-playfair)',
            fontWeight: '700',
            color: 'var(--color-black)',
            marginBottom: 'var(--space-4)'
          }}
        >
          Nuestra Colección
        </h2>
        <p
          style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-gray-600)',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          Descubre la elegancia en cada sorbo
        </p>
      </motion.div>

      {/* Filter Pills */}
      <motion.div
        variants={filterVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-12)'
        }}
        role="group"
        aria-label="Filtros de categoría"
      >
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            style={{
              padding: 'var(--space-2) var(--space-6)',
              border: `2px solid ${activeFilter === filter ? 'var(--color-black)' : 'var(--color-gray-300)'}`,
              backgroundColor: activeFilter === filter ? 'var(--color-black)' : 'transparent',
              color: activeFilter === filter ? 'var(--color-white)' : 'var(--color-gray-700)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'capitalize'
            }}
            onMouseEnter={(e) => {
              if (activeFilter !== filter) {
                e.target.style.borderColor = 'var(--color-gray-500)';
                e.target.style.backgroundColor = 'var(--color-gray-100)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeFilter !== filter) {
                e.target.style.borderColor = 'var(--color-gray-300)';
                e.target.style.backgroundColor = 'transparent';
              }
            }}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-8)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
        role="grid"
        aria-label="Cuadrícula de cócteles"
      >
        {filteredCocktails.map((cocktail) => (
          <CocktailCard
            key={cocktail.id}
            cocktail={cocktail}
            onClick={handleCocktailClick}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredCocktails.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            padding: 'var(--space-16)',
            color: 'var(--color-gray-500)'
          }}
        >
          <h3 style={{ marginBottom: 'var(--space-2)' }}>
            No hay cócteles en esta categoría
          </h3>
          <p>Prueba con otro filtro</p>
        </motion.div>
      )}

      {/* Recipe Modal */}
      {selectedCocktail && (
        <ModalRecipe
          cocktail={selectedCocktail}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
});

TabuGallery.displayName = 'TabuGallery';

export default TabuGallery;
