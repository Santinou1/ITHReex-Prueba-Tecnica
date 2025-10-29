# Base de Datos - Empleados

## Estructura

### Tabla: `empleados`

| Campo           | Tipo         | Descripción                          |
|-----------------|--------------|--------------------------------------|
| id              | SERIAL       | ID único (auto-incremental)          |
| nombre_completo | VARCHAR(255) | Nombre completo del empleado         |
| edad            | INTEGER      | Edad (18-100)                        |
| area            | VARCHAR(100) | Área de trabajo                      |
| antiguedad      | INTEGER      | Años de antigüedad (≥0)              |
| telefono        | VARCHAR(20)  | Número de teléfono                   |
| created_at      | TIMESTAMP    | Fecha de creación                    |
| updated_at      | TIMESTAMP    | Fecha de última actualización        |

## Inicialización

Los scripts se ejecutan automáticamente al iniciar Docker:

1. **init.sql**: Crea la tabla y configuraciones
2. **seed.sql**: Inserta 20 empleados de ejemplo

## Áreas disponibles

- Desarrollo
- Recursos Humanos
- Ventas
- Marketing
- Diseño
- Administración

## Conexión

```javascript
import pool from './config/database.js';

// Ejemplo de query
const result = await pool.query('SELECT * FROM empleados');
```

## Comandos útiles

```bash
# Acceder a la base de datos
docker exec -it ithreex-db-1 psql -U ithreex -d empleados_db

# Ver empleados
SELECT * FROM empleados;

# Contar empleados por área
SELECT area, COUNT(*) FROM empleados GROUP BY area;
```
