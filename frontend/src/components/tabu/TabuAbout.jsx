import React from 'react';
import { motion } from 'framer-motion';

/**
 * About Section for Tabú Mixología
 * Provides information about the mixology experience and philosophy
 */
const TabuAbout = () => {
  return (
    <section 
      id="about" 
      className="tabu-about-section"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 0 80px'
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #d4af37 0%, #f4e4bc 50%, #d4af37 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                marginBottom: '1.5rem',
                fontFamily: 'Georgia, serif'
              }}
            >
              Nosotros
            </h2>
            <div
              style={{
                width: '100px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                margin: '0 auto 2rem',
                borderRadius: '2px'
              }}
            />
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3
                style={{
                  fontSize: '2rem',
                  fontWeight: '600',
                  color: '#d4af37',
                  marginBottom: '1.5rem',
                  fontFamily: 'Georgia, serif'
                }}
              >
                El Arte de la Mixología
              </h3>
              <p
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: '#ccc',
                  marginBottom: '1.5rem'
                }}
              >
                En <strong style={{ color: '#d4af37' }}>Tabú Mixología</strong>, creemos que cada cóctel cuenta una historia. 
                Nuestro enfoque va más allá de simplemente mezclar ingredientes; se trata de crear experiencias 
                sensoriales únicas que despiertan emociones y memorias.
              </p>
              <p
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  color: '#ccc',
                  marginBottom: '2rem'
                }}
              >
                Con una pasión por la innovación y el respeto por las tradiciones clásicas, exploramos 
                sabores audaces y técnicas sofisticadas para ofrecer creaciones que rompen los límites 
                convencionales de la coctelería.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: '#d4af37',
                      fontFamily: 'Georgia, serif'
                    }}
                  >
                    50+
                  </div>
                  <div style={{ color: '#999', fontSize: '0.9rem' }}>
                    Recetas Únicas
                  </div>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: '#d4af37',
                      fontFamily: 'Georgia, serif'
                    }}
                  >
                    5
                  </div>
                  <div style={{ color: '#999', fontSize: '0.9rem' }}>
                    Años de Experiencia
                  </div>
                </motion.div>
                
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: '700',
                      color: '#d4af37',
                      fontFamily: 'Georgia, serif'
                    }}
                  >
                    100%
                  </div>
                  <div style={{ color: '#999', fontSize: '0.9rem' }}>
                    Ingredientes Premium
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(212, 175, 55, 0.3)'
                }}
              >
                {/* Placeholder for image or video */}
                <div
                  style={{
                    aspectRatio: '4/3',
                    background: 'linear-gradient(135deg, #1a1a1a, #333)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {/* Decorative Pattern */}
                  <div
                    style={{
                      fontSize: '4rem',
                      color: 'rgba(212, 175, 55, 0.3)',
                      fontFamily: 'Georgia, serif'
                    }}
                  >
                    🍸
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      right: '20px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      padding: '16px',
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <h4
                      style={{
                        color: '#d4af37',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}
                    >
                      Nuestra Filosofía
                    </h4>
                    <p
                      style={{
                        color: '#ccc',
                        fontSize: '0.9rem',
                        lineHeight: '1.5'
                      }}
                    >
                      "Cada cóctel es una obra de arte líquida que conecta personas, 
                      culturas y momentos especiales."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mission Statement */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '40px',
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#d4af37',
                  marginBottom: '1rem',
                  fontFamily: 'Georgia, serif'
                }}
              >
                Nuestra Misión
              </h3>
              <p
                style={{
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  color: '#fff',
                  fontStyle: 'italic'
                }}
              >
                Transformar la experiencia de beber en un viaje sensorial extraordinario, 
                donde cada sorbo revela la perfecta armonía entre tradición e innovación, 
                creando momentos memorables que trascienden lo ordinario.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TabuAbout;
