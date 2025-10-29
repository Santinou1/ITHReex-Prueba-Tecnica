# 🚀 Sistema de Gestión de Empleados - ITHReex

**Prueba Técnica para ITHReex**
**Desarrollador:** Santino Ursino

---

## 📋 Descripción del Proyecto

Este proyecto es una **prueba técnica** desarrollada para ITHReex, consistente en un sistema Full Stack de gestión de empleados con las siguientes características:

### 🎯 Requerimientos Originales (PDF)

La prueba técnica solicitaba:

- ✅ Endpoint `GET /employees` para listar empleados
- ✅ Base de datos PostgreSQL con tabla de empleados
- ✅ Arquitectura modular y escalable
- ✅ Docker para facilitar el despliegue

### 🌟 Funcionalidades Adicionales Implementadas

**Como valor agregado**, se implementó un **CRUD completo** con los siguientes endpoints adicionales:

- ✅ `POST /employees` - Crear nuevo empleado
- ✅ `PUT /employees/:id` - Actualizar empleado
- ✅ `DELETE /employees/:id` - Eliminar empleado
- ✅ `GET /employees/:id` - Obtener empleado por ID
- ✅ `GET /employees/stats` - Obtener estadísticas
- ✅ `GET /employees?area=X` - Filtrar por área

Además, se desarrolló un **frontend completo en React** con:

- Interfaz intuitiva para gestionar empleados
- Formularios de creación y edición
- Filtros por área
- Dashboard de estadísticas
- Diseño responsive con CSS puro

---

## 🚀 Inicialización Rápida

### 🐳 Con Docker (Recomendado)

**Requisitos:** Docker Desktop instalado

```bash
# 1. Clonar el repositorio
git clone https://github.com/Santinou1/ITHReex-Prueba-Tecnica.git
cd IthReex

# 2. Levantar todos los servicios
docker-compose up --build

# 3. Acceder a la aplicación
# Frontend: http://localhost:5173
# Backend API: http://localhost:4000/api
# Base de datos: localhost:5432
```

¡Listo! El proyecto estará corriendo con base de datos inicializada y 20 empleados de ejemplo.

**Comandos útiles:**

```bash
docker-compose up -d              # Levantar en background
docker-compose logs -f            # Ver logs en tiempo real
docker-compose logs -f backend    # Ver logs del backend
docker-compose down               # Detener servicios
docker-compose down -v            # Detener y resetear DB
```

### 🧪 Testing de Endpoints con Postman

Para probar todos los endpoints de la API:

1. Abrir Postman
2. Click en "Import"
3. Seleccionar el archivo `ITHReex-Employees-API.postman_collection.json`
4. Ejecutar requests desde la colección

**La colección incluye:**

- ✅ Todos los endpoints del CRUD completo
- ✅ Ejemplos de requests con datos válidos
- ✅ Casos de error (404, 400)
- ✅ Endpoint de estadísticas
- ✅ Filtros por área
- ✅ Variable `{{baseUrl}}` configurable

---

## 🏗️ Arquitectura del Proyecto

### Backend - Express Clásico

Se optó por una **arquitectura Express tradicional** (no NestJS) por las siguientes razones:

1. **Simplicidad**: Express es directo y sin abstracciones innecesarias
2. **Escalabilidad**: Estructura clara por capas (Routes → Controllers → Services → Repositories)
3. **Mantenibilidad**: Cualquier desarrollador Express lo entiende inmediatamente
4. **Performance**: Sin overhead de frameworks pesados

```
backend/
├── src/
│   ├── routes/          # Definición de rutas HTTP
│   ├── controllers/     # Manejo de requests/responses
│   ├── services/        # Lógica de negocio
│   ├── repositories/    # Acceso a datos (SQL)
│   ├── middlewares/     # CORS, Logger, Error Handler
│   └── config/          # Configuración (DB, etc.)
├── database/            # Scripts SQL (schema + seed)
└── Dockerfile
```

### Frontend - React + TypeScript

