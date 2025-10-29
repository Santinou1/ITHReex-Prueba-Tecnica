-- Crear tabla de empleados
CREATE TABLE IF NOT EXISTS empleados (
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    edad INTEGER NOT NULL CHECK (edad >= 18 AND edad <= 100),
    area VARCHAR(100) NOT NULL,
    antiguedad INTEGER NOT NULL CHECK (antiguedad >= 0),
    telefono VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_empleados_area ON empleados(area);
CREATE INDEX idx_empleados_antiguedad ON empleados(antiguedad);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_empleados_updated_at 
    BEFORE UPDATE ON empleados 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
