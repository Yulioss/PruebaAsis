# Frontend Prueba Asis

Aplicación web desarrollada con **React** para consumir la API REST de la prueba técnica. Permite administrar Productos, Categorías y Proveedores mediante una interfaz intuitiva, autenticada con JWT.

---

# Tecnologías

- React
- React Router DOM
- Axios
- Bootstrap 5
- Vite
- JavaScript (ES6+)

---

# Funcionalidades

- Inicio de sesión mediante JWT.
- Gestión de Productos.
- Gestión de Categorías.
- Gestión de Proveedores.
- Creación, edición y eliminación de registros.
- Validación de formularios.
- Generación masiva de productos.
- Paginación.
- Búsqueda de productos.
- Mostrar/Ocultar contraseña.
- Manejo centralizado de errores de la API.
- Protección de rutas privadas.

---

# Estructura del proyecto

```
src
│
├── components
├── features
│   ├── auth
│   ├── products
│   ├── categories
│   └── suppliers
│
├── services
├── hooks
├── layouts
├── routes
├── utils
└── App.jsx
```

---

# Requisitos

- Node.js 20 o superior
- npm

---

# Instalación

Instalar las dependencias:

```bash
npm install
```

---

# Configuración

Configurar la URL de la API.

Crear el archivo:

```
.env
```

con el siguiente contenido:

```env
VITE_API_URL=http://localhost:5000/api
```

o si se ejecuta mediante Docker:

```env
VITE_API_URL=http://localhost:8080/api
```

---

# Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

# Construcción para producción

```bash
npm run build
```

Vista previa:

```bash
npm run preview
```

---

# Autenticación

La aplicación utiliza JWT.

Después del inicio de sesión:

- Se almacena el token.
- Se envía automáticamente en cada petición mediante el encabezado:

```
Authorization: Bearer {token}
```

Las rutas protegidas requieren autenticación para acceder.

---

# Consumo de la API

El frontend consume los siguientes módulos del backend:

- Login
- Productos
- Categorías
- Proveedores

Las peticiones HTTP se realizan mediante Axios.

---

# Validaciones

Los formularios incluyen validaciones para:

- Campos obligatorios.
- Longitud máxima.
- Valores numéricos válidos.
- Precio mayor a cero.
- Cantidad en inventario válida.
- Selección de categoría.
- Selección de proveedor.

Los errores de validación se muestran directamente en la interfaz para facilitar la corrección por parte del usuario.

---

# Docker (Opcional)

Si el backend se ejecuta mediante Docker Compose, únicamente es necesario configurar correctamente la variable:

```env
VITE_API_URL=http://localhost:8080/api
```

y ejecutar normalmente:

```bash
npm run dev
```

---

# Versionamiento

El proyecto utiliza Git siguiendo una estrategia basada en ramas.

Ramas principales:

- **main**: versión estable.

Convención de commits:

```
feat: nueva funcionalidad

fix: corrección de errores

refactor: mejora de código

style: cambios de formato

docs: documentación

test: pruebas

chore: mantenimiento
```

Ejemplos:

```
feat: add suppliers module

fix: login validation

refactor: improve products service

docs: update README
```

---

# Mejoras futuras

- Recuperación de contraseña.
- Filtros avanzados.
- Ordenamiento dinámico.
- Internacionalización (i18n).
- Tema oscuro.
- Pruebas unitarias con Vitest.
- Pruebas End-to-End con Cypress.
- Despliegue mediante Docker y Nginx.

---

# Autor

Desarrollado por

**Julian David Rangel Arévalo**