```
frontend/
├── src/
│   ├── components/      # Componentes React
│   ├── services/        # Consumo de API
│   ├── types/           # Tipos TypeScript
│   └── App.tsx          # Componente principal
└── Dockerfile
```

### Base de Datos - PostgreSQL

```sql
empleados (
  id SERIAL PRIMARY KEY,
  nombre_completo VARCHAR(255),
  edad INTEGER,
  area VARCHAR(100),
  antiguedad INTEGER,
  telefono VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

---

## 💻 Instalación Manual (Sin Docker)

### Requisitos Previos

- Node.js 20+
- PostgreSQL 15+
- npm o yarn

### Backend

1. **Instalar dependencias**

```bash
cd backend
npm install
```

2. **Configurar variables de entorno**

Crear archivo `.env` en `backend/`:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=ithreex
DB_PASSWORD=ithreex123
DB_NAME=ithreex
```

3. **Crear base de datos**

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE ithreex;
\c ithreex

# Ejecutar scripts
\i backend/database/init.sql
\i backend/database/seed.sql
```

4. **Iniciar servidor**

```bash
npm start
```

Backend disponible en: http://localhost:4000

### Frontend

1. **Instalar dependencias**

```bash
cd frontend
npm install
```

2. **Configurar variables de entorno**

Crear archivo `.env` en `frontend/`:

```env
VITE_API_URL=http://localhost:4000/api
```

3. **Iniciar aplicación**

```bash
npm run dev
```

Frontend disponible en: http://localhost:5173

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:4000/api
```

### Empleados

| Método | Endpoint                       | Descripción               |
| ------- | ------------------------------ | -------------------------- |
| GET     | `/employees`                 | Listar todos los empleados |
| GET     | `/employees?area=Desarrollo` | Filtrar por área          |
| GET     | `/employees/:id`             | Obtener empleado por ID    |
| POST    | `/employees`                 | Crear nuevo empleado       |
| PUT     | `/employees/:id`             | Actualizar empleado        |
| DELETE  | `/employees/:id`             | Eliminar empleado          |
| GET     | `/employees/stats`           | Obtener estadísticas      |

### Ejemplo de Request

**Crear empleado:**

```bash
curl -X POST http://localhost:4000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCompleto": "María López",
    "edad": 28,
    "area": "Marketing",
    "antiguedad": 2,
    "telefono": "+54 11 9999-8888"
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 21,
    "nombreCompleto": "María López",
    "edad": 28,
    "area": "Marketing",
    "antiguedad": 2,
    "telefono": "+54 11 9999-8888",
    "createdAt": "2025-10-29T22:00:00.000Z",
    "updatedAt": "2025-10-29T22:00:00.000Z"
  },
  "message": "Empleado creado exitosamente",
  "statusCode": 201
}
```

---

## 🗄️ Base de Datos

### Modelo de Datos

**Tabla: empleados**

| Campo           | Tipo         | Restricciones  | Descripción                 |
| --------------- | ------------ | -------------- | ---------------------------- |
| id              | SERIAL       | PRIMARY KEY    | ID único auto-incremental   |
| nombre_completo | VARCHAR(255) | NOT NULL       | Nombre completo del empleado |
| edad            | INTEGER      | CHECK (18-100) | Edad del empleado            |
| area            | VARCHAR(100) | NOT NULL       | Área de trabajo             |
| antiguedad      | INTEGER      | CHECK (>=0)    | Años de antigüedad         |
| telefono        | VARCHAR(20)  | NOT NULL       | Número de teléfono         |
| created_at      | TIMESTAMP    | DEFAULT NOW()  | Fecha de creación           |
| updated_at      | TIMESTAMP    | DEFAULT NOW()  | Última actualización       |

### Datos Iniciales

La base de datos se inicializa automáticamente con **20 empleados** de ejemplo distribuidos en 6 áreas:

- Desarrollo
- Recursos Humanos
- Ventas
- Marketing
- Diseño
- Administración

---

## 🎨 Tecnologías Utilizadas

### Backend

