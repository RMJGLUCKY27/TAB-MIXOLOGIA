const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validation');

// @desc    Registrar usuario
// @route   POST /api/auth/register
// @access  Public
router.post('/register', validateRegister, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe con este email' });
    }

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Iniciar sesión
// @route   POST /api/auth/login
// @access  Public
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe y obtener la contraseña
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        experience: user.experience
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Obtener usuario actual
// @route   GET /api/auth/me
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favoriteCocktails', 'name image averageRating')
      .populate('createdCocktails', 'name image averageRating views');

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Actualizar perfil
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, bio, experience, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, experience, avatar },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        experience: user.experience
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Cambiar contraseña
// @route   PUT /api/auth/password
// @access  Private
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Proporciona la contraseña actual y la nueva' });
    }

    // Obtener usuario con contraseña
    const user = await User.findById(req.user.id).select('+password');

    // Verificar contraseña actual
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }

    // Actualizar contraseña
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Contraseña actualizada exitosamente'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Agregar/quitar cóctel de favoritos
// @route   POST /api/auth/favorites/:cocktailId
// @access  Private
router.post('/favorites/:cocktailId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const cocktailId = req.params.cocktailId;

    const isFavorite = user.favoriteCocktails.includes(cocktailId);

    if (isFavorite) {
      // Quitar de favoritos
      user.favoriteCocktails = user.favoriteCocktails.filter(
        id => id.toString() !== cocktailId
      );
    } else {
      // Agregar a favoritos
      user.favoriteCocktails.push(cocktailId);
    }

    await user.save();

    res.json({
      success: true,
      message: isFavorite ? 'Removido de favoritos' : 'Agregado a favoritos',
      isFavorite: !isFavorite
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
