# 🍸 Bers - Aplicación Web de Mixología

Aplicación web completa para la gestión y descubrimiento de cócteles y bebidas mixológicas.

## 🎭 Tabú Mixología - SPA Elegante

**Nueva implementación**: SPA React sofisticada con diseño monocromático (blancos, negros, grises) para experiencia de coctelería premium.

## 📋 Estructura del Proyecto

```
bers/
├── frontend/          # Aplicación React/Vite (Core + Tabú Mixología)
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/       # Páginas de la aplicación
│   │   ├── services/    # Servicios y API calls
│   │   ├── styles/      # Estilos CSS/SCSS + Tailwind
│   │   ├── hooks/       # Custom hooks (useFormValidation)
│   │   ├── utils/       # Scroll, animaciones, datos
│   │   └── assets/      # SVG, ilustraciones, imágenes
│   └── public/          # Archivos estáticos
├── backend/           # API REST Node.js/Express
│   └── src/
│       ├── controllers/ # Controladores de rutas
│       ├── models/     # Modelos de datos
│       ├── routes/     # Definición de rutas
│       ├── middleware/ # Middleware personalizado
│       ├── config/     # Configuración de la app
│       └── utils/      # Utilidades y helpers
└── README.md
```

## 🚀 Inicio Rápido

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Tabú Mixología SPA
Accede a la experiencia premium en: `http://localhost:3000/tabu`

## 📝 Características Principales

### Core Bers Platform
- 🍹 Catálogo de cócteles y bebidas
- 📱 Interfaz responsive
- 🔍 Búsqueda y filtrado avanzado
- 📋 Gestión de ingredientes
- 👨‍🍳 Perfiles de bartenders
- ⭐ Sistema de valoraciones
- 📊 Dashboard administrativo

### Tabú Mixología SPA
- 🎭 Diseño monocromático elegante (blancos, negros, grises)
- ✨ Animaciones sofisticadas con Framer Motion
- 🍸 Galería de cócteles premium con modal de recetas
- 📱 Mobile-first y completamente accesible (WCAG AA)
- 🎨 Tipografía Playfair Display + Open Sans
- 💾 LocalStorage para favoritos del usuario
- 🔍 Filtros dinámicos por tipo de cóctel
- 🖼️ Lazy loading de imágenes optimizado

## 🛠️ Tecnologías

### Core Platform
- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Autenticación**: JWT
- **Base de Datos**: MongoDB

### Tabú Mixología SPA
- **Frontend**: React 18 + Vite
- **Animations**: Framer Motion
- **Styling**: CSS Modules + Custom CSS
- **Typography**: Google Fonts (Playfair Display, Open Sans)
- **Accessibility**: WCAG AA compliant
- **Performance**: Lazy loading, localStorage optimization

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
