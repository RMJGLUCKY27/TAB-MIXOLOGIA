const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del ingrediente es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
  },
  category: {
    type: String,
    enum: [
      'licor',
      'aguardiente',
      'whisky',
      'vodka',
      'ron',
      'gin',
      'tequila',
      'brandy',
      'licor-crema',
      'vino',
      'cerveza',
      'jugo',
      'refresco',
      'jarabe',
      'bitter',
      'fruta',
      'hierba',
      'especia',
      'garnish',
      'hielo',
      'otro'
    ],
    required: [true, 'La categoría es requerida']
  },
  description: {
    type: String,
    maxlength: [500, 'La descripción no puede tener más de 500 caracteres']
  },
  alcoholContent: {
    type: Number, // porcentaje de alcohol
    min: [0, 'El contenido de alcohol no puede ser negativo'],
    max: [100, 'El contenido de alcohol no puede ser mayor a 100%'],
    default: 0
  },
  origin: {
    type: String,
    maxlength: [100, 'El origen no puede tener más de 100 caracteres']
  },
  brand: {
    type: String,
    maxlength: [100, 'La marca no puede tener más de 100 caracteres']
  },
  image: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    maxlength: [50, 'El color no puede tener más de 50 caracteres']
  },
  flavor: {
    type: String,
    enum: ['dulce', 'amargo', 'ácido', 'salado', 'umami', 'neutro'],
    default: 'neutro'
  },
  isCommon: {
    type: Boolean,
    default: false // para ingredientes básicos que todo bar debería tener
  },
  substitutes: [{
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient'
    },
    ratio: {
      type: String,
      default: '1:1'
    }
  }],
  priceRange: {
    type: String,
    enum: ['económico', 'medio', 'premium', 'luxury'],
    default: 'medio'
  },
  availability: {
    type: String,
    enum: ['muy común', 'común', 'poco común', 'raro'],
    default: 'común'
  },
  storageInstructions: {
    type: String,
    maxlength: [200, 'Las instrucciones de almacenamiento no pueden tener más de 200 caracteres']
  },
  shelfLife: {
    type: String, // ej: "2 años", "6 meses una vez abierto"
    maxlength: [100, 'La vida útil no puede tener más de 100 caracteres']
  }
}, {
  timestamps: true
});

// Índice para búsquedas de texto
ingredientSchema.index({ name: 'text', description: 'text' });
ingredientSchema.index({ category: 1 });
ingredientSchema.index({ isCommon: -1 });

module.exports = mongoose.model('Ingredient', ingredientSchema);
