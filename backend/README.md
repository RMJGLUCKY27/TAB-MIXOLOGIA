# 🍸 Bers Backend API

API REST para la aplicación de mixología Bers, construida con Node.js, Express y MongoDB.

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB (local o Atlas)
- npm o yarn

### Instalación
```bash
npm install
```

### Configuración
1. Copia el archivo `.env.example` a `.env`
2. Configura las variables de entorno:
```bash
cp .env.example .env
```

### Variables de Entorno Requeridas
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bers
JWT_SECRET=tu_jwt_secret_super_seguro
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Ejecución
```bash
# Desarrollo
npm run dev

# Producción
npm start

# Tests
npm test

# Linting
npm run lint

# Seed data (opcional)
npm run seed
```

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener perfil actual
- `PUT /api/auth/profile` - Actualizar perfil
- `PUT /api/auth/password` - Cambiar contraseña
- `POST /api/auth/favorites/:cocktailId` - Agregar/quitar favoritos

### Cócteles
- `GET /api/cocktails` - Listar cócteles (con filtros y paginación)
- `GET /api/cocktails/:id` - Obtener cóctel específico
- `POST /api/cocktails` - Crear cóctel (requiere auth)
- `PUT /api/cocktails/:id` - Actualizar cóctel (requiere auth)
- `DELETE /api/cocktails/:id` - Eliminar cóctel (requiere auth)
- `POST /api/cocktails/:id/rate` - Calificar cóctel (requiere auth)

### Ingredientes
- `GET /api/ingredients` - Listar ingredientes
- `GET /api/ingredients/categories` - Obtener categorías
- `GET /api/ingredients/:id` - Obtener ingrediente específico
- `POST /api/ingredients` - Crear ingrediente (bartender/admin)
- `PUT /api/ingredients/:id` - Actualizar ingrediente (bartender/admin)
- `DELETE /api/ingredients/:id` - Eliminar ingrediente (admin)
- `GET /api/ingredients/search/:term` - Buscar ingredientes

### Usuarios
- `GET /api/users` - Listar usuarios (admin)
- `GET /api/users/:id` - Perfil público de usuario
- `PUT /api/users/:id/role` - Cambiar rol (admin)
- `DELETE /api/users/:id` - Eliminar usuario (admin)
- `GET /api/users/stats/overview` - Estadísticas (admin)
- `GET /api/users/search/:term` - Buscar usuarios

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Include el token en el header:
```
Authorization: Bearer <token>
```

## 👥 Roles de Usuario

- **user**: Usuario básico, puede ver y calificar cócteles
- **bartender**: Puede crear cócteles e ingredientes
- **admin**: Acceso completo al sistema

## 📊 Modelos de Datos

### Usuario
- name, email, password
- role (user/bartender/admin)
- avatar, bio, experience
- favoriteCocktails, createdCocktails

### Cóctel
- name, description, image
- ingredients (array con cantidad y unidad)
- instructions (pasos ordenados)
- category, difficulty, preparationTime
- glassType, garnish, tags
- ratings, averageRating
- createdBy, views

### Ingrediente
- name, category, description
- alcoholContent, origin, brand
- color, flavor, priceRange
- availability, storageInstructions

## 🛡️ Seguridad

- Helmet.js para headers de seguridad
- Rate limiting
- Validación de datos con Joi
- Encriptación de contraseñas con bcrypt
- CORS configurado

## 🧪 Testing

```bash
npm test
```

## 📝 Estructura del Proyecto

```
src/
├── app.js              # Aplicación principal
├── config/
│   └── database.js     # Configuración de BD
├── controllers/        # (para futuras funciones)
├── middleware/
│   ├── auth.js         # Autenticación y autorización
│   └── validation.js   # Validaciones
├── models/
│   ├── User.js         # Modelo de usuario
│   ├── Cocktail.js     # Modelo de cóctel
│   └── Ingredient.js   # Modelo de ingrediente
├── routes/
│   ├── auth.js         # Rutas de autenticación
│   ├── cocktails.js    # Rutas de cócteles
│   ├── ingredients.js  # Rutas de ingredientes
│   └── users.js        # Rutas de usuarios
└── utils/              # Utilidades
```

## 🚀 Deployment

### Preparación para producción
1. Configura variables de entorno de producción
2. Usa una base de datos MongoDB en la nube
3. Configura CORS para tu dominio frontend
4. Implementa logging y monitoring

### Plataformas recomendadas
- Heroku
- Railway
- Render
- DigitalOcean App Platform

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request
