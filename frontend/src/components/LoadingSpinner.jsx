import React from 'react';

/**
 * LoadingSpinner Component
 * A reusable loading spinner with smooth animations
 */
const LoadingSpinner = ({ 
  size = 40, 
  color = '#d4af37', 
  className = '',
  message = ''
}) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `3px solid rgba(212, 175, 55, 0.2)`,
    borderTop: `3px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  return (
    <div className={`loading-spinner-container ${className}`} style={{ textAlign: 'center' }}>
      <div 
        className="loading-spinner"
        style={spinnerStyle}
        role="status"
        aria-label="Loading..."
      />
      {message && (
        <p style={{ 
          marginTop: '0.5rem', 
          color: color,
          fontSize: '0.9rem',
          fontFamily: 'Inter, sans-serif'
        }}>
          {message}
        </p>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
