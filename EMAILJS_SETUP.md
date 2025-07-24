# 📧 Configuración de EmailJS para Tabú Mixología

## 🚀 Configuración Rápida

### 1. Crear Cuenta en EmailJS
1. Ve a [EmailJS.com](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Confirma tu email

### 2. Configurar Servicio de Email
1. En el dashboard, ve a **Email Services**
2. Haz clic en **Add Service**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. **Copia el Service ID** (ej: `service_abc123`)

### 3. Crear Template de Email
1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Usa este template:

```html
Asunto: Nuevo mensaje de {{subject}} - Tabú Mixología

---

¡Hola Tabú Mixología!

Has recibido un nuevo mensaje de contacto:

👤 **Nombre:** {{from_name}}
📧 **Email:** {{from_email}}
📱 **Teléfono:** {{from_phone}}
📋 **Asunto:** {{subject}}

💬 **Mensaje:**
{{message}}

---

Responder a: {{reply_to}}

¡Saludos!
Sistema de Contacto - Tabú Mixología
```

4. **Copia el Template ID** (ej: `template_xyz789`)

### 4. Obtener Public Key
1. Ve a **Account** → **API Keys**
2. **Copia tu Public Key** (ej: `abcdefghijk123456`)

### 5. Actualizar Variables de Entorno
Edita el archivo `frontend/.env`:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id_aqui
VITE_EMAILJS_TEMPLATE_ID=tu_template_id_aqui  
VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

### 6. Reiniciar Servidor
```bash
cd frontend
npm run dev
```

## 📋 Template Variables Disponibles

El formulario envía estos datos:

- `{{from_name}}` - Nombre del contacto
- `{{from_email}}` - Email del contacto
- `{{from_phone}}` - Teléfono (opcional)
- `{{subject}}` - Asunto seleccionado
- `{{message}}` - Mensaje del contacto
- `{{to_name}}` - "Tabú Mixología"
- `{{reply_to}}` - Email para responder

## 🎨 Template HTML Sugerido

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: linear-gradient(135deg, #d4af37, #f4e4bc); padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .footer { background: #333; color: white; padding: 15px; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🍸 Tabú Mixología</h1>
    <p>Nuevo mensaje de contacto</p>
  </div>
  
  <div class="content">
    <h2>Información del Contacto</h2>
    <p><strong>👤 Nombre:</strong> {{from_name}}</p>
    <p><strong>📧 Email:</strong> {{from_email}}</p>
    <p><strong>📱 Teléfono:</strong> {{from_phone}}</p>
    <p><strong>📋 Asunto:</strong> {{subject}}</p>
    
    <h2>💬 Mensaje</h2>
    <div style="background: white; padding: 15px; border-left: 4px solid #d4af37;">
      {{message}}
    </div>
  </div>
  
  <div class="footer">
    <p>Responder a: {{reply_to}}</p>
    <p>© 2025 Tabú Mixología - Sistema de Contacto</p>
  </div>
</body>
</html>
```

## 🔧 Opciones de Asunto

El formulario incluye estas opciones:
- **consulta-general** → "Consulta General"
- **reservacion** → "Reservación"
- **evento-privado** → "Evento Privado"
- **colaboracion** → "Colaboración"

## ✅ Verificación

1. Completa el formulario en la web
2. Revisa tu email configurado
3. Deberías recibir el mensaje formateado

## 🆘 Solución de Problemas

### Error: "Invalid service ID"
- Verifica que el Service ID esté correcto en `.env`
- Asegúrate de que el servicio esté activo en EmailJS

### Error: "Invalid template ID"  
- Verifica que el Template ID esté correcto en `.env`
- Asegúrate de que el template esté publicado

### Error: "Invalid public key"
- Verifica que el Public Key esté correcto en `.env`
- Regenera la key si es necesario

### No llegan emails
- Revisa la carpeta de spam
- Verifica que el servicio de email esté bien configurado
- Revisa los logs de EmailJS dashboard

## 🎯 Límites Gratuitos

EmailJS Plan Gratuito:
- ✅ 200 emails/mes
- ✅ 2 servicios de email
- ✅ Templates ilimitados
- ✅ Support básico

¡Perfecto para Tabú Mixología! 🍸
