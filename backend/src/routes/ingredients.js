const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');
const { auth, authorize } = require('../middleware/auth');
const { validateIngredient } = require('../middleware/validation');

// @desc    Obtener todos los ingredientes
// @route   GET /api/ingredients
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      category,
      search,
      isCommon,
      sortBy = 'name',
      order = 'asc'
    } = req.query;

    const query = {};

    // Filtros
    if (category) query.category = category;
    if (isCommon !== undefined) query.isCommon = isCommon === 'true';
    if (search) {
      query.$text = { $search: search };
    }

    // Configurar ordenamiento
    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const ingredients = await Ingredient.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Ingredient.countDocuments(query);

    res.json({
      ingredients,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Obtener ingredientes por categoría
// @route   GET /api/ingredients/categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Ingredient.distinct('category');
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Ingredient.countDocuments({ category });
        return { category, count };
      })
    );

    res.json(categoriesWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Obtener un ingrediente por ID
// @route   GET /api/ingredients/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id)
      .populate('substitutes.ingredient', 'name category');

    if (!ingredient) {
      return res.status(404).json({ error: 'Ingrediente no encontrado' });
    }

    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Crear nuevo ingrediente
// @route   POST /api/ingredients
// @access  Private (bartender o admin)
router.post('/', auth, authorize('bartender', 'admin'), validateIngredient, async (req, res) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Ya existe un ingrediente con ese nombre' });
    }
    res.status(400).json({ error: error.message });
  }
});

// @desc    Actualizar ingrediente
// @route   PUT /api/ingredients/:id
// @access  Private (bartender o admin)
router.put('/:id', auth, authorize('bartender', 'admin'), async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!ingredient) {
      return res.status(404).json({ error: 'Ingrediente no encontrado' });
    }

    res.json(ingredient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Eliminar ingrediente
// @route   DELETE /api/ingredients/:id
// @access  Private (admin)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);

    if (!ingredient) {
      return res.status(404).json({ error: 'Ingrediente no encontrado' });
    }

    await ingredient.deleteOne();
    res.json({ message: 'Ingrediente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Buscar ingredientes por nombre
// @route   GET /api/ingredients/search/:term
// @access  Public
router.get('/search/:term', async (req, res) => {
  try {
    const searchTerm = req.params.term;
    const ingredients = await Ingredient.find({
      name: { $regex: searchTerm, $options: 'i' }
    })
      .select('name category alcoholContent')
      .limit(20);

    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
