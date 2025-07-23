import React from 'react';
import { motion } from 'framer-motion';

/**
 * Hero section with animated SVG background and sophisticated typography
 * Creates an elegant entrance for the Tabú Mixología experience
 */
const TabuHero = () => {
  // Animation variants for staggered text appearance
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  // SVG animation for floating smoke effect
  const svgVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.1,
      scale: 1,
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.3,
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="tabu-hero"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-black)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Animated SVG Background */}
      <motion.div
        className="tabu-hero-background"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Floating smoke/mist patterns */}
          <motion.path
            d="M100,400 Q300,200 500,400 T900,400"
            stroke="white"
            strokeWidth="2"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M200,500 Q400,300 600,500 T1000,500"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1 }}
          />
          <motion.path
            d="M0,600 Q200,400 400,600 T800,600"
            stroke="white"
            strokeWidth="1"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2 }}
          />
          
          {/* Abstract geometric elements */}
          <motion.circle
            cx="150"
            cy="150"
            r="2"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          <motion.circle
            cx="1050"
            cy="200"
            r="1.5"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1
            }}
          />
          <motion.circle
            cx="950"
            cy="650"
            r="1"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              scale: [1, 1.8, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "loop",
              delay: 2
            }}
          />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="tabu-container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          className="tabu-hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            textAlign: 'center',
            color: 'var(--color-white)',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 var(--space-4)'
          }}
        >
          {/* Main Title */}
          <motion.h1
            variants={textVariants}
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '700',
              fontStyle: 'italic',
              marginBottom: 'var(--space-6)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            Tabú Mixología
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={textVariants}
            style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              fontFamily: 'var(--font-body)',
              fontWeight: '300',
              marginBottom: 'var(--space-8)',
              lineHeight: '1.6',
              color: 'var(--color-gray-200)',
              fontStyle: 'italic'
            }}
          >
            Donde cada cóctel cuenta una historia prohibida,<br />
            y cada sorbo revela secretos ancestrales
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            variants={textVariants}
            style={{
              width: '100px',
              height: '1px',
              backgroundColor: 'var(--color-white)',
              margin: '0 auto var(--space-8)',
              opacity: 0.6
            }}
          />

          {/* Description */}
          <motion.p
            variants={textVariants}
            style={{
              fontSize: 'var(--text-lg)',
              fontFamily: 'var(--font-body)',
              fontWeight: '400',
              lineHeight: '1.8',
              color: 'var(--color-gray-300)',
              marginBottom: 'var(--space-10)',
              maxWidth: '600px',
              margin: '0 auto var(--space-10)'
            }}
          >
            Descubre el arte de la mixología elevado a su máxima expresión. 
            Una experiencia sensorial única donde la elegancia se encuentra 
            con la innovación en cada creación.
          </motion.p>

          {/* Call to Action */}
          <motion.div
            variants={textVariants}
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              className="tabu-btn tabu-btn-primary"
              onClick={() => {
                document.getElementById('gallery')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontSize: 'var(--text-lg)',
                padding: 'var(--space-4) var(--space-8)',
                fontWeight: '500'
              }}
            >
              Explorar Cócteles
            </motion.button>

            <motion.button
              className="tabu-btn tabu-btn-secondary"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontSize: 'var(--text-lg)',
                padding: 'var(--space-4) var(--space-8)',
                fontWeight: '500'
              }}
            >
              Contactar
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="tabu-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 'var(--space-8)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '24px',
            height: '40px',
            border: '2px solid var(--color-white)',
            borderRadius: '12px',
            position: 'relative',
            opacity: 0.7
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: '4px',
              height: '8px',
              backgroundColor: 'var(--color-white)',
              borderRadius: '2px',
              position: 'absolute',
              top: '6px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
        </motion.div>
        
        <p
          style={{
            color: 'var(--color-white)',
            fontSize: 'var(--text-sm)',
            marginTop: 'var(--space-2)',
            opacity: 0.7,
            fontFamily: 'var(--font-body)'
          }}
        >
          Scroll
        </p>
      </motion.div>
    </section>
  );
};

export default TabuHero;
