import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Star, Eye } from 'lucide-react';

/**
 * CocktailCard Component
 * Displays cocktail information with interactive features
 */
const CocktailCard = memo(({ 
  cocktail, 
  onFavorite, 
  onView, 
  index = 0,
  className = '' 
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    () => JSON.parse(localStorage.getItem('tabu-favorites') || '[]').includes(cocktail.id)
  );

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = useCallback((e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('tabu-favorites') || '[]');
    const newFavorites = isFavorite 
      ? favorites.filter(id => id !== cocktail.id)
      : [...favorites, cocktail.id];
    
    localStorage.setItem('tabu-favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    
    if (onFavorite) {
      onFavorite(cocktail.id, !isFavorite);
    }
  }, [cocktail.id, isFavorite, onFavorite]);

  // Handle card click
  const handleCardClick = useCallback(() => {
    if (onView) {
      onView(cocktail);
    }
  }, [cocktail, onView]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  return (
    <motion.div
      className={`cocktail-card ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={handleCardClick}
      style={{
        cursor: 'pointer',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        position: 'relative',
        minHeight: '350px'
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles del cóctel ${cocktail.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Image Section */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        {!isImageLoaded && (
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, #333, #555, #333)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 2s infinite'
            }}
          />
        )}
        <img
          src={cocktail.image}
          alt={cocktail.name}
          onLoad={handleImageLoad}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isImageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
        
        {/* Favorite Button */}
        <motion.button
          className="favorite-btn"
          onClick={handleFavoriteToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorite ? '#d4af37' : '#fff',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart 
            size={20} 
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
          />
        </motion.button>

        {/* Category Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(212, 175, 55, 0.9)',
            color: '#000',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {cocktail.category}
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: '20px' }}>
        {/* Title */}
        <h3
          style={{
            color: '#d4af37',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '8px',
            fontFamily: 'Georgia, serif'
          }}
        >
          {cocktail.name}
        </h3>

        {/* Description */}
        <p
          style={{
            color: '#ccc',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {cocktail.description}
        </p>

        {/* Stats */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: '#999'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            <span>{cocktail.preparationTime || '5'} min</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={14} fill="#d4af37" stroke="#d4af37" />
            <span>{cocktail.averageRating || '4.8'}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Eye size={14} />
            <span>{cocktail.views || '0'}</span>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.2) 100%)',
          opacity: 0,
          pointerEvents: 'none'
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer Animation CSS */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 200%; }
          100% { background-position: -200% -200%; }
        }
      `}</style>
    </motion.div>
  );
});

CocktailCard.displayName = 'CocktailCard';

export default CocktailCard;
