# 🤖 AI Coding Agent Instructions for Bers Mixology Project

## 📋 Project Overview
Bers is a full-stack web application for mixology and cocktail management, built with React (frontend) and Node.js/Express (backend). The app features cocktail browsing, creation, rating, user authentication, and admin management.

## 🏗️ Architecture & Structure

### Frontend (`/frontend`)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with custom utilities
- **Routing**: React Router v6 with protected routes
- **State Management**: React Query for server state, Context API for auth
- **Build Tool**: Vite with proxy to backend (port 3000 → 5000)

### Backend (`/backend`)
- **Framework**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with role-based access
- **Security**: Helmet, CORS, rate limiting, bcrypt passwords
- **Architecture**: RESTful API with models, routes, middleware pattern

## 🚀 Quick Start Commands

```bash
# Backend (port 5000)
cd backend && npm install && npm run dev

# Frontend (port 3000)
cd frontend && npm install && npm run dev
```

## 📂 Key File Locations

### Backend Structure
```
backend/src/
├── app.js              # Express app setup, middleware, routes
├── models/             # Mongoose schemas
│   ├── User.js         # User model with auth methods
│   ├── Cocktail.js     # Cocktail model with ratings/reviews
│   └── Ingredient.js   # Ingredient model with categories
├── routes/             # API endpoints
│   ├── auth.js         # Authentication routes (/api/auth)
│   ├── cocktails.js    # Cocktail CRUD (/api/cocktails)
│   ├── ingredients.js  # Ingredient CRUD (/api/ingredients)
│   └── users.js        # User management (/api/users)
└── middleware/
    ├── auth.js         # JWT verification & role authorization
    └── validation.js   # Joi schema validation
```

### Frontend Structure
```
frontend/src/
├── App.jsx             # Main app with routing
├── main.jsx            # React entry point, providers setup
├── contexts/
│   └── AuthContext.jsx # Authentication state management
├── components/         # Reusable UI components
├── pages/              # Route components
└── styles/
    ├── index.css       # Tailwind directives + custom CSS
    └── tailwind-fixed.css # Fallback CSS without @apply
```

## 🔐 Authentication & Authorization

### User Roles
- **user**: Basic access, can create cocktails and rate
- **bartender**: Can manage ingredients, enhanced permissions
- **admin**: Full access to users, can delete any content

### Protected Routes (Frontend)
Use `<ProtectedRoute>` wrapper for authenticated pages:
```jsx
<Route path="dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Backend Authorization
Use middleware for route protection:
```javascript
// Require authentication
router.get('/me', auth, handler);

// Require specific roles
router.post('/', auth, authorize('bartender', 'admin'), handler);
```

## 🎨 Styling Guidelines

### Tailwind CSS Setup
- **Primary file**: `src/styles/index.css` (uses @tailwind directives)
- **Fallback file**: `src/styles/tailwind-fixed.css` (traditional CSS)
- **Config**: `tailwind.config.js`, `postcss.config.js`

### VS Code Configuration
The project includes specific VS Code settings for Tailwind:
- `.vscode/settings.json`: File associations and editor config
- `.vscode/css_custom_data.json`: Custom CSS data for Tailwind
- `.stylelintrc.json`: Linting rules that ignore Tailwind directives

### Color Scheme
- Primary: Green theme (`#22c55e`)
- Background: Gray variations (`bg-gray-50`, `bg-gray-100`)
- Text: Dark gray hierarchy

## 📡 API Integration

### Base Configuration
```javascript
// Frontend proxy (vite.config.js)
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

### Key API Endpoints
```
GET    /api/cocktails           # List cocktails with filters
POST   /api/cocktails           # Create cocktail (auth required)
GET    /api/cocktails/:id       # Get cocktail details
PUT    /api/cocktails/:id       # Update cocktail (owner/admin)
DELETE /api/cocktails/:id       # Delete cocktail (owner/admin)
POST   /api/cocktails/:id/rate  # Rate cocktail (auth required)

GET    /api/ingredients         # List ingredients with filters
POST   /api/ingredients         # Create ingredient (bartender/admin)
GET    /api/ingredients/categories # Get ingredient categories

POST   /api/auth/register       # User registration
POST   /api/auth/login          # User login
GET    /api/auth/me             # Get current user
PUT    /api/auth/profile        # Update profile
POST   /api/auth/favorites/:id  # Toggle favorite cocktail

GET    /api/users               # List users (admin)
PUT    /api/users/:id/role      # Update user role (admin)
DELETE /api/users/:id           # Delete user (admin)
```

## 🗃️ Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['user', 'bartender', 'admin'],
  avatar: String,
  bio: String,
  experience: String,
  favoriteCocktails: [ObjectId],
  createdCocktails: [ObjectId]
}
```

### Cocktail Schema
```javascript
{
  name: String,
  description: String,
  image: String,
  ingredients: [{
    ingredient: ObjectId (ref: Ingredient),
    quantity: String,
    unit: String
  }],
  instructions: [String],
  category: String,
  difficulty: ['easy', 'medium', 'hard'],
  preparationTime: Number,
  glassType: String,
  garnish: String,
  tags: [String],
  ratings: [{
    user: ObjectId,
    rating: Number (1-5),
    comment: String,
    createdAt: Date
  }],
  averageRating: Number,
  createdBy: ObjectId (ref: User),
  views: Number,
  isPublic: Boolean
}
```

## 🛠️ Development Patterns

### Error Handling
- **Backend**: Consistent error responses with status codes
- **Frontend**: React Query handles API errors, toast notifications for user feedback

### Form Handling
- Use React Hook Form for complex forms
- Joi validation on backend routes
- Real-time validation feedback on frontend

### State Management
- **Server state**: React Query with queries and mutations
- **Auth state**: Context API with localStorage persistence
- **Local state**: useState/useReducer for component state

## 🔧 Environment Configuration

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bers
JWT_SECRET=your_secure_secret
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Bers
```

## 🧪 Testing & Quality

### Available Scripts
```bash
# Backend
npm run dev     # Development server with nodemon
npm run lint    # ESLint checking
npm test        # Jest tests
npm run seed    # Seed database with sample data

# Frontend
npm run dev     # Vite development server
npm run build   # Production build
npm run lint    # ESLint checking
npm run preview # Preview production build
```

## ⚠️ Important Notes

### Known Issues & Workarounds
1. **Tailwind Linting**: VS Code may show errors for `@tailwind` directives - this is normal
2. **File Associations**: CSS files are configured as PostCSS in VS Code settings
3. **Fallback Styles**: Use `tailwind-fixed.css` if Tailwind compilation issues occur

### Security Considerations
- Never commit `.env` files
- JWT secrets should be complex in production
- Rate limiting is configured (100 requests per 15 minutes)
- Passwords are hashed with bcrypt

### Performance Tips
- MongoDB indexes are configured for search and filtering
- React Query caching reduces API calls
- Vite provides fast development builds
- Images should be optimized before upload

## 🚀 Deployment Ready

Both frontend and backend are configured for easy deployment:
- **Frontend**: Can deploy to Vercel, Netlify, GitHub Pages
- **Backend**: Can deploy to Heroku, Railway, Render, DigitalOcean
- **Database**: MongoDB Atlas recommended for production

---

*This guide ensures AI agents can quickly understand and contribute to the Bers mixology project effectively.*
