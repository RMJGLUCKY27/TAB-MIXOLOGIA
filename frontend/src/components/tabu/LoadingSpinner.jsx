import React from 'react';
import { motion } from 'framer-motion';

/**
 * Elegant loading spinner component
 * Features smooth animations and accessibility
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'var(--color-black)', 
  className = '',
  text = 'Cargando...'
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      spinner: '24px',
      text: 'var(--text-sm)'
    },
    medium: {
      spinner: '40px',
      text: 'var(--text-base)'
    },
    large: {
      spinner: '60px',
      text: 'var(--text-lg)'
    }
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  // Animation variants
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  const dotsVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        staggerChildren: 0.2
      }
    }
  };

  const dotVariants = {
    animate: {
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <div
      className={`loading-spinner ${className}`}
      role="status"
      aria-live="polite"
      aria-label={text}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-8)'
      }}
    >
      {/* Main Spinner */}
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        style={{
          width: config.spinner,
          height: config.spinner,
          border: `3px solid transparent`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
          position: 'relative'
        }}
      >
        {/* Inner ring for extra elegance */}
        <motion.div
          variants={spinnerVariants}
          animate="animate"
          style={{
            position: 'absolute',
            top: '6px',
            left: '6px',
            right: '6px',
            bottom: '6px',
            border: `2px solid transparent`,
            borderBottom: `2px solid ${color}`,
            borderRadius: '50%',
            opacity: 0.6
          }}
        />
      </motion.div>

      {/* Loading Text */}
      {text && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: config.text,
            color: color,
            fontWeight: '500',
            textAlign: 'center'
          }}
        >
          {text}
        </motion.div>
      )}

      {/* Animated Dots */}
      <motion.div
        variants={dotsVariants}
        animate="animate"
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          marginTop: 'var(--space-2)'
        }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            variants={dotVariants}
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: color,
              borderRadius: '50%',
              opacity: 0.7
            }}
            transition={{
              delay: index * 0.2
            }}
          />
        ))}
      </motion.div>

      {/* Screen reader text */}
      <span className="sr-only">
        Contenido cargando, por favor espere...
      </span>
    </div>
  );
};

/**
 * Minimal loading dots component
 * For subtle loading states
 */
export const LoadingDots = ({ 
  color = 'var(--color-gray-600)',
  size = '4px'
}) => {
  return (
    <motion.div
      style={{
        display: 'flex',
        gap: 'var(--space-1)',
        alignItems: 'center'
      }}
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: '50%'
          }}
        />
      ))}
    </motion.div>
  );
};

/**
 * Skeleton loader component
 * For content placeholders
 */
export const SkeletonLoader = ({ 
  width = '100%',
  height = '20px',
  borderRadius = 'var(--radius-md)',
  className = ''
}) => {
  return (
    <motion.div
      className={`skeleton-loader ${className}`}
      animate={{
        opacity: [0.6, 1, 0.6]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        width,
        height,
        backgroundColor: 'var(--color-gray-200)',
        borderRadius,
        position: 'relative',
        overflow: 'hidden'
      }}
      role="presentation"
      aria-hidden="true"
    >
      {/* Shimmer effect */}
      <motion.div
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
          transform: 'translateX(-100%)'
        }}
      />
    </motion.div>
  );
};

export default LoadingSpinner;
