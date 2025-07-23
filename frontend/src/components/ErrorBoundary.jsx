import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Report error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // You can add error reporting service here
      // Example: Sentry.captureException(error);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: '#f9fafb',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
          }}
        >
          <div
            style={{
              textAlign: 'center',
              maxWidth: '500px',
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div
              style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}
            >
              😵
            </div>
            
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.5rem'
              }}
            >
              ¡Ups! Algo salió mal
            </h1>
            
            <p
              style={{
                color: '#6b7280',
                marginBottom: '1.5rem',
                lineHeight: '1.5'
              }}
            >
              La aplicación encontró un error inesperado. Por favor, intenta recargar la página.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#000';
                }}
              >
                Recargar página
              </button>
              
              <button
                onClick={this.handleGoHome}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.borderColor = '#9ca3af';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#d1d5db';
                }}
              >
                Ir al inicio
              </button>
            </div>

            {/* Development error details */}
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details
                style={{
                  marginTop: '1.5rem',
                  textAlign: 'left',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  padding: '1rem'
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    fontWeight: '500',
                    color: '#dc2626',
                    marginBottom: '0.5rem'
                  }}
                >
                  Detalles del error (desarrollo)
                </summary>
                
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                  <strong>Error:</strong>
                  <pre style={{ marginTop: '0.5rem', color: '#dc2626' }}>
                    {this.state.error && this.state.error.toString()}
                  </pre>
                  
                  <strong style={{ marginTop: '1rem', display: 'block' }}>
                    Stack trace:
                  </strong>
                  <pre style={{ marginTop: '0.5rem', color: '#dc2626' }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>

          {/* Footer */}
          <p
            style={{
              marginTop: '2rem',
              fontSize: '0.875rem',
              color: '#9ca3af',
              textAlign: 'center'
            }}
          >
            Si el problema persiste, contacta al soporte técnico.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
