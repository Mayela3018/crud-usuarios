# 👥 CRUD de Usuarios — Mayela Ticona Mamani

> Aplicación web fullstack para gestión de usuarios, desplegada en Render con base de datos PostgreSQL en la nube.

🌐 **Demo en vivo:** [https://crud-usuarios-fxr6.onrender.com](https://crud-usuarios-fxr6.onrender.com)

---

## 📋 Descripción

Sistema CRUD completo que permite **Crear, Leer, Actualizar y Eliminar** usuarios desde una interfaz web moderna, conectada a una base de datos PostgreSQL.

---

## ✨ Funcionalidades

- ➕ **Agregar** nuevos usuarios con 5 campos
- 📋 **Listar** todos los usuarios registrados
- ✏️ **Editar** la información de un usuario
- 🗑️ **Eliminar** usuarios con confirmación
- 🔔 Notificaciones toast de éxito y error
- 📱 Diseño responsive para móvil y escritorio

---

## 🛠️ Tecnologías utilizadas

### Backend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Node.js | v22 | Entorno de ejecución |
| Express | v5.2 | Framework del servidor |
| PostgreSQL | - | Base de datos |
| pg (node-postgres) | v8.20 | Conexión a la BD |
| cors | v2.8 | Manejo de CORS |

### Frontend
| Tecnología | Uso |
|-----------|-----|
| HTML5 | Estructura |
| CSS3 | Estilos y animaciones |
| JavaScript (Vanilla) | Lógica del cliente |

### Despliegue
| Servicio | Uso |
|---------|-----|
| Render | Hosting del backend y frontend |
| Render PostgreSQL | Base de datos en la nube |
| GitHub | Control de versiones |

---

## 🗃️ Estructura del proyecto

```
crud-usuarios/
├── backend/
│   ├── server.js        # Servidor Express + rutas API
│   └── package.json     # Dependencias del proyecto
└── frontend/
    ├── index.html       # Interfaz de usuario
    ├── script.js        # Lógica CRUD del cliente
    └── styles.css       # Estilos con diseño morado pastel
```

---

## 🗄️ Base de datos

### Tabla `usuarios`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Identificador único |
| `nombre` | TEXT | Nombre completo |
| `email` | TEXT | Correo electrónico |
| `edad` | INT | Edad del usuario |
| `ciudad` | TEXT | Ciudad de residencia |
| `telefono` | TEXT | Número de teléfono |

### Script SQL
```sql
CREATE TABLE usuarios (
  id       SERIAL PRIMARY KEY,
  nombre   TEXT,
  email    TEXT,
  edad     INT,
  ciudad   TEXT,
  telefono TEXT
);
```

---

## 🔌 API REST — Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/usuarios` | Obtener todos los usuarios |
| `GET` | `/usuarios/:id` | Obtener un usuario por ID |
| `POST` | `/usuarios` | Crear nuevo usuario |
| `PUT` | `/usuarios/:id` | Actualizar usuario |
| `DELETE` | `/usuarios/:id` | Eliminar usuario |
| `GET` | `/test-db` | Verificar conexión a la BD |

### Ejemplo de body (POST / PUT)
```json
{
  "nombre":   "Mayela Ticona",
  "email":    "mayeticonamamani@gmail.com",
  "edad":     20,
  "ciudad":   "Lima",
  "telefono": "990568322"
}
```

---

## 🚀 Cómo ejecutar localmente

### 1. Clonar el repositorio
```bash
git clone https://github.com/Mayela3018/crud-usuarios.git
cd crud-usuarios
```

### 2. Instalar dependencias
```bash
cd backend
npm install
```

### 3. Crear base de datos local
```sql
CREATE DATABASE crud_db;
```

### 4. Iniciar el servidor
```bash
node server.js
```

### 5. Abrir el frontend
Abre `frontend/index.html` con **Live Server** en VS Code.

---

## ☁️ Despliegue en Render

### Variables de entorno necesarias

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | URL de conexión a PostgreSQL de Render |
| `PORT` | Puerto del servidor (Render lo asigna automáticamente) |

### Configuración del Web Service

| Campo | Valor |
|-------|-------|
| Runtime | Node |
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node server.js` |

---

## 👩‍💻 Autora

**Mayela Ticona Mamani**
- 🎓 Estudiante de Diseño y Desarrollo de Software — TECSUP
- 💼 [LinkedIn](https://www.linkedin.com/in/mayela-milagros-ticona-mamani-a47425366)

---

## 📄 Licencia

Este proyecto fue desarrollado como parte del laboratorio académico de **TECSUP** — 2025.
