const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

// @desc    Obtener todos los usuarios (admin)
// @route   GET /api/users
// @access  Private (admin)
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      role,
      search,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const query = {};

    // Filtros
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Configurar ordenamiento
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const users = await User.find(query)
      .select('-password')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Obtener perfil público de usuario
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -email')
      .populate('createdCocktails', 'name image averageRating views category')
      .populate('favoriteCocktails', 'name image averageRating category');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Actualizar rol de usuario (admin)
// @route   PUT /api/users/:id/role
// @access  Private (admin)
router.put('/:id/role', auth, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'bartender', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Rol no válido' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      success: true,
      message: `Rol actualizado a ${role}`,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Eliminar usuario (admin)
// @route   DELETE /api/users/:id
// @access  Private (admin)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // No permitir eliminar otros admins
    if (user.role === 'admin' && req.user.id !== user._id.toString()) {
      return res.status(403).json({ error: 'No puedes eliminar otros administradores' });
    }

    await user.deleteOne();
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Obtener estadísticas de usuarios (admin)
// @route   GET /api/users/stats/overview
// @access  Private (admin)
router.get('/stats/overview', auth, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentUsers = await User.find()
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      usersByRole,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Buscar usuarios
// @route   GET /api/users/search/:term
// @access  Public
router.get('/search/:term', async (req, res) => {
  try {
    const searchTerm = req.params.term;
    const users = await User.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { bio: { $regex: searchTerm, $options: 'i' } }
      ]
    })
      .select('name avatar bio experience role')
      .limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
