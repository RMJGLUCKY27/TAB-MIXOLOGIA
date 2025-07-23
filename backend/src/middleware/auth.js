const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de autenticación
const auth = async (req, res, next) => {
  try {
    let token;

    // Extraer token del header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'No autorizado, token no proporcionado' });
    }

    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Obtener usuario del token
      req.user = await User.findById(decoded.id);
      
      if (!req.user) {
        return res.status(401).json({ error: 'No autorizado, usuario no encontrado' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: 'No autorizado, token inválido' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Middleware de autorización por rol
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Rol ${req.user.role} no autorizado para acceder a esta ruta` 
      });
    }

    next();
  };
};

module.exports = { auth, authorize };
