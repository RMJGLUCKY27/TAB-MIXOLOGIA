# 🍸 Bers Frontend

Frontend de la aplicación de mixología Bers, construido con React, Vite y Tailwind CSS.

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

### Instalación
```bash
npm install
```

### Ejecución
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router** - Enrutado del lado del cliente
- **React Query** - Gestión de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **React Hot Toast** - Notificaciones

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── Layout.jsx     # Layout principal
│   ├── Navbar.jsx     # Barra de navegación
│   ├── Footer.jsx     # Pie de página
│   └── ...
├── contexts/          # Contextos de React
│   └── AuthContext.jsx
├── pages/             # Páginas de la aplicación
│   ├── Home.jsx
│   ├── CocktailList.jsx
│   ├── CocktailDetail.jsx
│   └── ...
├── services/          # Servicios y API calls
│   └── api.js
├── styles/            # Estilos globales
│   └── index.css
├── App.jsx            # Componente principal
└── main.jsx           # Punto de entrada
```

## 🎨 Estilos y Tailwind

Este proyecto usa Tailwind CSS con configuración personalizada. Los archivos de configuración incluyen:

- `tailwind.config.js` - Configuración de Tailwind
- `postcss.config.js` - Configuración de PostCSS
- `.vscode/settings.json` - Configuración de VS Code para Tailwind

### Solución a errores de linting de Tailwind

Si ves errores como "Unknown at rule @tailwind", estos son normales y se pueden resolver:

1. **Instala la extensión de VS Code**: "Tailwind CSS IntelliSense"
2. **La configuración ya está lista**: Los archivos `.vscode/settings.json` y `.vscode/css_custom_data.json` ya están configurados
3. **Alternativa**: Usa el archivo `styles/tailwind-fixed.css` que tiene estilos CSS tradicionales

### Clases CSS personalizadas disponibles

```css
/* Botones */
.btn, .btn-primary, .btn-secondary, .btn-outline, .btn-ghost

/* Cards y contenedores */
.card, .container

/* Inputs y forms */
.input

/* Badges y etiquetas */
.badge, .badge-primary, .badge-secondary, .badge-gray

/* Utilidades */
.spinner, .glass, .gradient-primary, .gradient-secondary
```

## 🔐 Autenticación

El proyecto incluye un contexto de autenticación (`AuthContext`) que maneja:
- Login/logout
- Registro de usuarios
- Persistencia de sesión
- Rutas protegidas

## 📱 Características

- ✅ Diseño responsive
- ✅ Tema personalizado con variables CSS
- ✅ Navegación con React Router
- ✅ Gestión de estado con React Query
- ✅ Formularios con validación
- ✅ Notificaciones toast
- ✅ Lazy loading de componentes
- ✅ Optimización de imágenes

## 🌐 API Integration

La aplicación se conecta al backend a través de:
- Base URL: `http://localhost:5000/api`
- Proxy configurado en Vite para desarrollo
- Axios con interceptors para autenticación

## 📋 Páginas Principales

- **Home** (`/`) - Página de inicio
- **Cócteles** (`/cocktails`) - Lista de cócteles
- **Detalle** (`/cocktails/:id`) - Detalle de cóctel
- **Crear** (`/create`) - Crear nuevo cóctel (requiere auth)
- **Perfil** (`/profile`) - Perfil de usuario (requiere auth)
- **Dashboard** (`/dashboard`) - Panel de control (requiere auth)

## 🚀 Deployment

### Build para producción
```bash
npm run build
```

### Variables de entorno
Crea un archivo `.env` para configuración:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Bers
```

### Plataformas recomendadas
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Sigue las convenciones de código
4. Asegúrate de que no hay errores de linting
5. Commit tus cambios
6. Push a la rama
7. Abre un Pull Request

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Linting con ESLint

## ⚠️ Notas Importantes

- Los errores de "@tailwind" en CSS son normales y no afectan la funcionalidad
- Asegúrate de tener el backend corriendo en puerto 5000
- Para desarrollo, el proxy está configurado automáticamente
