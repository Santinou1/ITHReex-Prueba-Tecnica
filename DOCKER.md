# 🐳 Docker Compose - Guía de Uso

## Estructura de Archivos

```
├── docker-compose.yml          # Archivo principal (todos los servicios)
├── docker-compose.db.yml       # Solo base de datos PostgreSQL
├── docker-compose.backend.yml  # Solo backend (Node.js/Express)
└── docker-compose.frontend.yml # Solo frontend (Vite/React)
```

## Comandos Disponibles

### 🚀 Levantar todos los servicios

```bash
# Usando el archivo principal
docker-compose up

# Usando archivos separados (equivalente)
docker-compose -f docker-compose.db.yml -f docker-compose.backend.yml -f docker-compose.frontend.yml up
```

### 🗄️ Solo Base de Datos

```bash
docker-compose -f docker-compose.db.yml up
```

### ⚙️ Base de Datos + Backend

```bash
docker-compose -f docker-compose.db.yml -f docker-compose.backend.yml up
```

### 🎨 Solo Frontend

```bash
docker-compose -f docker-compose.frontend.yml up
```

### 🛑 Detener servicios

```bash
# Detener todos
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Detener servicios específicos
docker-compose -f docker-compose.db.yml down
```

### 🔄 Reconstruir imágenes

```bash
# Reconstruir todo
docker-compose up --build

# Reconstruir servicio específico
docker-compose up --build backend
```

## 📊 Servicios y Puertos

| Servicio | Puerto | URL |
|----------|--------|-----|
| PostgreSQL | 5432 | localhost:5432 |
| Backend | 4000 | http://localhost:4000 |
| Frontend | 5173 | http://localhost:5173 |

## 🔍 Comandos Útiles

```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend

# Acceder a la base de datos
docker exec -it ithreex-db-1 psql -U ithreex -d ithreex

# Ver servicios corriendo
docker-compose ps

# Ejecutar comando en un contenedor
docker-compose exec backend npm install nueva-dependencia
```

## 🎯 Ventajas de Archivos Separados

- ✅ **Modularidad**: Cada servicio en su propio archivo
- ✅ **Desarrollo**: Levantar solo lo que necesitas
- ✅ **Claridad**: Más fácil de mantener y entender
- ✅ **Flexibilidad**: Combinar servicios según necesidad
