const Joi = require('joi');

// Validación para registro de usuario
const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede tener más de 50 caracteres',
      'any.required': 'El nombre es requerido'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Debe ser un email válido',
      'any.required': 'El email es requerido'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'any.required': 'La contraseña es requerida'
    }),
    role: Joi.string().valid('user', 'bartender', 'admin').optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  next();
};

// Validación para login
const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Debe ser un email válido',
      'any.required': 'El email es requerido'
    }),
    password: Joi.string().required().messages({
      'any.required': 'La contraseña es requerida'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  next();
};

// Validación para cóctel
const validateCocktail = (req, res, next) => {
  const ingredientSchema = Joi.object({
    ingredient: Joi.string().required().messages({
      'any.required': 'El ID del ingrediente es requerido'
    }),
    quantity: Joi.string().required().messages({
      'any.required': 'La cantidad es requerida'
    }),
    unit: Joi.string().valid('ml', 'oz', 'dash', 'splash', 'tsp', 'tbsp', 'cup', 'piece', 'slice').required().messages({
      'any.only': 'Unidad no válida',
      'any.required': 'La unidad es requerida'
    })
  });

  const instructionSchema = Joi.object({
    step: Joi.number().integer().positive().required().messages({
      'number.positive': 'El número de paso debe ser positivo',
      'any.required': 'El número de paso es requerido'
    }),
    description: Joi.string().required().messages({
      'any.required': 'La descripción del paso es requerida'
    })
  });

  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede tener más de 100 caracteres',
      'any.required': 'El nombre del cóctel es requerido'
    }),
    description: Joi.string().max(1000).required().messages({
      'string.max': 'La descripción no puede tener más de 1000 caracteres',
      'any.required': 'La descripción es requerida'
    }),
    image: Joi.string().uri().optional().allow(''),
    ingredients: Joi.array().items(ingredientSchema).min(1).required().messages({
      'array.min': 'Debe haber al menos un ingrediente',
      'any.required': 'Los ingredientes son requeridos'
    }),
    instructions: Joi.array().items(instructionSchema).min(1).required().messages({
      'array.min': 'Debe haber al menos una instrucción',
      'any.required': 'Las instrucciones son requeridas'
    }),
    category: Joi.string().valid('clásico', 'tropical', 'cremoso', 'fuerte', 'refrescante', 'caliente', 'sin alcohol').required().messages({
      'any.only': 'Categoría no válida',
      'any.required': 'La categoría es requerida'
    }),
    difficulty: Joi.string().valid('fácil', 'intermedio', 'difícil').optional(),
    preparationTime: Joi.number().integer().positive().required().messages({
      'number.positive': 'El tiempo de preparación debe ser positivo',
      'any.required': 'El tiempo de preparación es requerido'
    }),
    servings: Joi.number().integer().positive().optional(),
    glassType: Joi.string().valid('highball', 'lowball', 'martini', 'coupe', 'wine', 'shot', 'hurricane', 'mug').required().messages({
      'any.only': 'Tipo de vaso no válido',
      'any.required': 'El tipo de vaso es requerido'
    }),
    garnish: Joi.string().max(200).optional().allow(''),
    tags: Joi.array().items(Joi.string()).optional(),
    isPublic: Joi.boolean().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  next();
};

// Validación para ingrediente
const validateIngredient = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede tener más de 100 caracteres',
      'any.required': 'El nombre del ingrediente es requerido'
    }),
    category: Joi.string().valid(
      'licor', 'aguardiente', 'whisky', 'vodka', 'ron', 'gin', 'tequila', 'brandy',
      'licor-crema', 'vino', 'cerveza', 'jugo', 'refresco', 'jarabe', 'bitter',
      'fruta', 'hierba', 'especia', 'garnish', 'hielo', 'otro'
    ).required().messages({
      'any.only': 'Categoría no válida',
      'any.required': 'La categoría es requerida'
    }),
    description: Joi.string().max(500).optional().allow(''),
    alcoholContent: Joi.number().min(0).max(100).optional(),
    origin: Joi.string().max(100).optional().allow(''),
    brand: Joi.string().max(100).optional().allow(''),
    image: Joi.string().uri().optional().allow(''),
    color: Joi.string().max(50).optional().allow(''),
    flavor: Joi.string().valid('dulce', 'amargo', 'ácido', 'salado', 'umami', 'neutro').optional(),
    isCommon: Joi.boolean().optional(),
    priceRange: Joi.string().valid('económico', 'medio', 'premium', 'luxury').optional(),
    availability: Joi.string().valid('muy común', 'común', 'poco común', 'raro').optional(),
    storageInstructions: Joi.string().max(200).optional().allow(''),
    shelfLife: Joi.string().max(100).optional().allow('')
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateCocktail,
  validateIngredient
};