- **Node.js 20** - Runtime de JavaScript
- **Express 4** - Framework web minimalista
- **PostgreSQL 15** - Base de datos relacional
- **pg** - Cliente PostgreSQL para Node.js
- **dotenv** - Gestión de variables de entorno

### Frontend

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **CSS Puro** - Sin frameworks (Tailwind eliminado)

### DevOps

- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores

---

## 📊 Características Implementadas

### Backend ✅

- [X] API REST completa (CRUD)
- [X] Arquitectura en capas (Routes → Controllers → Services → Repositories)
- [X] Validaciones de negocio
- [X] Manejo de errores centralizado
- [X] CORS habilitado
- [X] Sistema de logging con colores
- [X] Documentación completa
- [X] Colección de Postman
- [X] Scripts de inicialización de DB
- [X] Seeder con datos de ejemplo

### Frontend ✅

- [X] CRUD completo de empleados
- [X] Filtros por área
- [X] Dashboard de estadísticas
- [X] Formularios de creación/edición
- [X] Diseño responsive
- [X] Estados de carga
- [X] Manejo de errores
- [X] TypeScript para type safety

### Base de Datos ✅

- [X] PostgreSQL configurado
- [X] Scripts de inicialización
- [X] Seeder con datos de ejemplo
- [X] Índices optimizados
- [X] Triggers automáticos (updated_at)
- [X] Constraints y validaciones

---

## 🎯 Decisiones de Diseño

### ¿Por qué Express Clásico y no NestJS?

1. **Simplicidad**: La prueba técnica no requería la complejidad de NestJS
2. **Claridad**: Estructura más directa y fácil de entender
3. **Performance**: Menos overhead, más rápido
4. **Escalabilidad**: Igualmente escalable con buena arquitectura
5. **Mantenibilidad**: Código más limpio sin decoradores ni abstracciones

### ¿Por qué CSS Puro?

1. **Control total**: Sin limitaciones de frameworks
2. **Performance**: Menos JavaScript, carga más rápida
3. **Aprendizaje**: Demuestra conocimiento de CSS fundamental
4. **Personalización**: Diseño único sin clases genéricas
5. **Prueba Tecnica**: A que me refiero con esto, a que es algo rapido y no hace falta sobre ingenieria en algo simple

### ¿Por qué TypeScript en Frontend?

1. **Type Safety**: Prevención de errores en tiempo de desarrollo
2. **Documentación**: Los tipos sirven como documentación
3. **Escalabilidad**: Más fácil mantener código grande

---

## 📝 Notas Adicionales

### Sistema de Logging

El backend incluye un sistema de logging personalizado que muestra:

- Timestamp de cada request
- Método HTTP con colores
- Status code con colores
- Ruta accedida
- Duración en milisegundos
- Query params y body (cuando aplica)

**Ejemplo:**

```
[19:30:45] GET     200 /api/employees                 15ms
[19:30:47] POST    201 /api/employees                 23ms
  📦 Body: {"nombreCompleto":"Test User","edad":30,...}
[19:30:50] DELETE  200 /api/employees/21              10ms
```

### Colores del Proyecto

- **Primary:** `#028ACD` - Azul corporativo
- **Background:** `#FBFBFB` - Fondo claro
- **Success:** `#10b981` - Verde para acciones positivas
- **Danger:** `#ef4444` - Rojo para eliminaciones
- **Warning:** `#f59e0b` - Amarillo para ediciones

---

## 👨‍💻 Desarrollador

**Santino Ursino**

Este proyecto fue desarrollado como prueba técnica para ITHReex, demostrando conocimientos en:

- Arquitectura de software
- Desarrollo Full Stack
- Bases de datos relacionales
- Docker y containerización
- Buenas prácticas de código
- Documentación técnica

---

## 📄 Licencia

Este proyecto fue desarrollado exclusivamente para fines de evaluación técnica.

---

## 🙏 Agradecimientos

Gracias a ITHReex por la oportunidad de demostrar mis habilidades técnicas a través de esta prueba.
