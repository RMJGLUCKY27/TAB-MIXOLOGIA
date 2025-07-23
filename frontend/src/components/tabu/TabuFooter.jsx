import React from 'react';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '../../utils/animations';

/**
 * Sophisticated footer component with brand manifesto and social links
 * Features elegant typography and smooth navigation
 */
const TabuFooter = () => {
  // Navigation items
  const footerNavigation = [
    { id: 'inicio', label: 'Inicio', href: '#hero' },
    { id: 'galeria', label: 'Galería', href: '#gallery' },
    { id: 'contacto', label: 'Contacto', href: '#contact' },
    { id: 'nosotros', label: 'Nosotros', href: '#about' }
  ];

  // Social media links
  const socialLinks = [
    { 
      id: 'instagram', 
      label: 'Instagram', 
      href: '#', 
      icon: '📷',
      handle: '@tabu.mixologia'
    },
    { 
      id: 'facebook', 
      label: 'Facebook', 
      href: '#', 
      icon: '👥',
      handle: '/TabuMixologia'
    },
    { 
      id: 'twitter', 
      label: 'Twitter', 
      href: '#', 
      icon: '🐦',
      handle: '@TabuMixologia'
    },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      href: '#', 
      icon: '💬',
      handle: '+1 (555) 123-4567'
    }
  ];

  // Contact information
  const contactInfo = [
    {
      id: 'address',
      icon: '📍',
      label: 'Dirección',
      value: 'Centro de la Ciudad, Distrito Premium'
    },
    {
      id: 'phone',
      icon: '📞',
      label: 'Teléfono',
      value: '+1 (555) 123-4567'
    },
    {
      id: 'email',
      icon: '✉️',
      label: 'Email',
      value: 'hola@tabu-mixologia.com'
    },
    {
      id: 'hours',
      icon: '🕰️',
      label: 'Horarios',
      value: 'Lun - Sáb: 6PM - 2AM'
    }
  ];

  // Handle navigation
  const handleNavigation = (href, event) => {
    event.preventDefault();
    const targetId = href.replace('#', '');
    smoothScrollTo(targetId);
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-white)',
        padding: 'var(--space-20) 0 var(--space-8)'
      }}
    >
      <div className="tabu-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Main Footer Content */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-12)',
              marginBottom: 'var(--space-16)'
            }}
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants}>
              <h3
                style={{
                  fontSize: 'var(--text-3xl)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700',
                  fontStyle: 'italic',
                  marginBottom: 'var(--space-6)',
                  color: 'var(--color-white)'
                }}
              >
                Tabú Mixología
              </h3>

              {/* Brand Manifesto */}
              <div
                style={{
                  marginBottom: 'var(--space-6)'
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    lineHeight: '1.7',
                    color: 'var(--color-gray-300)',
                    marginBottom: 'var(--space-4)',
                    fontStyle: 'italic'
                  }}
                >
                  "En cada cóctel reside una historia no contada, 
                  un secreto esperando ser revelado."
                </p>
                
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    lineHeight: '1.6',
                    color: 'var(--color-gray-400)'
                  }}
                >
                  Donde la tradición se encuentra con la innovación, 
                  creamos experiencias sensoriales únicas que trascienden 
                  el arte de la mixología. Cada gota es una promesa, 
                  cada sorbo es una revelación.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div
                style={{
                  marginBottom: 'var(--space-6)'
                }}
              >
                <h4
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: '600',
                    marginBottom: 'var(--space-3)',
                    color: 'var(--color-white)'
                  }}
                >
                  Secretos Exclusivos
                </h4>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-gray-400)',
                    marginBottom: 'var(--space-4)'
                  }}
                >
                  Recibe recetas exclusivas y eventos privados
                </p>
                
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-2)'
                  }}
                >
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    style={{
                      flex: 1,
                      padding: 'var(--space-3)',
                      border: '1px solid var(--color-gray-600)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-gray-800)',
                      color: 'var(--color-white)',
                      fontSize: 'var(--text-sm)'
                    }}
                  />
                  <motion.button
                    className="tabu-btn tabu-btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: 'var(--space-3) var(--space-4)',
                      fontSize: 'var(--text-sm)'
                    }}
                  >
                    Suscribir
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Navigation Section */}
            <motion.div variants={itemVariants}>
              <h4
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-6)',
                  color: 'var(--color-white)'
                }}
              >
                Navegación
              </h4>
              
              <nav>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}
                >
                  {footerNavigation.map((item) => (
                    <li
                      key={item.id}
                      style={{ marginBottom: 'var(--space-3)' }}
                    >
                      <motion.a
                        href={item.href}
                        onClick={(e) => handleNavigation(item.href, e)}
                        className="focus-ring"
                        whileHover={{ x: 5 }}
                        style={{
                          color: 'var(--color-gray-300)',
                          textDecoration: 'none',
                          fontSize: 'var(--text-base)',
                          transition: 'color var(--transition-fast)',
                          display: 'block',
                          padding: 'var(--space-1) 0'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = 'var(--color-white)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = 'var(--color-gray-300)';
                        }}
                      >
                        {item.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Quick Links */}
              <div style={{ marginTop: 'var(--space-8)' }}>
                <h5
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: '600',
                    marginBottom: 'var(--space-4)',
                    color: 'var(--color-white)'
                  }}
                >
                  Enlaces Rápidos
                </h5>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: 'var(--text-sm)'
                  }}
                >
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <a
                      href="#"
                      style={{
                        color: 'var(--color-gray-400)',
                        textDecoration: 'none'
                      }}
                    >
                      Política de Privacidad
                    </a>
                  </li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <a
                      href="#"
                      style={{
                        color: 'var(--color-gray-400)',
                        textDecoration: 'none'
                      }}
                    >
                      Términos de Servicio
                    </a>
                  </li>
                  <li style={{ marginBottom: 'var(--space-2)' }}>
                    <a
                      href="#"
                      style={{
                        color: 'var(--color-gray-400)',
                        textDecoration: 'none'
                      }}
                    >
                      Reservas Privadas
                    </a>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div variants={itemVariants}>
              <h4
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-6)',
                  color: 'var(--color-white)'
                }}
              >
                Contacto
              </h4>
              
              <div style={{ marginBottom: 'var(--space-8)' }}>
                {contactInfo.map((info) => (
                  <div
                    key={info.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-3)',
                      marginBottom: 'var(--space-4)'
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-lg)',
                        marginTop: '2px'
                      }}
                    >
                      {info.icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: '600',
                          color: 'var(--color-white)',
                          marginBottom: 'var(--space-1)'
                        }}
                      >
                        {info.label}
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-gray-300)',
                          lineHeight: '1.4'
                        }}
                      >
                        {info.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h5
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: '600',
                    marginBottom: 'var(--space-4)',
                    color: 'var(--color-white)'
                  }}
                >
                  Síguenos
                </h5>
                
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--space-3)'
                  }}
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.id}
                      href={social.href}
                      className="focus-ring"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        padding: 'var(--space-3)',
                        backgroundColor: 'var(--color-gray-800)',
                        borderRadius: 'var(--radius-md)',
                        textDecoration: 'none',
                        color: 'var(--color-gray-300)',
                        transition: 'all var(--transition-fast)',
                        fontSize: 'var(--text-sm)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-gray-700)';
                        e.currentTarget.style.color = 'var(--color-white)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-gray-800)';
                        e.currentTarget.style.color = 'var(--color-gray-300)';
                      }}
                    >
                      <span style={{ fontSize: 'var(--text-base)' }}>
                        {social.icon}
                      </span>
                      <div>
                        <div style={{ fontWeight: '600' }}>
                          {social.label}
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)' }}>
                          {social.handle}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            variants={itemVariants}
            style={{
              borderTop: '1px solid var(--color-gray-800)',
              paddingTop: 'var(--space-8)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-4)'
            }}
          >
            <div
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-400)'
              }}
            >
              © 2024 Tabú Mixología. Todos los derechos reservados.
            </div>

            <div
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-gray-400)',
                fontStyle: 'italic'
              }}
            >
              Crafted with passion & precision
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default TabuFooter;
