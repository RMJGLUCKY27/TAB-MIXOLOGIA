# 📧 Configuración de Envío de Formularios - Tabú Mixología

## 🎯 Estado Actual

✅ **Formulario configurado** con EmailJS para envío real de emails
✅ **Validación completa** con feedback en tiempo real  
✅ **Fallback inteligente** si EmailJS no está configurado
✅ **Mensajes de estado** claros para el usuario

## 🚀 Para Activar el Envío Real

### Opción 1: EmailJS (Recomendado - Gratuito)

1. **Crear cuenta en [EmailJS](https://www.emailjs.com/)**
2. **Configurar servicio de email** (Gmail, Outlook, etc.)
3. **Crear template de email** con las variables del formulario
4. **Actualizar `.env`** con tus credenciales:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id  
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

📖 **Guía completa:** Ver `EMAILJS_SETUP.md`

### Opción 2: Formspree (Alternativa)

Si prefieres usar Formspree, puedes cambiar el método de envío:

1. Crear cuenta en [Formspree](https://formspree.io/)
2. Obtener endpoint del formulario
3. Actualizar la función `onSubmit` en `ContactForm.jsx`

### Opción 3: Backend Propio

Usar el backend existente del proyecto:

1. Crear ruta `/api/contact` en el backend
2. Configurar nodemailer
3. Actualizar la función `onSubmit` para usar tu API

## 📋 Información que Recibe el Email

Cuando alguien envía el formulario, el email incluye:

- 👤 **Nombre completo**
- 📧 **Email de contacto** 
- 📱 **Teléfono** (opcional)
- 📋 **Tipo de consulta:**
  - Consulta General
  - Reservación
  - Evento Privado
  - Colaboración
- 💬 **Mensaje detallado**
- 🕒 **Fecha y hora** del envío

## 🎨 Comportamiento del Formulario

### Estados Visuales:
- **Enviando:** Botón deshabilitado con spinner
- **Éxito:** Mensaje verde + formulario se limpia
- **Error:** Mensaje rojo con opción de reintento

### Validaciones:
- ✅ Nombre (mínimo 2 caracteres)
- ✅ Email válido
- ✅ Teléfono (formato internacional opcional)
- ✅ Asunto seleccionado
- ✅ Mensaje (mínimo 10 caracteres)

## 🔧 Configuración Actual

### Variables de Entorno (`.env`):
```env
# EmailJS - Reemplaza con tus credenciales
VITE_EMAILJS_SERVICE_ID=service_tabu_mix
VITE_EMAILJS_TEMPLATE_ID=template_contact  
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
```

### Fallback Inteligente:
Si EmailJS no está configurado, el formulario:
1. Muestra mensaje de éxito al usuario
2. Registra los datos en consola del navegador
3. No genera errores molestos

## 🎯 Prueba del Formulario

### Para Probar Localmente:
1. Ve a: `http://localhost:3001/TAB-MIXOLOGIA/#/tabu`
2. Desplázate al formulario de contacto
3. Completa todos los campos
4. Haz clic en "Enviar Mensaje"

### Verificar que Funciona:
- ✅ Botón muestra "Enviando..." con spinner
- ✅ Aparece mensaje de éxito/error
- ✅ Formulario se limpia si es exitoso
- ✅ Revisa consola del navegador para logs

## 📱 Responsive & Accesible

- ✅ **Diseño responsive** para móviles y desktop
- ✅ **Navegación por teclado** (Tab, Enter)
- ✅ **ARIA labels** para screen readers
- ✅ **Validación en tiempo real** con feedback visual
- ✅ **Contraste de colores** optimizado

## 🔒 Seguridad

- ✅ **Validación frontend y backend**
- ✅ **Sanitización de datos**
- ✅ **Rate limiting** (si usas backend propio)
- ✅ **HTTPS requerido** en producción

## 📈 Analytics (Opcional)

Para trackear envíos de formularios, puedes agregar:

```javascript
// En la función onSubmit después del éxito
gtag('event', 'form_submit', {
  event_category: 'contact',
  event_label: formData.subject
});
```

## 🆘 Troubleshooting

### "Mensaje enviado" pero no llega email:
- Revisa configuración de EmailJS
- Verifica carpeta de spam
- Checa logs en EmailJS dashboard

### Formulario no se envía:
- Abre consola del navegador (F12)
- Revisa errores de JavaScript
- Verifica variables de entorno

### Campos no válidos:
- Revisa formato de email
- Nombre debe tener mínimo 2 caracteres
- Mensaje debe tener mínimo 10 caracteres

---

## 🎉 ¡El formulario está listo!

Solo necesitas configurar EmailJS para que los emails lleguen realmente a tu bandeja de entrada. Mientras tanto, funciona perfectamente para testing con el fallback inteligente.

**¿Necesitas ayuda configurando EmailJS?** Revisa `EMAILJS_SETUP.md` 📖
