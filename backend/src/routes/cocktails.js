const express = require('express');
const router = express.Router();
const Cocktail = require('../models/Cocktail');
const { auth, authorize } = require('../middleware/auth');
const { validateCocktail } = require('../middleware/validation');

// @desc    Obtener todos los cócteles
// @route   GET /api/cocktails
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      difficulty,
      search,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const query = { isPublic: true };

    // Filtros
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$text = { $search: search };
    }

    // Configurar ordenamiento
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const cocktails = await Cocktail.find(query)
      .populate('createdBy', 'name avatar')
      .populate('ingredients.ingredient', 'name category')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Cocktail.countDocuments(query);

    res.json({
      cocktails,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Obtener un cóctel por ID
// @route   GET /api/cocktails/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id)
      .populate('createdBy', 'name avatar bio experience')
      .populate('ingredients.ingredient', 'name category alcoholContent')
      .populate('ratings.user', 'name avatar');

    if (!cocktail) {
      return res.status(404).json({ error: 'Cóctel no encontrado' });
    }

    // Incrementar contador de vistas
    cocktail.views += 1;
    await cocktail.save();

    res.json(cocktail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Crear nuevo cóctel
// @route   POST /api/cocktails
// @access  Private
router.post('/', auth, validateCocktail, async (req, res) => {
  try {
    const cocktailData = {
      ...req.body,
      createdBy: req.user.id
    };

    const cocktail = await Cocktail.create(cocktailData);
    
    // Poblar los datos antes de enviar
    await cocktail.populate('createdBy', 'name avatar');
    await cocktail.populate('ingredients.ingredient', 'name category');

    res.status(201).json(cocktail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Actualizar cóctel
// @route   PUT /api/cocktails/:id
// @access  Private (solo creador o admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.status(404).json({ error: 'Cóctel no encontrado' });
    }

    // Verificar permisos
    if (cocktail.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para editar este cóctel' });
    }

    const updatedCocktail = await Cocktail.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name avatar')
      .populate('ingredients.ingredient', 'name category');

    res.json(updatedCocktail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Eliminar cóctel
// @route   DELETE /api/cocktails/:id
// @access  Private (solo creador o admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.status(404).json({ error: 'Cóctel no encontrado' });
    }

    // Verificar permisos
    if (cocktail.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para eliminar este cóctel' });
    }

    await cocktail.deleteOne();
    res.json({ message: 'Cóctel eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Calificar cóctel
// @route   POST /api/cocktails/:id/rate
// @access  Private
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.status(404).json({ error: 'Cóctel no encontrado' });
    }

    // Verificar si el usuario ya calificó
    const existingRating = cocktail.ratings.find(
      r => r.user.toString() === req.user.id
    );

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.comment = comment;
    } else {
      cocktail.ratings.push({
        user: req.user.id,
        rating,
        comment
      });
    }

    await cocktail.save();
    
    await cocktail.populate('ratings.user', 'name avatar');
    res.json(cocktail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
