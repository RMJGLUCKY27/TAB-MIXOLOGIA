const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del cóctel es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    maxlength: [1000, 'La descripción no puede tener más de 1000 caracteres']
  },
  image: {
    type: String,
    default: ''
  },
  ingredients: [{
    ingredient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true
    },
    quantity: {
      type: String,
      required: [true, 'La cantidad es requerida']
    },
    unit: {
      type: String,
      enum: ['ml', 'oz', 'dash', 'splash', 'tsp', 'tbsp', 'cup', 'piece', 'slice'],
      required: true
    }
  }],
  instructions: [{
    step: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: [true, 'La descripción del paso es requerida']
    }
  }],
  category: {
    type: String,
    enum: ['clásico', 'tropical', 'cremoso', 'fuerte', 'refrescante', 'caliente', 'sin alcohol'],
    required: [true, 'La categoría es requerida']
  },
  difficulty: {
    type: String,
    enum: ['fácil', 'intermedio', 'difícil'],
    default: 'fácil'
  },
  preparationTime: {
    type: Number, // en minutos
    required: [true, 'El tiempo de preparación es requerido'],
    min: [1, 'El tiempo mínimo es 1 minuto']
  },
  servings: {
    type: Number,
    default: 1,
    min: [1, 'Debe servir al menos 1 porción']
  },
  glassType: {
    type: String,
    enum: ['highball', 'lowball', 'martini', 'coupe', 'wine', 'shot', 'hurricane', 'mug'],
    required: [true, 'El tipo de vaso es requerido']
  },
  garnish: {
    type: String,
    maxlength: [200, 'La descripción del garnish no puede tener más de 200 caracteres']
  },
  tags: [{
    type: String,
    lowercase: true
  }],
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'El comentario no puede tener más de 500 caracteres']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calcular rating promedio antes de guardar
cocktailSchema.pre('save', function(next) {
  if (this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    this.averageRating = Number((sum / this.ratings.length).toFixed(1));
    this.totalRatings = this.ratings.length;
  }
  next();
});

// Índices para mejorar búsquedas
cocktailSchema.index({ name: 'text', description: 'text', tags: 'text' });
cocktailSchema.index({ category: 1 });
cocktailSchema.index({ difficulty: 1 });
cocktailSchema.index({ averageRating: -1 });

module.exports = mongoose.model('Cocktail', cocktailSchema);
