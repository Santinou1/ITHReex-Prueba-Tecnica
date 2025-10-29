-- Insertar datos de ejemplo de empleados
INSERT INTO empleados (nombre_completo, edad, area, antiguedad, telefono) VALUES
    ('Juan Pérez García', 35, 'Desarrollo', 5, '+54 11 2345-6789'),
    ('María González López', 28, 'Recursos Humanos', 3, '+54 11 3456-7890'),
    ('Carlos Rodríguez Martínez', 42, 'Ventas', 10, '+54 11 4567-8901'),
    ('Ana Fernández Sánchez', 31, 'Marketing', 4, '+54 11 5678-9012'),
    ('Luis Martínez Torres', 38, 'Desarrollo', 7, '+54 11 6789-0123'),
    ('Laura Sánchez Ramírez', 26, 'Diseño', 2, '+54 11 7890-1234'),
    ('Pedro López Flores', 45, 'Administración', 12, '+54 11 8901-2345'),
    ('Sofía Torres Díaz', 29, 'Desarrollo', 3, '+54 11 9012-3456'),
    ('Diego Ramírez Castro', 33, 'Ventas', 6, '+54 11 0123-4567'),
    ('Valentina Díaz Morales', 27, 'Marketing', 2, '+54 11 1234-5678'),
    ('Martín Castro Herrera', 40, 'Desarrollo', 9, '+54 11 2345-6780'),
    ('Camila Morales Ruiz', 32, 'Recursos Humanos', 5, '+54 11 3456-7891'),
    ('Facundo Herrera Ortiz', 36, 'Administración', 8, '+54 11 4567-8902'),
    ('Lucía Ruiz Vargas', 25, 'Diseño', 1, '+54 11 5678-9013'),
    ('Joaquín Ortiz Mendoza', 44, 'Ventas', 11, '+54 11 6789-0124'),
    ('Florencia Vargas Silva', 30, 'Marketing', 4, '+54 11 7890-1235'),
    ('Tomás Mendoza Rojas', 34, 'Desarrollo', 6, '+54 11 8901-2346'),
    ('Agustina Silva Paredes', 28, 'Recursos Humanos', 3, '+54 11 9012-3457'),
    ('Nicolás Rojas Medina', 41, 'Administración', 10, '+54 11 0123-4568'),
    ('Emma Paredes Guzmán', 26, 'Diseño', 2, '+54 11 1234-5679');

-- Verificar que los datos se insertaron correctamente
SELECT COUNT(*) as total_empleados FROM empleados;
